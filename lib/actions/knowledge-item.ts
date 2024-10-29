"use server";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { SitemapLoader } from "@langchain/community/document_loaders/web/sitemap";
import { Innertube } from "youtubei.js/web";

import prisma from "@/lib/prisma";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { KnowledgeItem, type_reference } from "@prisma/client";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { getSession, withKnowledgeItemAuth } from "../auth";

export const generateKnowledgeItemText = async (
  formData: FormData,
  id: string,
) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const reference = formData.get("reference") as string;
  const type = formData.get("type") as type_reference;
  const postId = formData.get("postId") as string;
  const productId = formData.get("productId") as string;
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  let knowledge = await prisma.knowledge.findFirst({
    where: { id, interface: "post" },
  });

  if (!knowledge) {
    knowledge = await prisma.knowledge.create({
      data: {
        title: title || "(Sem título)",
        interface: "post",
        ...(postId && { postId }),
        ...(productId && { productId }),
        siteId: knowledge.siteId,
      },
    });
  }

  const knowledgeItem = await prisma.knowledgeItem.create({
    data: {
      type,
      title,
      content,
      reference,
      knowledgeId: knowledge.id,
    },
  });

  return knowledgeItem;
};

export const generateKnowledgeItemYoutube = async (
  formData: FormData,
  knowledgeId: string,
) => {
  const { siteId }: any = await prisma.knowledge.findFirst({
    where: { id: knowledgeId },
    select: { siteId: true, id: true },
  });
  const code = formData.get("code") as string;
  const postId = formData.get("postId") as string;
  const productId = formData.get("productId") as string;
  const youtube = await Innertube.create({
    retrieve_player: false,
    enable_safety_mode: false,
  });

  const info = await youtube.getInfo(code);
  const transcriptData = await info.getTranscript();
  if (transcriptData) {
    let content = transcriptData
      .transcript!.content!.body!.initial_segments.map(
        (segment) => segment.snippet.text,
      )
      .join(" ");
    const title = info.basic_info.title || "Sem título para " + code;

    let knowledge = await prisma.knowledge.findFirst({
      where: { id: knowledgeId, interface: "post" },
    });

    if (!knowledge) {
      knowledge = await prisma.knowledge.create({
        data: {
          title: title || "(Sem título)",
          interface: "post",
          ...(postId && { postId }),
          ...(productId && { productId }),
          siteId,
        },
      });
    }

    const knowledgeItem = await prisma.knowledgeItem.create({
      data: {
        type: "youtube",
        title,
        content,
        reference: `https://youtu.be/${code}`,
        knowledgeId: knowledge.id,
      },
    });

    return knowledgeItem;
  }
};

export const generateKnowledgeItemURL = async (
  formData: FormData,
  knowledgeId: string,
) => {
  const { siteId }: any = await prisma.knowledge.findFirst({
    where: { id: knowledgeId },
    select: { siteId: true, id: true },
  });

  const url = formData.get("url");
  const postId = formData.get("postId") as string;
  const productId = formData.get("productId") as string;

  const loader = new CheerioWebBaseLoader(url as string);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);

  // //Adicionar contexto no OPENAI
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings,
  );
  //Execução do chat
  const prompt = PromptTemplate.fromTemplate(
    `Contexto:
    <context>{context}</context>.
    
    Instrução:
    Crie um texto 100% único, com o máximo de riqueza e detalhes que você conseguir.
    
    Demonstração:
    Divida o texto em frases curtas, com no máximo 30 palavras cada. 
    Use contrações, expressões idiomáticas, frases de transição, interjeições e coloquialismos, mas evite gírias e excesso de emojis.
    
    Implementação:
    O texto deve ser organizado com marcação textual adaptada para o editor tiptap 2.
      `,
  );

  const documentChain = await createStuffDocumentsChain({
    llm: new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0,
      maxTokens: 4096,
    }),
    prompt,
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.invoke({
    input: "português do Brasil",
  });

  const loaderWithSelector = new CheerioWebBaseLoader(url as string, {
    selector: "title",
  });

  const docsWithSelector = await loaderWithSelector.load();
  const pageTitle = docsWithSelector[0].pageContent;

  let knowledge = await prisma.knowledge.findFirst({
    where: { id: knowledgeId, interface: "post" },
  });

  if (!knowledge) {
    knowledge = await prisma.knowledge.create({
      data: {
        title: pageTitle || "(Sem título)",
        interface: "post",
        ...(postId && { postId }),
        ...(productId && { productId }),
        siteId,
      },
    });
  }

  const knowledgeItem = await prisma.knowledgeItem.create({
    data: {
      type: "url",
      title: pageTitle,
      content: `${result.answer}`,
      reference: url as string,
      knowledgeId: knowledge.id,
    },
  });

  return knowledgeItem;
};

export const generateKnowledgeItemSiteMap = async (
  formData: FormData,
  knowledgeId: string,
) => {
  const url = formData.get("url");
  const postId = formData.get("postId") as string;
  const productId = formData.get("productId") as string;
  const loader = new SitemapLoader(url as string);

  const sitemap = await loader.parseSitemap();
  console.log(sitemap);

  const { siteId }: any = await prisma.knowledge.findFirst({
    where: { id: knowledgeId },
    select: { siteId: true, id: true },
  });

  return true;
};

export const updateKnowledgeItem = async (data: any) => {
  try {
    const knowledgeItem = await prisma.knowledgeItem.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return knowledgeItem;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateKnowledgeItemMetadata = withKnowledgeItemAuth(
  async (formData: FormData, knowledge: any, key: string) => {
    const value = formData.get(key) as string;
    try {
      const response = await prisma.knowledgeItem.update({
        where: {
          id: knowledge.id,
        },
        data: {
          [key]: value,
        },
      });
      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteKnowledgeItem = withKnowledgeItemAuth(
  async (_: FormData, knowledgeItem: KnowledgeItem) => {
    try {
      const response = await prisma.knowledgeItem.delete({
        where: {
          id: knowledgeItem.id,
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
