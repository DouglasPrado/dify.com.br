"use server";

import prisma from "@/lib/prisma";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const generateMagic = async (formData: FormData, postId: string) => {
  const content: any = formData.get("content");
  const text = await constructorText(postId, content);
  const type: any = formData.get("type");
  let message = "";

  switch (type) {
    case "slug":
      message = `I want you to create an optimized slug based on this text: {text}. The slug short should be a maximum of 60 characters. Describe In Portuguese Brazil. Return Only Slug`;
      break;
    case "title":
      message = `I want you to create an optimized title for Google based on this text: {text}. The title should be a maximum of 60 characters. Describe In Portuguese Brazil, Response only title.`;
      break;
    case "description":
      message = `I want you to create an optimized description for Google based on this text: {text}. The text should be a maximum of 180 characters. Describe In Portuguese Brazil; Return Only Description`;
      break;
    case "topics":
      message = `I want you to create an optimized topics from articles based on this text: {text}. Describe In Portuguese Brazil In Markdown all topics in ## and not use # (h1)`;
      break;
    case "content":
      const { siteId }: any = await prisma?.post.findFirst({
        where: { id: postId },
        select: { siteId: true },
      });
      const example = await prisma.contentFineTunning.findFirst({
        where: { siteId, type: "example", interface: "blog" },
        select: { content: true },
      });
      message = `Escreva um artigo 100% único, baseado nesse texto: {text}. 
      Faça um texto criativo e de estilo humano. 
      A estrutura completa do artigo e o estilo de escrita estão detalhados abaixo: ${
        example ? example.content : ""
      }. 
      Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais. 
      Não faça uso de girias e não utilize muitos emojis.
      Certifique-se de que o post esteja livre de plágio. 
      Não se esqueça de usar um ponto de interrogação no final das perguntas. 
      Escreva conteúdo que possa passar facilmente no teste das ferramentas de detecção de IA.
      Gere o conteúdo em português do Brasil e em Markdown.
      Evite utilizar h1 (#) e a palavra "conclusão".`;
      break;
  }
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `Sou o redator principal de um site incrível de artigos que aborda uma variedade de tópicos interessantes. Sempre que escrevo, gosto de dar uma vibe descontraída e leve, usando uma linguagem amigável e divertida.
Meu estilo é bastante pessoal, e eu costumo me expressar em primeira pessoa para criar uma conexão mais próxima com os leitores. Adoro fazer com que até os tópicos mais complexos pareçam simples e envolventes.
`,
    ],
    ["human", message],
  ]);
  const chain = RunnableSequence.from([
    prompt,
    new ChatOpenAI({
      modelName: "gpt-4o-mini",
    }),
    new StringOutputParser(),
  ]);

  const response = await chain.invoke({
    text,
  });

  return response.replaceAll('"', "");
};

const constructorText = async (
  postId: string,
  type: "docs" | "text" = "text",
  content?: string,
) => {
  let message: string = "";
  const fromTexts: any[] = [];
  const fromIndex: any[] = [];
  if (content) {
    message = content;
  } else {
    const post = await prisma?.post.findFirst({
      where: { id: postId },
      include: {
        references: true,
      },
    });

    if (post && post?.references?.length > 0) {
      let text = "";

      post.references.map(async (reference, idx: number) => {
        if (reference.content) {
          text += reference.content + "\n";
          fromTexts.push(reference.content);
          fromIndex.push({ id: idx + 1 });
        }
      });
      message = JSON.stringify(text);
    } else {
      message = JSON.stringify(post!.content);
    }
  }
  if (type === "docs") {
    const vectorStore = await MemoryVectorStore.fromTexts(
      fromTexts,
      fromIndex,
      new OpenAIEmbeddings(),
    );
    return vectorStore.asRetriever();
  }
  // message = message.slice(0, 5000);
  return message;
};

export const generateContentArticle = async (
  formData: FormData,
  postId: string,
) => {
  await prisma.post.update({
    where: { id: postId },
    data: {
      //@ts-ignore
      contentJSON: null,
      published: false,
    },
  });
  //CRIAR A INTRODUÇÃO DO ARTIGO
  //OUTLINES
  //CRIAR O CONTEXTO DAS OUTLINES
  //CRIAR A CONCLUSÃO
  const post: any = await prisma.post.findFirst({ where: { id: postId } });

  const openai = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0,
  });

  const retriever: any = await constructorText(postId, "docs");

  const prompt = PromptTemplate.fromTemplate(PROMPT_MAIN);
  const documentChain = await createStuffDocumentsChain({
    llm: openai,
    prompt,
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  // const example = await prisma.contentFineTunning.findFirst({
  //   where: { siteId: post!.siteId, type: "example", interface: "blog" },
  //   select: { content: true },
  // });
  // const introduction = await retrievalChain.invoke({
  //   input: PROMPT_INTRODUCTION,
  // });
  const quantityOutlines = post?.outlines?.split("\n")?.length;
  const INPUT = `Faça uma introdução de 200 palavras e faça outlines com desdobramento de cada outline com texto até ${
    post?.limitWords / (quantityOutlines > 8 ? 8 : quantityOutlines - 1 || 8)
  } palavras palavras cada desdobramento. 
    Reescreva a outlines para otimizar para os mecanismos de busca.
    As outlines deverá começar com um título h2 respeite a quantidade de caracteres: <caracteres>60</caracteres>, 
    ter um final coeso apontando para a próxima outline.
  `;

  const response = await retrievalChain.invoke({
    input: INPUT,
    outlines: post?.outlines,
    keywords: post?.keywords,
    limitWords: post?.limitWords,
  });

  // const conclusion = await retrievalChain.invoke({
  //   input: PROMPT_CONCLUSION,
  // });

  return `${response.answer}`;
};
// https://www.youtube.com/watch?v=nRXXInjBNN8
const PROMPT_MAIN = `
Baseado nesse contexto: <context>{context}</context>. 
{input}
Segue os exemplos das outlines <outlines>{outlines}</outlines>
Segue a palavra chave para otimização de busca SEO. <keywords>{keywords}</keywords>
O Texto deve ser 100% único. 
Lembre-se sempre de escrever em primeira pessoa.
Sempre que houver especificações técnicas não deixe de expor.
O Texto deverá ser simples para que uma criança de 7 anos entenda.
O texto deverá ser criativo e de estilo humano. 
Divida o texto em frases curtas até 30 palavras.
Destaque todos os trechos importantes do texto com negritos ou italicos.
Escrevas frases faceis de ler. Frase difícil de ler. Considere reescrevê-la.
Substitua palavras complexas demais.
Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais. 
Não faça uso de girias e não utilize muitos emojis.
Certifique-se de que o texto esteja livre de plágio. 
Não se esqueça de usar um ponto de interrogação no final das perguntas. 
Escreva conteúdo que possa passar facilmente no teste das ferramentas de detecção de IA.
Otimize o texto para apararecer na primeira página no Google.
O texto todo deverá ter no máximo {limitWords} palavras escritas.
Seja totalmente organizado e forneça texto com marcação textual adaptado para inserir no editor tiptap 2.
`;
