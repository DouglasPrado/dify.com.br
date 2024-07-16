"use server";

import prisma from "@/lib/prisma";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { SitemapLoader } from "@langchain/community/document_loaders/web/sitemap";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Site, type_reference } from "@prisma/client";
import { getSession, withSiteAuth } from "../auth";

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
  const code = formData.get("code");
  const loader = YoutubeLoader.createFromUrl(`https://youtu.be/${code}`, {
    language: "pt",
    addVideoInfo: true,
  });

  const docs = await loader.load();
  console.log(docs);
  // const splitter = new RecursiveCharacterTextSplitter();

  // const splitDocs = await splitter.splitDocuments(docs);

  // //Adicionar contexto no OPENAI
  // const embeddings = new OpenAIEmbeddings();
  // const vectorstore = await MemoryVectorStore.fromDocuments(
  //   splitDocs,
  //   embeddings,
  // );
  // console.log(vectorstore.memoryVectors);
  const { siteId }: any = await prisma.post.findFirst({
    where: { id: postId },
    select: { siteId: true, id: true },
  });
  // const example = await prisma?.contentFineTunning.findFirst({
  //   where: { siteId, type: "example", interface: "blog" },
  //   select: { content: true },
  // });
  // const prompt = PromptTemplate.fromTemplate(
  //   `Escreva um artigo 100% único, baseado nesse texto com enfase no título do contexto: <context>
  //   {context}
  //   </context>.
  //   Evite propagandas no texto.
  //   Faça um texto criativo e de estilo humano.
  //   A estrutura completa do artigo e o estilo de escrita estão detalhados abaixo: ${
  //     example ? example.content : ""
  //   }.
  //   Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais.
  //   Não faça uso de girias e não utilize muitos emojis.
  //   Certifique-se de que o post esteja livre de plágio.
  //   Não se esqueça de usar um ponto de interrogação no final das perguntas.
  //   Escreva conteúdo que possa passar facilmente no teste das ferramentas de detecção de IA.
  //   Gere o conteúdo em {input} e em Markdown.
  //   Evite utilizar h1 (#) e a palavra "conclusão".
  //   `,
  // );

  // const documentChain = await createStuffDocumentsChain({
  //   llm: new AzureChatOpenAI({
  //     modelName: "gpt-4o",
  //   }),
  //   prompt,
  // });

  // const retriever = vectorstore.asRetriever();

  // const retrievalChain = await createRetrievalChain({
  //   combineDocsChain: documentChain,
  //   retriever,
  // });

  // const result = await retrievalChain.invoke({
  //   input: "português do Brasil",
  // });
  let content = "";

  docs.map((context) => {
    content += `${context.metadata.title} - ${context.pageContent}`;
  });
  await prisma.reference.create({
    data: {
      siteId,
      type: "youtube",
      content: `${content}`,
      reference: `https://youtu.be/${code}`,
      postId,
    },
  });
  // await prisma?.post.update({
  //   where: { id: postId },
  //   data: {
  //     content: `${result.answer}`,
  //   },
  // });
  // console.log(result);
  return true;
};

export const generateReferenceURL = async (
  formData: FormData,
  postId: string,
) => {
  const url = formData.get("url");
  const loader = new PuppeteerWebBaseLoader(url as string, {
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    async evaluate(page, browser) {
      const result = await page.evaluate(() => document.body.innerText);
      await browser.close();
      return result;
    },
  });

  const docs = await loader.load();
  console.log(docs);

  const { siteId }: any = await prisma.post.findFirst({
    where: { id: postId },
    select: { siteId: true, id: true },
  });

  let content = "";

  docs.map((context) => {
    content += `${context.pageContent}`;
  });
  await prisma.reference.create({
    data: {
      siteId,
      type: "url",
      content: `${content}`,
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
