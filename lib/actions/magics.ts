"use server";

import prisma from "@/lib/prisma";
import { BaseMemory } from "@langchain/core/memory";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { AsyncCaller } from "@langchain/core/utils/async_caller";
import { compare } from "@langchain/core/utils/json_patch";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const DoNotRemoveCompare = compare;
const DoNotRemoveAsyncCaller = AsyncCaller;
const DoNotRemoveBaseMemory = BaseMemory;

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
      message = `I want you to create an optimized description for Google based on this text: {text}. The text should be a maximum of 155 characters. Describe In Portuguese Brazil; Return Only Description`;
      break;
    case "topics":
      message = `I want you to create an optimized topics from articles based on this text: {text}. Describe In Portuguese Brazil In Markdown all topics in ## and not use # (h2)`;
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
  let text = "";
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
    temperature: 0.7, // Moderada criatividade, mas ainda focada
    n: 1, // Obter uma resposta por vez, maximizada
  });

  const retriever: any = await constructorText(postId, "docs");

  const contentFineTunning: any = await prisma.contentFineTunning.findFirst({
    where: {
      siteId: post.siteId,
      interface: "blog",
    },
    select: { prompt: true, limitWords: true },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Vamos criar um texto informacional para o meu site de review, vou te munir com informações sobre o meu publico antes de começarmos, você entendeu?",
    ],
    [
      "system",
      "O objetivo é criar artigos informacionais é pra aumentar a minha autoridade do tópico com o Google, mostrar pra ele que sou expert no assunto e ter melhores rankings.",
    ],
    [
      "system",
      `Sou o redator principal de um site incrível de artigos que aborda uma variedade de tópicos interessantes. 
        Sempre que escrevo, gosto de dar uma vibe descontraída e leve, usando uma linguagem amigável e divertida.
        Meu estilo é bastante pessoal, e eu costumo me expressar em primeira pessoa para criar uma conexão mais próxima com os leitores. 
        Adoro fazer com que até os tópicos mais complexos pareçam simples e envolventes.`,
    ],
    ["user", PROMPT_MAIN],
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: openai,
    prompt,
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const outlines = post?.outlines?.split("\n") || [];
  let article = "";

  for (const outline of outlines) {
    const limitWord = Math.round(
      Math.min(post.limitWords / outlines.length, 400),
    ); // Limite de palavras por outline

    const response = await retrievalChain.invoke({
      input: outline,
      article,
      input_documents: retriever,
      keywords: post?.keywords,
      limitWord,
    });

    article += response.answer + "\n";
  }

  return article;
};

// https://www.youtube.com/watch?v=nRXXInjBNN8
const PROMPT_MAIN = `
Contexto:
<context>{context}</context>.

Artigo:
<artigo>{article}<artigo>

Instrução:
Faça um texto até {limitWord} palavras para outline: <outline>{input}</outline> para complementar o artigo que estou escrevendo. 
Observe o conteúdo do artigo, evite criar introduções e conclusões no texto.
Observe o conteúdo do artigo, caso ele esteja vazio crie uma introdução curta fazendo uma chamada para o restante do conteúdo.
Observe o conteúdo do artigo, se existe bullet point ou o artigo estiver vazio NÃO adicioner bullet point, caso contrário pode criar bullet point.
Observe o conteúdo do artigo, Evite repetir que já foram descritas em outros topicos do artigo.
Ao escrever o texto lembre-se de fazer frases curtas até 30 palavras pulando linha, Evite criar com padrão caso as frases forem curtas junte em frases maiores.
Comece o texto reescrevendo a outline com h2 em português do brasil e otimizando a outline para SEO e despois descreva o texto abaixo
O texto NÃO deve ter resumos, conclusões e frases de encerramento.
Observando o artigo como um todo, preste atenção no contexto para criar um artigo homogeneo e isotrópico e que faça sentido com o restante do artigo. 
Não saia fora do contexto da outline, descreva apenas o que aborda na outline.
Adicione h3 para enriquecer o conteúdo caso necessário.
Evite utilizar keywords no texto opte por utilizar palavras que pertecem ao mesmo campo semântico. <keywords>{keywords}</keywords>
O texto deve ser 100% original, escrito em primeira pessoa, e incluir todas as especificações técnicas necessárias. 
Ele deve ser simples o suficiente para que uma criança de 5 anos compreenda.
Caso seja necessário inclua bulletpoints para melhorar a experiencia do usuário
Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes, coloquialismos, evite frases repetitivas e estruturas de frases não naturais



Implementação:
Certifique-se de que o texto esteja livre de plágio e erros. 
Inclua um ponto de interrogação no final das perguntas. 
Otimize o texto para aparecer na primeira página do Google e garanta que ele passe facilmente no teste de ferramentas de detecção de IA. 
O formato do texto deverá Markdown Não é necessário adicionar aspas com markdown no início.
`;
// Para organizar melhor o texto adicione tópicos relevantes com h3 caso necessário

const PROMPT_MAIN_OLD = `
Contexto:
<context>{context}</context>.

Instrução:
Faça um texto até {limitWord} palavras para outline: <outline>{input}</outline> para complementar o artigo que estou escrevendo: <article>{article}<article>. 
Comece o texto reescrevendo a outline com h2 em português do brasil e otimizando a outline para SEO e despois descreva o texto abaixo
O texto NÃO deve ter resumos, conclusões e frases de encerramento.
Observando o artigo como um todo, preste atenção no contexto para criar um artigo homogeneo e isotrópico e que faça sentido com o restante do artigo. 
Não saia fora do contexto da outline, descreva apenas o que aborda na outline.
Evite repetir que já foram descritas em outros topicos do artigo.
Ao escrever o texto lembre-se de fazer frases curtas até 20 palavras.
Evite utilizar keywords no texto opte por utilizar palavras que pertecem ao mesmo campo semântico. <keywords>{keywords}</keywords>
O texto deve ser 100% original, escrito em primeira pessoa, e incluir todas as especificações técnicas necessárias. 
Ele deve ser simples o suficiente para que uma criança de 5 anos compreenda.
Adicione bullet points para melhorar a experiencia do usuario.
Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais.


Implementação:
Certifique-se de que o texto esteja livre de plágio e erros. 
Inclua um ponto de interrogação no final das perguntas. 
Otimize o texto para aparecer na primeira página do Google e garanta que ele passe facilmente no teste de ferramentas de detecção de IA. 
O formato do texto deverá Markdown Não é necessário adicionar aspas com markdown no início.
`;
