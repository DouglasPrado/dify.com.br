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
      message = `Escreva um artigo 100% único, baseado nesse texto: {text}. 
      Faça um texto criativo e de estilo humano. 
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

  const post: any = await prisma.post.findFirst({ where: { id: postId } });

  const openai = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const retriever: any = await constructorText(postId, "docs");

  const contentFineTunning: any = await prisma.contentFineTunning.findFirst({
    where: {
      siteId: post.siteId,
      interface: "blog",
    },
    select: { prompt: true },
  });

  const prompt = PromptTemplate.fromTemplate(
    contentFineTunning.prompt || PROMPT_MAIN,
  );

  const documentChain = await createStuffDocumentsChain({
    llm: openai,
    prompt,
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const quantityOutlines = post?.outlines?.split("\n")?.length;

  const response = await retrievalChain.invoke({
    input: "",
    outlines: post?.outlines,
    keywords: post?.keywords,
    limitWords:
      post?.limitWords / (quantityOutlines > 8 ? 8 : quantityOutlines - 1 || 8),
  });

  return `${response.answer}`;
};
// https://www.youtube.com/watch?v=nRXXInjBNN8
const PROMPT_MAIN = `
Contexto:
<context>{context}</context>.

Instrução:
Escreva um texto sobre com uma introdução de 200 palavras e faça outlines com desdobramento de cada outline com texto até {limitWords} palavras palavras cada desdobramento. 
Reescreva a outlines para otimizar para os mecanismos de busca.
As outlines deverá começar com um título h2 respeite a quantidade de 60 caracteres
Ao escrever o texto lembre-se de escrever frases com um máximo 30 palavras cada. Use a palavra-chave para otimização de busca SEO: <keywords>{keywords}</keywords>. O texto deve ser 100% original, escrito em primeira pessoa, e incluir todas as especificações técnicas necessárias. Ele deve ser simples o suficiente para que uma criança de 7 anos compreenda.

Demonstração:
Considere os exemplos de outlines disponíveis: <outlines>{outlines}</outlines>. Divida o texto em frases curtas, com no máximo 30 palavras cada. Destaque os trechos importantes com negrito ou itálico. Use contrações, expressões idiomáticas, frases de transição, interjeições e coloquialismos, mas evite gírias e excesso de emojis.

Implementação:
Certifique-se de que o texto esteja livre de plágio e erros. Inclua um ponto de interrogação no final das perguntas. Otimize o texto para aparecer na primeira página do Google e garanta que ele passe facilmente no teste de ferramentas de detecção de IA. O texto deve ter no máximo {limitWords} palavras e ser organizado com marcação textual adaptada para o editor tiptap 2.
`;
