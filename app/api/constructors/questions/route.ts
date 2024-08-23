import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import type { NextRequest } from "next/server";

const loader = new CheerioWebBaseLoader("https://www.producthunt.com/");
export const maxDuration = 150;
export const revalidate = 0;

const openai = new ChatOpenAI({
  openAIApiKey: String(process.env.OPENAI_API_KEY),
});
export async function GET(request: NextRequest) {
  // Carregar o contexto
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);

  //Adicionar contexto no OPENAI
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings,
  );

  //Execução do chat
  const prompt =
    ChatPromptTemplate.fromTemplate(`Answer the following question in PT-BR based only on the provided context:
    <context>
    {context}
    </context>

    Question: {input}
  `);

  const documentChain = await createStuffDocumentsChain({
    llm: openai,
    prompt,
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.invoke({
    input: "list 10 apps ranking",
  });

  return Response.json(result);
}
