import type { Example, PrismaClient } from "@prisma/client";
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

export function replaceExamples(prisma: PrismaClient) {
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

async function getExamples(node: any, prisma: PrismaClient) {
  const names = node?.attributes[0].value.split(",");

  const data = new Array<Example | null>();

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

        visit(tree, "heading", (node: any) => {
          const depth = node.depth;
          const text = extractText(node);
          const id = text.toLowerCase().replace(/\s+/g, "-");
          toc.push({
            depth,
            text,
            id,
          });

          // Optionally add an id to the heading node
          if (!node.data) node.data = {};
          if (!node.data.hProperties) node.data.hProperties = {};
          node.data.hProperties.id = id;
        });

        // Add the TOC component at the beginning of the document
        tree.children.unshift({
          type: "mdxJsxFlowElement",
          name: "TOC",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "toc",
              value: JSON.stringify(toc), // Serialize the TOC as a JSON string
            },
          ],
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
