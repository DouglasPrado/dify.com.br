import prisma from "@/lib/prisma";
import {
  generateTOCPlugin,
  replaceExamples,
  replaceLinksWithAnchors,
  replaceListProducts,
  replaceProductReviews,
  replaceTopProducts,
  replaceTweets,
  replaceYouTubeVideos,
} from "@/lib/remark-plugins";
import { Media } from "@prisma/client";
import { put } from "@vercel/blob";
import { serialize } from "next-mdx-remote/serialize";
import { unstable_cache } from "next/cache";
import { getBlurDataURL, prepareURL } from "./utils";
const sharp = require("sharp");

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        include: { user: true, links: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getLinkData(url: string) {
  return await unstable_cache(
    async () => {
      return prisma.link.findFirst({
        where: { url },
        include: {
          site: {
            select: {
              customDomain: true,
              id: true,
              name: true,
              titleSEO: true,
              descriptionSEO: true,
              description: true,
              image: true,
              imageBlurhash: true,
            },
          },
          collections: {
            include: {
              products: { select: { id: true, image: true, title: true } },
              posts: { select: { id: true, image: true, title: true } },
            },
          },
        },
      });
    },
    [`${url}-link`],
    {
      revalidate: 900,
      tags: [`${url}-link`],
    },
  )();
}

export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
          NOT: [
            {
              highlight: true,
            },
          ],
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          columnist: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}

export async function getPostsHighLightForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          highlight: true,
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          columnist: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: 3,
      });
    },
    [`${domain}-posts-highlight`],
    {
      revalidate: 900,
      tags: [`${domain}-posts-highlight`],
    },
  )();
}

export async function getPostsPopularForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          popular: false,
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          columnist: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: 4,
      });
    },
    [`${domain}-posts-popular`],
    {
      revalidate: 900,
      tags: [`${domain}-posts-popular`],
    },
  )();
}

export async function getProductsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.product.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
        },
        select: {
          title: true,
          shortDescription: true,
          url: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-products`],
    {
      revalidate: 900,
      tags: [`${domain}-products`],
    },
  )();
}

export async function getPagesForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.page.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-pages`],
    {
      revalidate: 900,
      tags: [`${domain}-pages`],
    },
  )();
}

export async function getPostData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.post.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          relatedPosts: {
            include: { relatedPost: true },
          },
          columnist: true,
          tags: true,
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentPosts] = await Promise.all([
        getMdxSource(data.content!, data.site!.id, data.id),
        prisma.post.findMany({
          where: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
            tags: true,
          },
          take: 6,
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentPosts,
      };
    },
    [`posts-${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`posts-${domain}-${slug}`],
    },
  )();
}

export async function getProductData(domain: string, url: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.product.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          url,
        },
        include: {
          sections: true,
          medias: true,
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentProducts] = await Promise.all([
        getMdxSource(data.description!),
        prisma.product.findMany({
          where: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            NOT: {
              id: data.id,
            },
          },
          select: {
            url: true,
            title: true,
            createdAt: true,
            shortDescription: true,
            description: true,
            image: true,
            imageBlurhash: true,
            sections: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentProducts,
      };
    },
    [`products-${domain}-${url}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`products-${domain}-${url}`],
    },
  )();
}

export async function getPageData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.page.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentPages] = await Promise.all([
        getMdxSource(data.content!),
        prisma.page.findMany({
          where: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentPages,
      };
    },
    [`page-${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`page-${domain}-${slug}`],
    },
  )();
}

export async function getCollectionData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.collection.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
        },
        include: {
          posts: { include: { tags: true } },
          products: true,
          site: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
      });

      if (!data) return null;
      const [mdxSource] = await Promise.all([
        getMdxSource(data.footerDescription!),
      ]);

      return {
        ...data,
        mdxSource,
      };
    },
    [`collection-${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`collection-${domain}-${slug}`],
    },
  )();
}

export async function getCollectionsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.collection.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          type: "default",
          posts: {
            some: {},
          },
        },
        select: {
          name: true,
          longName: true,
          description: true,
          shortDescription: true,
          footerDescription: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          posts: { include: { tags: true } },
          _count: {
            select: {
              posts: true,
              products: true,
            },
          },
        },
        orderBy: [
          {
            order: "asc",
          },
          {
            highlight: "desc",
          },
          {
            createdAt: "asc",
          },
        ],
      });
    },
    [`${domain}-pages`],
    {
      revalidate: 900,
      tags: [`${domain}-pages`],
    },
  )();
}

export async function getCategoriesForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.category.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
        },
        select: {
          name: true,
          description: true,
          slug: true,
          collections: {
            select: {
              id: true,
              name: true,
              shortDescription: true,
              slug: true,
            },
          },
          _count: {
            select: {
              collections: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });
    },
    [`${domain}-categories`],
    {
      revalidate: 900,
      tags: [`${domain}-categories`],
    },
  )();
}

export async function getColumnistForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.columnist.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
        },
        select: {
          name: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-columnists`],
    {
      revalidate: 900,
      tags: [`${domain}-columnists`],
    },
  )();
}

export async function getColumnistData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.columnist.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
        },
        select: {
          name: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          site: true,
        },
      });

      if (!data) return null;

      return data;
    },
    [`columnist-${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`columnist-${domain}-${slug}`],
    },
  )();
}

async function getMdxSource(
  postContents: string,
  siteId?: string,
  contentId?: string,
) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";

  let updatedContent = content;

  if (siteId) {
    const posts: any = await getAllPosts(siteId, contentId);
    const collections: any = await getAllCollections(siteId, contentId);
    updatedContent = addInternalLinks(updatedContent, posts, collections);
  }
  if (contentId) {
    const post = await prisma.post.findUnique({
      where: { id: contentId },
      select: { id: true, template: true },
    });

    const medias: any = await getMedia(contentId as string);
    if (medias.length > 0) {
      updatedContent = addImagesAfterH2(medias, updatedContent);
    }

    if (post?.template === "empty") {
      updatedContent = addTocHeadings(updatedContent);
    }

    if (post?.template === "product") {
      const product: any = await getProductReview(contentId as string);
      if (product) {
        updatedContent = addReviewProduct(product, updatedContent);
      }
    }

    if (post?.template === "list") {
      const products: any = await getListProducts(contentId as string);
      if (products.length > 0) {
        //Lista os produtos
        updatedContent = addListProducts(contentId, updatedContent);
        //Cria os cards dos melhores produtos
        updatedContent = addTopProducts(contentId, updatedContent);
      }
    }
    const reference: any = await getLinkYoutube(contentId);
    if (reference) {
      updatedContent = addVideoReview(updatedContent, reference);
    }
  }

  // Serialize the content string into MDX
  const mdxSource: any = await serialize(updatedContent, {
    mdxOptions: {
      remarkPlugins: [
        replaceTweets,
        replaceYouTubeVideos,
        replaceLinksWithAnchors,
        () => replaceProductReviews(prisma),
        () => replaceTopProducts(prisma),
        () => replaceListProducts(prisma),
        () => replaceExamples(prisma),
        generateTOCPlugin,
      ],
    },
  });

  return mdxSource;
}

async function getAllPosts(siteId: string, contentId?: string) {
  return await prisma.post.findMany({
    where: {
      siteId,
      ...(contentId && {
        NOT: {
          id: contentId,
        },
      }),
    },
    select: {
      keywords: true,
      slug: true,
    },
  });
}

async function getAllCollections(siteId: string, contentId?: string) {
  return await prisma.collection.findMany({
    where: {
      siteId,
      ...(contentId && {
        NOT: {
          id: contentId,
        },
      }),
    },
    select: {
      name: true,
      slug: true,
    },
  });
}

async function getLinkYoutube(postId: string) {
  return await prisma.reference.findFirst({
    where: {
      postId,
      type: "youtube",
    },
    select: {
      title: true,
      reference: true,
    },
  });
}

async function getMedia(postId: string) {
  return await prisma.media.findMany({
    where: {
      posts: { some: { id: postId } },
    },
    take: 3,
  });
}

async function getProductReview(postId: string) {
  return await prisma.product.findFirst({
    where: {
      posts: { some: { id: postId } },
    },
    select: {
      id: true,
    },
  });
}

async function getListProducts(postId: string) {
  return await prisma.product.findMany({
    where: {
      posts: { some: { id: postId } },
    },
    select: {
      id: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });
}

function addTocHeadings(updatedContent: string) {
  updatedContent = `\n\n [[TOC_HEADINGS]] \n` + updatedContent;
  return updatedContent;
}

function addReviewProduct(product: any, updatedContent: string) {
  updatedContent = `[[REVIEW_PRODUCT(${product.id})]] \n\n` + updatedContent;
  return updatedContent;
}

function addListProducts(postId: string, updatedContent: string) {
  // updatedContent = `\n\n [[LIST_PRODUCTS(${postId})]] \n` + updatedContent;
  return updatedContent;
}

function addTopProducts(postId: string, updatedContent: string) {
  // Encontrar a posição do primeiro e do segundo h2
  const firstH2Index = updatedContent.indexOf("## ");
  const secondH2Index = updatedContent.indexOf("## ", firstH2Index + 1);

  // Se não houver dois h2, apenas adicione ao final
  if (secondH2Index === -1) {
    return updatedContent + `\n\n[[TOP_PRODUCTS(${postId})]]`;
  }

  // Inserir [[TOP_PRODUCTS(${postId})]] logo acima do segundo h2
  const result =
    updatedContent.substring(0, secondH2Index) +
    `[[TOP_PRODUCTS(${postId})]]\n\n` +
    updatedContent.substring(secondH2Index);

  return result;
}

function addImagesAfterH2(media: Media[], content: string) {
  let updatedContent = content;
  let imageCount = 0;

  // Limite de 3 ou a quantidade de media, o que for menor
  const maxImages = Math.min(3, media.length);

  updatedContent = updatedContent
    .split("## ")
    .map((section, index) => {
      if (index === 0 || index === 1) {
        return section; // Manter a primeira seção como está
      } else if (imageCount < maxImages && media[imageCount]) {
        const image = media[imageCount];
        const regex = /[^/]+(?=\.[\w]+$)/;
        const match = image.slug.match(regex);
        if (match) {
          let imageName = match[0];
          let readableText = imageName.replace(/-/g, " ");
          readableText = readableText.replace(/\b\w/g, (char) =>
            char.toUpperCase(),
          );
          // const imageMarkdown = `\n\n![${readableText}](${image.slug}){: style="width: 50%; height: auto;"}\n\n`;
          const imageMarkdown = `\n\n 
              <img
                src="${image.slug}"
                alt="${readableText}"
                width="600px"
                height="400px"
                loading="lazy"
              />
            \n\n
          `;
          // Dividir a seção em parágrafos
          const paragraphs = section.split("\n\n");
          const midPoint = Math.floor(paragraphs.length / 2);
          const firstHalf = paragraphs.slice(0, midPoint).join("\n\n");
          const secondHalf = paragraphs.slice(midPoint).join("\n\n");

          imageCount++;
          return `## ${firstHalf}${imageMarkdown}${secondHalf}`;
        }
      }
      return `## ${section}`;
    })
    .join("");

  return updatedContent;
}

function addInternalLinks(
  content: string,
  posts: { keywords: string; slug: string }[],
  collections: { name: string; slug: string }[],
): string {
  let updatedContent = content;

  posts.forEach((post) => {
    // Divida as palavras-chave usando vírgulas ou quebras de linha
    const keywordsArray =
      post.keywords &&
      post.keywords
        .split(/,\s*|\n\s*/)
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword); // Remove strings vazias

    keywordsArray &&
      keywordsArray?.forEach((keyword) => {
        // Substitua a palavra-chave com negrito e sublinhado
        const replacement = `**<u>[${keyword}](/${post.slug})</u>**`;
        updatedContent = createLinkBuilding(
          updatedContent,
          keyword,
          replacement,
        );
      });
  });

  collections.forEach((collection) => {
    const replacement = `**<u>[${collection.name}](/${collection.slug})</u>**`;
    updatedContent = createLinkBuilding(
      updatedContent,
      collection.name,
      replacement,
    );
  });

  return updatedContent;
}

function addVideoReview(
  content: string,
  reference: { reference: string; title: string },
): string {
  let updatedContent = content;
  const code = `
## Acompanhe em vídeo
[${reference.title}](${reference.reference})

> *${reference.title}*
***
  `;
  updatedContent = updatedContent += code;
  return updatedContent;
}

const createLinkBuilding = (text: string, keyword: string, replace: any) => {
  return text
    .split("\n")
    .map((line) => {
      if (!line.startsWith("## ") && !line.startsWith("### ")) {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        // Aplica o regex para substituir a palavra-chave por um link
        return line.replaceAll(regex, replace);
      }
      return line; // Mantém a linha inalterada se for um título h2
    })
    .join("\n");
};

export const uploadAndCompressImage = ({
  url,
  name,
  size,
}: {
  url: string;
  name?: string | null | undefined;
  size: { width: number; height: number };
}) => {
  return fetch(url).then(async (res) => {
    const imageBuffer = await res.arrayBuffer();
    const image = sharp(Buffer.from(imageBuffer));
    const optimizedImageBuffer = await image
      .webp()
      .resize(size.width, size.height)
      .toBuffer();

    const filename = `${prepareURL(name)}.webp`;

    const { url } = await put(filename, optimizedImageBuffer, {
      contentType: "image/webp",
      access: "public",
    });

    const blurhash = await getBlurDataURL(url);

    return {
      url,
      blurhash,
    };
  });
};
