"use server";

import prisma from "@/lib/prisma";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { SitemapLoader } from "@langchain/community/document_loaders/web/sitemap";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Reference, Site, type_reference } from "@prisma/client";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { getSession, withReferenceAuth, withSiteAuth } from "../auth";

export const getSiteFromReferenceId = async (referenceId: string) => {
  const reference = await prisma.reference.findUnique({
    where: {
      id: referenceId,
    },
    select: {
      siteId: true,
    },
  });
  return reference?.siteId;
};

export const createReference = withSiteAuth(
  async (formData: FormData, site: Site) => {
    const postId = formData.get("postId") as string;
    const content = formData.get("content") as string;
    const reference = formData.get("reference") as string;
    const type = formData.get("type") as type_reference;
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const response = await prisma.reference.create({
      data: {
        siteId: site.id,
        type,
        content,
        reference,
        postId,
      },
    });
    return response;
  },
);

export const generateReferenceYoutube = async (
  formData: FormData,
  postId: string,
) => {
  const { siteId }: any = await prisma.post.findFirst({
    where: { id: postId },
    select: { siteId: true, id: true },
  });
  const code = formData.get("code") as string;
  const loader = YoutubeLoader.createFromUrl(`https://youtu.be/${code}`, {
    addVideoInfo: true,
  });

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);

  // //Adicionar contexto no OPENAI
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings,
  );

  let title = "";
  docs.map((doc) => {
    title = doc.metadata.title;
  });

  //Execução do chat
  const prompt = PromptTemplate.fromTemplate(
    `Vou te passar um contexto e quero que você faça uma análise do contexto, se você identificar que o texto é código quero que você Imprima somente (contexto é código). Se o contexto existir um conteúdo que de para criar um texto, quero que crie um texto com 200 palavras resumindo o contexto e imprima somente o resumo. 
      Titulo: ${title}
      Contexto: <context>
      {context}
      </context>
      make article in {input} .
      `,
  );

  const documentChain = await createStuffDocumentsChain({
    llm: new ChatOpenAI({
      modelName: "gpt-4o-mini",
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

  await prisma.reference.create({
    data: {
      siteId,
      type: "youtube",
      title,
      content: `${result!.answer}`,
      reference: `https://youtu.be/${code}`,
      postId,
    },
  });

  return true;
};

export const generateReferenceURL = async (
  formData: FormData,
  postId: string,
) => {
  const { siteId }: any = await prisma.post.findFirst({
    where: { id: postId },
    select: { siteId: true, id: true },
  });

  const url = formData.get("url");
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
    `Vou te passar um contexto e quero que você faça uma análise do contexto, se você identificar que o texto é código quero que você Imprima somente (contexto é código). Se o contexto existir um conteúdo que de para criar um texto, quero que crie um texto com 200 palavras explicando o contexto e imprima somente o explicação. 
      Contexto: <context>
      {context}
      </context>
      make article in {input} .
      `,
  );

  const documentChain = await createStuffDocumentsChain({
    llm: new ChatOpenAI({
      modelName: "gpt-4o",
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

  await prisma.reference.create({
    data: {
      siteId,
      type: "url",
      content: `${result.answer}`,
      reference: url as string,
      postId,
    },
  });

  return true;
};

export const generateReferenceSiteMap = async (
  formData: FormData,
  postId: string,
) => {
  const url = formData.get("url");
  const loader = new SitemapLoader(url as string);

  const sitemap = await loader.parseSitemap();
  console.log(sitemap);

  const { siteId }: any = await prisma.post.findFirst({
    where: { id: postId },
    select: { siteId: true, id: true },
  });

  return true;
};

export const updateReference = async (data: Reference) => {
  try {
    const reference = await prisma.reference.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return reference;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateReferenceMetadata = withReferenceAuth(
  async (formData: FormData, reference: Reference, key: string) => {
    const value = formData.get(key) as string;
    try {
      const response = await prisma.reference.update({
        where: {
          id: reference.id,
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

export const deleteReference = withReferenceAuth(
  async (_: FormData, reference: Reference) => {
    try {
      const response = await prisma.reference.delete({
        where: {
          id: reference.id,
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
