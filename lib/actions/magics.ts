"use server";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

export const generateMagic = async (formData: FormData, postId: string) => {
  const content = formData.get("content");
  const type: any = formData.get("type");
  let message = "";

  switch (type) {
    case "title":
      message = `I want you to create an optimized title for Google based on this text: {text}. The title should be a maximum of 60 characters. In Portuguese Brazil`;
      break;
    case "description":
      message = `I want you to create an optimized description for Google based on this text: {text}. The text should be a maximum of 180 characters. In Portuguese Brazil`;
      break;
    case "content":
      message = `I want you to create an optimized topics from articles based on this text: {text}. In Portuguese Brazil In Markdown`;
      break;
  }
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Act as an expert copywriter specializing in content optimization for SEO.",
    ],
    ["human", message],
  ]);
  const chain = RunnableSequence.from([
    prompt,
    new ChatOpenAI({}),
    new StringOutputParser(),
  ]);

  const response = await chain.invoke({
    text: content,
  });
  console.log(response);
  return response.replaceAll('"', "");
};
