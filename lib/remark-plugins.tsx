import Link from "next/link";
import { ReactNode } from "react";
import { visit } from "unist-util-visit";
export function replaceLinks({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  // this is technically not a remark plugin but it
  // replaces internal links with <Link /> component
  // and external links with <a target="_blank" />
  return href?.startsWith("/") || href === "" ? (
    <Link href={href} className="cursor-pointer">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} ↗
    </a>
  );
}

export function replaceTweets() {
  return (tree: any) =>
    new Promise<void>(async (resolve, reject) => {
      const nodesToChange = new Array();

      visit(tree, "link", (node: any) => {
        if (
          node.url.match(
            /https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)([^\?])(\?.*)?/g,
          )
        ) {
          nodesToChange.push({
            node,
          });
        }
      });
      for (const { node } of nodesToChange) {
        try {
          const regex = /\/status\/(\d+)/gm;
          const matches = regex.exec(node.url);

          if (!matches) throw new Error(`Failed to get tweet: ${node}`);

          const id = matches[1];

          node.type = "mdxJsxFlowElement";
          node.name = "Tweet";
          node.attributes = [
            {
              type: "mdxJsxAttribute",
              name: "id",
              value: id,
            },
          ];
        } catch (e) {
          console.log("ERROR", e);
          return reject(e);
        }
      }

      resolve();
    });
}

export function replaceExamples(prisma: any) {
  return (tree: any) =>
    new Promise<void>(async (resolve, reject) => {
      const nodesToChange = new Array();

      visit(tree, "mdxJsxFlowElement", (node: any) => {
        if (node.name == "Examples") {
          nodesToChange.push({
            node,
          });
        }
      });
      for (const { node } of nodesToChange) {
        try {
          const data = await getExamples(node, prisma);
          node.attributes = [
            {
              type: "mdxJsxAttribute",
              name: "data",
              value: data,
            },
          ];
        } catch (e) {
          return reject(e);
        }
      }

      resolve();
    });
}

async function getExamples(node: any, prisma: any) {
  const names = node?.attributes[0].value.split(",");

  const data = new Array<any | null>();

  for (let i = 0; i < names.length; i++) {
    const results = await prisma.example.findUnique({
      where: {
        id: parseInt(names[i]),
      },
    });
    data.push(results);
  }

  return JSON.stringify(data);
}

export function replaceYouTubeVideos() {
  return (tree: any) =>
    new Promise<void>((resolve, reject) => {
      const nodesToChange: any = [];

      // Regex para identificar URLs do YouTube
      const youtubeRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

      visit(tree, "link", (node, index, parent) => {
        const match = node.url.match(youtubeRegex);
        if (match) {
          nodesToChange.push({
            node,
            videoId: match[1],
            parent,
            index,
          });
        }
      });

      for (const { node, videoId, parent, index } of nodesToChange) {
        try {
          const embedNode = {
            type: "mdxJsxFlowElement",
            name: "YouTubeEmbed",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "id",
                value: videoId,
              },
            ],
          };
          // Remove o nó do link e insere o embedNode fora de qualquer tag <p>
          if (parent.type === "paragraph") {
            parent.type = "div";
            parent.children = [embedNode];
          } else {
            parent.children.splice(index, 1, embedNode);
          }
        } catch (e) {
          console.log("ERROR", e);
          return reject(e);
        }
      }

      resolve();
    });
}

export function replaceLinksWithAnchors() {
  return (tree: any) => {
    visit(tree, "link", (node) => {
      if (node.url && node.url.startsWith("#")) {
        node.type = "mdxJsxFlowElement";
        node.name = "Anchor";
        node.attributes = [
          {
            type: "mdxJsxAttribute",
            name: "href",
            value: node.url,
          },
        ];
        node.children = [
          {
            type: "mdxJsxAttribute",
            name: "children",
            value: node.children.map((child: any) => child.value).join(""),
          },
        ];
      }
    });
  };
}

export function generateTOCPlugin() {
  return (tree: any) =>
    new Promise<void>((resolve, reject) => {
      try {
        const toc: { depth: number; text: string; id: string }[] = [];

        // Percorre o documento para encontrar todos os cabeçalhos e criar o TOC
        visit(tree, "heading", (node: any) => {
          const depth = node.depth;
          const text = extractText(node);
          const id = text.toLowerCase().replace(/\s+/g, "-");
          toc.push({
            depth,
            text,
            id,
          });

          // Opcionalmente, adiciona um id ao nó de cabeçalho
          if (!node.data) node.data = {};
          if (!node.data.hProperties) node.data.hProperties = {};
          node.data.hProperties.id = id;
        });

        // Procura o texto [[TOC_HEADINGS]] no documento
        //@ts-ignore
        visit(tree, "paragraph", (node: any, index: number, parent: any) => {
          const textNode = node.children.find(
            (child: any) =>
              child.type === "text" && child.value === "[[TOC_HEADINGS]]",
          );
          if (textNode) {
            // Remove o parágrafo com [[TOC_HEADINGS]] e substitui pelo componente TOC
            parent.children.splice(index, 1, {
              type: "mdxJsxFlowElement",
              name: "TOC",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "toc",
                  value: JSON.stringify(toc), // Serializa o TOC como uma string JSON
                },
              ],
            });
          }
        });

        resolve();
      } catch (error) {
        console.error("Error generating TOC:", error);
        reject(error);
      }
    });
}

function extractText(node: any): string {
  return node.children
    .filter((child: any) => child.type === "text")
    .map((textNode: any) => textNode.value)
    .join("");
}

async function getProductData(prisma: any, productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        image: true,
        urlAfiliate: true,
        description: true,
        medias: true,
        reviews: true,
        features: true,
        sources: { select: { source: true, url: true } },
      },
    });
    return product;
  } catch (error) {}
}

async function getProductsData(prisma: any, postId: string) {
  try {
    const products = await prisma.product.findMany({
      where: { posts: { some: { id: postId } } },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        image: true,
        urlAfiliate: true,
        description: true,
        medias: true,
        reviews: true,
        features: true,
        posts: { select: { title: true, keywords: true } },
        sources: { select: { source: true, url: true } },
      },
      orderBy: { order: "asc" },
    });

    return products;
  } catch (error) {}
}

export function replaceProductReviews(prisma: any) {
  return async (tree: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const nodesToReplace: any[] = [];
      const paragraphsToRemove: any = new Set();

      visit(tree, "text", (node, index, parent) => {
        if (typeof node.value === "string") {
          const regex = /\[\[REVIEW_PRODUCT\((.*?)\)\]\]/g;
          let match;

          while ((match = regex.exec(node.value)) !== null) {
            const productId = match[1];
            nodesToReplace.push({ node, index, parent, productId });
            if (parent && parent.type === "paragraph") {
              paragraphsToRemove.add(parent);
            }
          }
        }
      });

      // Remove os parágrafos antes de adicionar os novos nós
      for (const para of paragraphsToRemove) {
        if (para && para.parent && Array.isArray(para.parent.children)) {
          para.parent.children = para.parent.children.filter(
            (child: any) => child !== para,
          );
        }
      }

      for (const { node, index, parent, productId } of nodesToReplace) {
        try {
          const product = await getProductData(prisma, productId);

          if (!product) {
            console.warn(
              `Product with ID ${productId} not found. Skipping replacement.`,
            );
            continue;
          }

          const embedNode = {
            type: "mdxJsxFlowElement",
            name: "ProductReview",
            attributes: [
              { type: "mdxJsxAttribute", name: "id", value: productId },
              {
                type: "mdxJsxAttribute",
                name: "title",
                value: product?.title || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "subTitle",
              },
              {
                type: "mdxJsxAttribute",
                name: "shortDescription",
                value: product?.shortDescription || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "image",
                value: product?.image || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "urlAffiliate",
                value: product?.urlAfiliate || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "description",
                value: product?.description || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "medias",
                value: JSON.stringify(product?.medias) || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "reviews",
                value: JSON.stringify(product?.reviews) || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "features",
                value: JSON.stringify(product?.features) || "",
              },
              {
                type: "mdxJsxAttribute",
                name: "sources",
                value: JSON.stringify(product?.sources) || "",
              },
            ],
          };

          // Substitui o nó de texto pelo novo nó do componente
          if (parent && Array.isArray(parent.children)) {
            // Verifica se o nó pai é um parágrafo e remove o parágrafo
            if (parent.type === "paragraph") {
              parent.type = "div";
              parent.children = [embedNode];
            } else {
              parent.children.splice(index, 1, embedNode);
            }
          } else {
            console.warn(
              "Parent or parent.children is not valid. Skipping node replacement.",
            );
          }
        } catch (e) {
          console.error(`Error processing product ID ${productId}:`, e);
          continue;
        }
      }

      resolve();
    });
  };
}

export function replaceTopProducts(prisma: any) {
  return async (tree: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const nodesToReplace: any[] = [];
      const paragraphsToRemove: any = new Set();

      visit(tree, "text", (node, index, parent) => {
        if (typeof node.value === "string") {
          const regex = /\[\[TOP_PRODUCTS\((.*?)\)\]\]/g;
          let match;

          while ((match = regex.exec(node.value)) !== null) {
            const postId = match[1];
            nodesToReplace.push({ node, index, parent, postId });
            if (parent && parent.type === "paragraph") {
              paragraphsToRemove.add(parent);
            }
          }
        }
      });

      // Remove os parágrafos antes de adicionar os novos nós
      for (const para of paragraphsToRemove) {
        if (para && para.parent && Array.isArray(para.parent.children)) {
          para.parent.children = para.parent.children.filter(
            (child: any) => child !== para,
          );
        }
      }

      for (const { node, index, parent, postId } of nodesToReplace) {
        try {
          const products = await getProductsData(prisma, postId);

          if (!products) {
            console.warn(
              `Product with ID ${postId} not found. Skipping replacement.`,
            );
            continue;
          }

          const embedNode = {
            type: "mdxJsxFlowElement",
            name: "TopProducts",
            attributes: [
              { type: "mdxJsxAttribute", name: "id", value: postId },
              {
                type: "mdxJsxAttribute",
                name: "products",
                value: JSON.stringify(products) || "",
              },
            ],
          };

          // Substitui o nó de texto pelo novo nó do componente
          if (parent && Array.isArray(parent.children)) {
            // Verifica se o nó pai é um parágrafo e remove o parágrafo
            if (parent.type === "paragraph") {
              parent.type = "div";
              parent.children = [embedNode];
            } else {
              parent.children.splice(index, 1, embedNode);
            }
          } else {
            console.warn(
              "Parent or parent.children is not valid. Skipping node replacement.",
            );
          }
        } catch (e) {
          console.error(`Error processing product ID ${postId}:`, e);
          continue;
        }
      }

      resolve();
    });
  };
}

export function replaceListProducts(prisma: any) {
  return async (tree: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const nodesToReplace: any[] = [];
      const paragraphsToRemove: any = new Set();

      visit(tree, "text", (node, index, parent) => {
        if (typeof node.value === "string") {
          const regex = /\[\[LIST_PRODUCTS\((.*?)\)\]\]/g;
          let match;

          while ((match = regex.exec(node.value)) !== null) {
            const postId = match[1];
            nodesToReplace.push({ node, index, parent, postId });
            if (parent && parent.type === "paragraph") {
              paragraphsToRemove.add(parent);
            }
          }
        }
      });

      // Remove os parágrafos antes de adicionar os novos nós
      for (const para of paragraphsToRemove) {
        if (para && para.parent && Array.isArray(para.parent.children)) {
          para.parent.children = para.parent.children.filter(
            (child: any) => child !== para,
          );
        }
      }

      for (const { node, index, parent, postId } of nodesToReplace) {
        try {
          const products = await getProductsData(prisma, postId);

          if (!products) {
            console.warn(
              `Product with ID ${postId} not found. Skipping replacement.`,
            );
            continue;
          }

          const embedNode = {
            type: "mdxJsxFlowElement",
            name: "ListProducts",
            attributes: [
              { type: "mdxJsxAttribute", name: "id", value: postId },
              {
                type: "mdxJsxAttribute",
                name: "products",
                value: JSON.stringify(products) || "",
              },
            ],
          };

          // Substitui o nó de texto pelo novo nó do componente
          if (parent && Array.isArray(parent.children)) {
            // Verifica se o nó pai é um parágrafo e remove o parágrafo
            if (parent.type === "paragraph") {
              parent.type = "div";
              parent.children = [embedNode];
            } else {
              parent.children.splice(index, 1, embedNode);
            }
          } else {
            console.warn(
              "Parent or parent.children is not valid. Skipping node replacement.",
            );
          }
        } catch (e) {
          console.error(`Error processing product ID ${postId}:`, e);
          continue;
        }
      }

      resolve();
    });
  };
}
