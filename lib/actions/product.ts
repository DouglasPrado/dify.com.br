"use server";

import { getSession, withProductAuth, withSiteAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL, nanoid, prepareURL } from "@/lib/utils";
import { Product, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { Client } from "typesense";
import { SerpProduct } from "../serper";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const productsSchema: any = {
  enable_nested_fields: true,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string", optional: true },
    { name: "description", type: "string", optional: true },
    { name: "type", type: "string", optional: true, facet: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
  ],
};

const clientTypesense = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST as string,
      port: Number(process.env.TYPESENSE_PORT) as number,
      protocol: process.env.TYPESENSE_PROTOCOL as string,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY as string,
});

export const getSiteFromProductId = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      siteId: true,
    },
  });
  return product?.siteId;
};

export const createProduct = withSiteAuth(async (_: FormData, site: Site) => {
  const PRODUCT_COLLECTION = `${site.id}`;
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const urlCloneTemporary = nanoid(16);

  try {
    // const stripeProduct = await stripe.products.create({
    //   name: urlCloneTemporary,
    //   metadata: { business: site.id },
    // });
    const product = await prisma.product.create({
      data: {
        urlClone: urlCloneTemporary,
        siteId: site.id,
        // productId: stripeProduct.id,
      },
    });

    await prisma.whitelist.create({
      data: {
        name: urlCloneTemporary,
        ref: product.id,
        siteId: product.siteId!,
        utm_campaign: "[LANCAMENTO][01]",
        utm_medium: "direct",
        utm_source: site.customDomain
          ? site.customDomain
          : `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
    });

    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-products`,
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-products`));

    try {
      await clientTypesense.collections(PRODUCT_COLLECTION).retrieve();
    } catch (error) {
      await clientTypesense
        .collections()
        .create({ ...productsSchema, name: PRODUCT_COLLECTION });
    }
    await clientTypesense
      .collections(PRODUCT_COLLECTION)
      .documents()
      .upsert({ ...product, type: "product" });

    return product;
  } catch (error) {
    console.log(error);
  }
});

// creating a separate function for this because we're not using FormData
export const updateProduct = async (data: any) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const product = await prisma.product.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });

  if (!product) {
    return {
      error: "product not found",
    };
  }

  try {
    const product = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.shortDescription,
        image: data.image,
        imageBlurhash: data.imageBlurhash,
      },
      include: { site: true },
    });

    const PRODUCT_COLLECTION = `${product.siteId}`;

    await clientTypesense
      .collections(PRODUCT_COLLECTION)
      .documents(product.id)
      .update({
        title: product.title,
        description: product.shortDescription,
        image: product.image,
        imageBlurhash: product.imageBlurhash,
        type: "product",
      });

    await revalidateTag(
      `${product.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-products`,
    );
    await revalidateTag(
      `${product.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${product.url}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    product.site?.customDomain &&
      (await revalidateTag(`${product.site?.customDomain}-products`),
      await revalidateTag(`${product.site?.customDomain}-${product.url}`));

    return product;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateProductMetadata = withProductAuth(
  async (
    formData: FormData,
    product: string &
      Product & {
        site: Site;
      },
    key: string,
  ) => {
    const value = formData.get(key) as string;
    try {
      let response;
      if (key === "image" || key === "videoThumbnail" || key === "media") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        // await stripe.products.update(product.productId!, {
        //   images: [url],
        // });

        if (key === "videoThumbnail") {
          return await prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              videoThumbnail: url,
              medias: {
                create: {
                  slug: url,
                  type: "jpg",
                  siteId: product.siteId,
                  metadata: {
                    productId: product.id,
                    type: "videoThumbnail",
                  },
                },
              },
            },
          });
        } else if (key === "media") {
          return await prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              medias: {
                create: {
                  slug: url,
                  type: "jpg",
                  siteId: product.siteId,
                  metadata: {
                    productId: product.id,
                    type: "media",
                  },
                },
              },
            },
          });
        } else {
          const blurhash = await getBlurDataURL(url);
          response = await prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              image: url,
              imageBlurhash: blurhash,
              medias: {
                create: {
                  slug: url,
                  type: "jpg",
                  siteId: product.siteId,
                  metadata: {
                    productId: product.id,
                    type: "highlight",
                  },
                },
              },
            },
          });
        }
      } else {
        let updateStripe: Stripe.ProductUpdateParams = {};
        switch (key) {
          case "title":
            updateStripe.name = value;
            break;
          case "shortDescription":
            updateStripe.description = value;
            break;
          case "price":
            const { id } = await stripe.prices.create({
              currency: "BRL",
              product: product.productId!,
              unit_amount: Number(value),
            });
            updateStripe.default_price = id;
            break;

          default:
            break;
        }
        // await stripe.products.update(product.productId!, updateStripe);

        if (key === "title") {
          const whitelist = await prisma.whitelist.findFirst({
            where: { ref: product.id },
          });
          whitelist &&
            (await prisma.whitelist.update({
              where: {
                id: whitelist.id,
              },
              data: {
                name: `${value} - [LANCAMENTO][01]`,
              },
            }));
        }

        response = await prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            [key]:
              key === "published"
                ? value === "true"
                : key === "colors"
                ? JSON.parse(value)
                : value,
          },
        });
      }
      const PRODUCT_COLLECTION = `${response.siteId}`;
      await clientTypesense
        .collections(PRODUCT_COLLECTION)
        .documents(response.id)
        .update({
          title: response.title,
          urlClone: response.urlClone,
          description: response.description,
          shortDescription: response.shortDescription,
          status: response.status,
          image: response.image,
          imageBlurhash: response.imageBlurhash,
          url: response.url,
          type: "product",
        });

      await revalidateTag(
        `${product.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-products`,
      );
      await revalidateTag(
        `${product.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${product.url}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      product.site?.customDomain &&
        (await revalidateTag(`${product.site?.customDomain}-products`),
        await revalidateTag(`${product.site?.customDomain}-${product.url}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This url is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteProduct = withProductAuth(
  async (_: FormData, product: Product) => {
    try {
      const PRODUCT_COLLECTION = `${product.siteId}`;

      await clientTypesense
        .collections(PRODUCT_COLLECTION)
        .documents(product.id)
        .delete();

      // await stripe.products.update(product.productId!, {
      //   active: false,
      // });
      const response = await prisma.product.delete({
        where: {
          id: product.id,
        },
        select: {
          siteId: true,
        },
      });

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const getProductsFromSiteId = async (siteId: string) => {
  const products = await prisma.product.findMany({
    where: {
      ...(siteId ? { siteId: siteId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      site: true,
    },
  });
  return products;
};

export const cloneProductFromGoogle = async (
  siteId: string,
  product: SerpProduct,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const site = await prisma.site.findFirst({
    where: { id: siteId },
  });
  if (site) {
    const PRODUCT_COLLECTION = `${site.id}`;
    const existProduct = await prisma.product.findFirst({
      where: {
        url: prepareURL(product.title),
        siteId: site.id,
      },
    });
    if (existProduct) {
      return {
        error: "Esse produto já existe.",
      };
    }
    try {
      const urlClone = product.link?.split("?")
        ? product.link?.split("?")[0]
        : product.link;

      const createProduct = await prisma.product.create({
        data: {
          title: product.title,
          url: prepareURL(product.title),
          image: product.imageUrl,
          urlClone,
          source: product.source,
          rating: product.rating,
          ratingCount: product.ratingCount,
          siteId: site.id,
        },
      });

      await prisma.whitelist.create({
        data: {
          name: createProduct.title,
          ref: createProduct.id,
          siteId: createProduct.siteId!,
          utm_campaign: "[LANCAMENTO][01]",
          utm_medium: "direct",
          utm_source: site.customDomain
            ? site.customDomain
            : `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        },
      });

      await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-products`,
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-products`));

      try {
        await clientTypesense.collections(PRODUCT_COLLECTION).retrieve();
      } catch (error) {
        await clientTypesense
          .collections()
          .create({ ...productsSchema, name: PRODUCT_COLLECTION });
      }
      await clientTypesense
        .collections(PRODUCT_COLLECTION)
        .documents()
        .upsert({ ...product, type: "product" });

      const trigger = await prisma.trigger.findFirst({
        where: {
          name: "Product.Update",
        },
      });
      if (trigger) {
        const isProduction = process.env.NODE_ENV === "production";
        try {
          await fetch(
            isProduction
              ? (trigger.productionHost as string)
              : (trigger.developHost as string),
            {
              method: trigger.method as string,
              headers: {
                Authorization: process.env.N8N as string,
              },
              body: JSON.stringify({ ...createProduct }),
            },
          );
        } catch (error) {
          console.log(error);
        }
      }

      return createProduct;
    } catch (error) {
      console.log(error);
    }
  }
};

export const resendProductAI = async (productId: string) => {
  const product = await prisma.product.findFirst({
    where: { id: productId },
  });
  const trigger = await prisma.trigger.findFirst({
    where: {
      name: "Product.Update",
    },
  });
  if (trigger) {
    const isProduction = process.env.NODE_ENV === "production";
    try {
      await fetch(
        isProduction
          ? (trigger.productionHost as string)
          : (trigger.developHost as string),
        {
          method: trigger.method as string,
          headers: {
            Authorization: process.env.N8N as string,
          },
          body: JSON.stringify({ ...product }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
};
