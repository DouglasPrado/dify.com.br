import prisma from "@/lib/prisma";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import type { NextRequest } from "next/server";
export const maxDuration = 150;
export const revalidate = 0;
const openai = new ChatOpenAI({
  openAIApiKey: String(process.env.OPENAI_API_KEY),
  modelName: "gpt-4-1106-preview",
  temperature: 0.7,
  cache: true,
});

const SEARCH_TITLE: string = "";
const LENGTH: string = "150";
const LANGUAGE: string = "português do brasil";
const AUDIENCE: string = "empreendedores";

export async function GET(request: NextRequest) {
  //Execução do chat
  const promptTitle = PromptTemplate.fromTemplate(
    `Make the best title in {language} for a {content} to rank on the first page of Google. Maximum {length} characters`,
  );

  const promptDescription = PromptTemplate.fromTemplate(
    `Make the best description in {language} until 160 characters for a {content} to rank on the first page of Google. Maximum {length} characters`,
  );

  const promptKeywords = PromptTemplate.fromTemplate(
    `Make the main 3 keywords in {language} for an article about {title} to rank on the first page of Google. Return only the keywords separated by commas. Example: "keyword1, keyword2, keyword3"`,
  );

  const promptStructure = PromptTemplate.fromTemplate(
    `Crie a estrutura de um texto separando cada trecho por uma posição sobre {title} em {language} com o objetivo de informar para um público de {audience}.`,
  );

  const promptCountStructure = PromptTemplate.fromTemplate(
    `Diga somente quantos trechos tem nessa estrutura {structureText}. Retorne somente o número.`,
  );

  const prompt = PromptTemplate.fromTemplate(
    `Escreva sobre o trecho {position} de no máximo {length} palavras que será parte de um artigo sobre {title} em {language}. 
    De um subtitulo para o trecho com h2.
    A estrutura completa do artigo e o estilo de escrita estão detalhados abaixo: {structureText}.
    Creative and in a human-like style. 
    Try to use contractions, idiomatic expressions, transition phrases, interjections, dangling modifiers, and colloquialisms, and avoid repetitive sentences and unnatural sentence structures. 
    Add bullet points or a numbered list if necessary. 
    Avoid creating text with introductions, conclusions, or questions, and always leave the subject open. 
    Ensure the article is free from plagiarism. Dont forget to use a question mark at the end in questions. Use at least 2 keywords. 
    Try not to change the title much when writing the title. Write content that can easily pass the test of AI detection tools. 
    Ensure the article is well-researched, citing credible sources where applicable. Aim for clarity, depth, and a logical flow of ideas.
    Retorne somente o trecho escrito em markdown.`,
  );

  const chain = promptKeywords
    .pipe(openai)
    .pipe(new CommaSeparatedListOutputParser());

  const structureChain = RunnableSequence.from([
    {
      keywords: chain,
      language: (input) => input.language,
      title: (input) => input.title,
      audience: (input) => input.audience,
    },
    promptStructure,
    openai,
    new StringOutputParser(),
  ]);

  const structureText: any = await structureChain.invoke({
    title: "Startup enxuta",
    language: "portugues do brasil",
    audience: AUDIENCE,
  });

  const countStructureChain = RunnableSequence.from([
    {
      structureText: (input) => input.structureText,
      title: (input) => input.title,
      language: (input) => input.language,
      length: (input) => input.length,
      position: (input) => input.position,
    },
    promptCountStructure,
    openai,
    new StringOutputParser(),
  ]);

  const countStructure: any = await countStructureChain.invoke({
    title: SEARCH_TITLE,
    language: LANGUAGE,
    length: LENGTH,
    position: "1",
    structureText,
  });

  const contentChain = RunnableSequence.from([
    {
      structureText: (input) => input.structureText,
      title: (input) => input.title,
      language: (input) => input.language,
      length: (input) => input.length,
      position: (input) => input.position,
    },
    prompt,
    openai,
    new StringOutputParser(),
  ]);

  let contentList = [];
  for (let n = 0; n < Number(countStructure); n++) {
    contentList.push({
      title: SEARCH_TITLE,
      language: LANGUAGE,
      length: LENGTH,
      position: n + 1,
      structureText,
    });
  }

  const content: any = await contentChain.batch(contentList);

  let mergeContent = "";
  content.forEach((part: string) => {
    mergeContent = mergeContent + "\n\n" + part;
  });
  const titleChain = RunnableSequence.from([
    {
      content: (input) => input.content,
      language: (input) => input.language,
      length: (input) => input.length,
    },
    promptTitle,
    openai,
    new StringOutputParser(),
  ]);

  const descriptionChain = RunnableSequence.from([
    {
      content: (input) => input.content,
      language: (input) => input.language,
      length: (input) => input.length,
    },
    promptDescription,
    openai,
    new StringOutputParser(),
  ]);

  const title: any = await titleChain.invoke({
    content: String(content),
    language: "portugues do brasil",
    length: "70",
  });

  const description: any = await descriptionChain.invoke({
    content: String(content),
    language: "portugues do brasil",
    length: "160",
  });

  try {
    const post = await prisma.post.create({
      data: {
        title: String(title),
        description: String(description),
        content: String(`${mergeContent}`),
        siteId: "clrusganu0000z808ciwzc0gc",
        userId: "clpkin7l20000w9yjbo8qmtgn",
      },
    });
    return Response.json(post);
  } catch (error) {
    console.log(error);
  }

  return Response.json({ error: true, message: "Ocorreu um erro" });
}
