"use server";

import prisma from "@/lib/prisma";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { listGoogleSearch } from "../serper";

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

export const generateTitle = async (postId: string, examples?: string[]) => {
  const post = await prisma.post.findFirst({ where: { id: postId } });
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `Você é um especialista em criar títulos para artigos de blog e para escrever títulos você utiliza fundamentos que vou te passar: 
      <fundamentos>
        ( p * d ) ^ c = *p = prazer; d = dor; c = curiosidade*
        Portanto o jogo é: Prazer e dor elevado na potência da curiosidade.
        
        Quando quiser melhorar seus títulos, veja se eles atendem os 4Us:
          1. **Útil**: O título deve prometer algum tipo de benefício ou valor para o leitor. Por exemplo, pode ensinar algo novo, oferecer um desconto, resolver um problema, etc.
          2. **Urgente**: O título deve criar um senso de urgência que faça o leitor querer agir imediatamente. Isto pode ser feito através de uma oferta limitada no tempo ou uma situação que precisa ser resolvida rapidamente.
          3. **Único**: O título deve ser original e não algo que o leitor tenha visto repetidas vezes. Isso pode ser conseguido através do uso de uma ideia única, uma frase incomum, ou uma perspectiva única sobre um tópico.
          4. **Ultra-específico**: O título deve ser extremamente específico sobre o que está sendo oferecido. Isso ajuda a definir as expectativas do leitor e a fazer com que ele saiba exatamente o que vai obter.
        
        Palavras de Impacto: Gratuito, Novo, Você, Dinheiro, Economizar, Fácil, Amor, Descoberta, Resultados, Saúde, Aprovado, Garantido, Como …, Agora, Anuncia, Apresenta, Chegou, Lançado, Recém Chegou, Importante, Progresso Importante, Sensacional, Incrível, Inesquecível, Revolucionário, Milagre, Mágica, Rápido, Oferta, Desejado, Desafio, Conselho Para, A Verdade Sobre, Comparar, Desconto, Última Chance.
        Palavras de Poder: Agora, Agora Mesmo, Absolutamente, Conselho, Alcançar, Automaticamente, Alerta, Apaixonada, Acreditar, Aprovado, Amor, Altamente, Benefício, Barbada, Bem Sucedido, Criativa, Colorido, Colossal, Completa, Competitiva, Confidencial, Conquistar, Comprovada, Coração, Como, Confiável, Considerável,
        Derrota, Demanda, Desejo, Descontos, Direto, Dominação, Diferenciado, Dinheiro, Digna, De Sucesso, De Repente, Definitivo, Desejado, Encantado, Excelente, Expert, Estranho, Emocionante, Explicação, Exclusivo, Enorme, Entregue, Escondida, Escasso, Famoso, Fortuna, Fácil, Facilmente, Forte, Força de Vontade, Grandeza, Garantia, Genuíno, Garantido, Hábil, Hoje, Hoje Mesmo,Instrutivo, Imediata, Imediatamente, Instantâneo, Informativo, Inspirador, Interessante, Incrível, Inesperado, Incomum, Incondicional, Ilimitado, Inigualável,
        Linda, Lançamento, Limitado, Luxo, Lucrativa, Livre, Magia, Mistério, Mais, Mágico, Melhor, Maior, Maior Que, Mesmo Que, Melhorada, Maravilhoso, Novo, Notável, Obsessão, Oferta Especial, Poderosa, Perspectiva, Promessa, Pioneiro, Popular, Prática, Proibido, Profissional, Participe, Pouco Comum,
        Qualquer Um, Qualidade, Rápido, Rapidamente, Raro, Revelando, Reduzido, Revolução, Revolucionária, Recompensa, Resultados, Recém-chegado, Robusto, Riqueza, Seguro, Segurança, Salvar, Segredo(s), Seguro, Sensação, Simples, Sensacional, Surpreendente, Sonho, Sempre, Saúde, Saudável, Super, Superior, Surpresa, Selvagem, Sim, Seu,
        Tech, Último, Único, Urgente, Útil, Valor, Valioso, Vitalício, Venda, Você.
      </fundamentos>

      Alguns modelos que você se baseia para criar o seu título: 
      <modelos>  
        Vamos agora a uma lista de títulos comprovados. Alguns são clássicos que vêm sendo usados há literalmente dezenas de anos. Outros são mais novos e recentes.

        Ser mais novo ou velho não significa necessariamente que é melhor ou pior. Há alguns títulos clássicos que funcionam até hoje e vão continuar a funcionar por muito tempo. Há títulos novos que também chegaram com tudo.
        
        De qualquer jeito, use e abuse da lista abaixo quando estiver tentando criar seus títulos. Suas chances e consequentemente seu lucro aumentará junto.
        
        Títulos Abertos de Mercado:
          - As X perguntas que você precisa fazer a [PESSOA] antes de [AÇÃO]
          - Os X maiores erros em [NICHO]
          - As X Maiores Ameaças Escondidas Sobre [NICHO]
          - 5 Tendências Destrutivas Que Estão Acabando Com [NICHO]
          - Os X Desafios Críticos Que Todos [GRUPO] Está Enfrentando em [Tema]
          - Os X Erros Grotescos Responsáveis por [RESULTADO RUIM]
          - A Importância de [ATIVIDADE] Para o Seu [NICHO/COISA] (“aprender instrumento musical para seus filhos”)
          - Os X Maiores Erros ao Escolher [PROFISSIONAL/EMPRESA]
          - Os X Inimigos Invisíveis Que Estão Detonando [NICHO]
        
        Ameaças – O que mantêm os seus leitores acordados a noite?
          - O Quão Seguro É O Seu [Pessoa/Objeto Valioso] Contra [Potencial Ameaça]?
          - X Sinais de Aviso Que […]
          - Aviso: […]
          - Como [Eliminar um Problema/Dor Específico] Sem [Outros Problemas/Consequências]
          - Porque [Alguma “Verdade” Popular] Não Funciona … E o Que Fazer a Respeito
          - Será Que Nós Realmente Podemos Confiar No/Na [Pessoa/Empresa/Produto]?
          - A Verdade Chocante Sobre […]
          - A Grande Farsa: […]
          - O Que Fazer Se [Situação Específica e Emocional Acontecendo]
          - Se [Situação Específica e Emocional Acontecendo], Então Talvez [Seu Pior Medo Seja Verdade]
          - Como [Alguém/Algo] Está Apostando Com Seu/Sua […]: X Maneiras de Você se Proteger
          - X Mentiras Que [Grupo de Pessoas/Empresa] Gosta de Contar
          - X Verdades Que o Seu/Sua [Pessoa/Empresa de Confiança] Jamais Lhe Dirá
          - X Fatores Pouco Conhecidos Que Podem Afetar o Seu/Sua […]
          - [Seus Clientes], Cuidado: A Nova Farsa Com […] Que Você Deve Evitar
        
        Zen – Prometendo a seus clientes uma vida mais simples
          - O Zen do […]
          - Cansado!? 11 Maneiras Fáceis de Simplificar o Seu […]
          - Como Tomar Controle de Uma Vez Por Todas do Seu [Problema Gravíssimo]
          - O Guia Simples e Prático Para [Problema Gravíssimo] De Uma Vez Por Todas
          - X Macetes/Dicas para Você [Finalizar tarefa chata] em Tempo Recorde
          - Livre-se de [Problema Recorrente] de Uma Vez por Todas!
          - Como Acabar com [Problema]
          - Como [Alguma Ação] em 5 Minutos
          - X Dicas de […]: O Guia Definitivo Para […]
        
        Sobre o ombro de gigantes – se aproveitando de marcas e pessoas famosas
          - [Faça Algo] Como [Pessoa Famosa]: 20 Maneiras Para […]
          - As X Melhores Dicas do/da [Pessoa Famosa] Para […]
          - O/A [Referência Mundial] Escola de […]
          - O/A [Referência Mundial] Guia para […]
          - Os Segredos dos [Grupo Famoso]
          - O Que [Referência Mundial] Pode Nos Ensinar Sobre […]
        
        Erros – Se aproveitando das falhas que todos temos
          - Você Também Comete Estes 9 Erros Quando/Na Hora de […]?
          - X Erros Bobos Que Você Faz em […] que Fazem Você Parecer um Idiota
          - X Erros no Seu […] Que Fazem Você [Parecer/Falar] Como um […]
          - […]: X Erros que Você Não Sabe que Você Está Cometendo
          - Não Cometa Estes 12 Erros Quando Você […]
        
        “Como …” – Clássicas e Efetivas
          - Como Fazer […]
          - Como Ser [Qualidade Desejável]
          - Como Conseguir [Resultados] [Rapidamente/Fácil/Prático][Sem Riscos/Garantido]
          - Como Fazer Para […] (Mesmo Que [Obstáculo Comum])
          - Como Fazer […] Sem [Precisar de Algo/Causar um Problema]
          - Como Você Pode [Fazer Algo] Enquanto Você [Faz Algo Diferente]
          - Como [Transformar um Problema] [Em Um Benefício]
          - Como […] e Também […]
          - Como [Fazer Algo] Que os Seus [Pessoas Importantes para o seu Cliente] Irão Amar
          - Como Usar […] Para […]
          - Como […] em [Ano]
          - Como […] – O Guia Definitivo
          - Como Ser Esperto Num Mundo de [Grupo] [Ofensa (Ex.: incompetentes)]
        
        Listas – fáceis de digerir
          - X Maneiras Para Você [Fazer Algo]
          - X […] para [Evento/Causa/Processo]
          - X Recursos Incríveis Para [Audiência/Processo]
          - As X Melhores […]
          - X Segredos Sobre/Dos […] Que Todos [Seus Clientes] Deveriam Saber
          - X Razões Incomuns Para […]
          - X Erros Que a Maioria dos [Seu Cliente] Fazem [Em Alguma Situação – E Como Evitá-los]
          - As X Leis Do/Para […]
          - X Passos Para […]
          - Fique/Consiga/Seja […]! X Ideias que Realmente Funcionam
          - X Fatos Que os Seus [Audiência] Precisa Que Você Diga a Elas
          - X Fatos Que Você Precisa Saber Para [RESULTADO / BENEFÍCIO / EVENTO] (Espere Até Você Descobrir o #12!)
      </modelos>
    `,
    ],

    [
      "human",
      `Eu gostaria que você observasse os fundamentos e gere um título 100% único e que respeite 65 caracteres. Utilize as listas de palavras de impacto e poder.
        Utilize a <keyword>{keyword}</keyword> no título.
        Vou te passar alguns exemplos de títulos criados pelos meus concorrêntes <exemplos>{examples}</exemplos> para você se inspirar e seguir a mesma linha de criação. 
        Evite frases genéricas e padrões comuns.
        Evite comentários explicativos, responda apenas com o título.
    `,
    ],
  ]);

  const chain = RunnableSequence.from([
    prompt,
    new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0.1,
      n: 1,
    }),
    new StringOutputParser(),
  ]);

  let transformExamples = "";
  const keyword = post?.keywords?.split(",")[0];
  if (examples) {
    transformExamples = examples.join(", ");
  } else {
    if (keyword) {
      const serpGoogle = await listGoogleSearch(keyword, post?.siteId!);
      transformExamples = serpGoogle.organic
        .map((item: any) => item.title)
        .join(", ");
    }
  }
  const response = await chain.invoke({
    examples: transformExamples,
    keyword,
  });

  return response.replaceAll('"', "");
};

export const generateDescription = async (
  postId: string,
  examples?: string[],
) => {
  const post = await prisma.post.findFirst({ where: { id: postId } });
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `Você é um especialista em SEO e quero que você crie o metadescription para um artigo, vou te passar o título para você desmembrar a descrição. 
      <fundamentos>
        Para criar uma metadescription perfeita você deverá: 
          - Ter no máximo 140 caracteres.
          - Use uma voz ativa.
          - Acrescente a keyword no ínicio da descrição.
          - Acrescente especificações técnicas.
          - Se possível, utilize as palavras-chave secundárias no texto.
          - O texto da meta descrição precisa ser natural, persuasivo e único

        Palavras de Impacto: Gratuito, Novo, Você, Dinheiro, Economizar, Fácil, Amor, Descoberta, Resultados, Saúde, Aprovado, Garantido, Como …, Agora, Anuncia, Apresenta, Chegou, Lançado, Recém Chegou, Importante, Progresso Importante, Sensacional, Incrível, Inesquecível, Revolucionário, Milagre, Mágica, Rápido, Oferta, Desejado, Desafio, Conselho Para, A Verdade Sobre, Comparar, Desconto, Última Chance.
        Palavras de Poder: Agora, Agora Mesmo, Absolutamente, Conselho, Alcançar, Automaticamente, Alerta, Apaixonada, Acreditar, Aprovado, Amor, Altamente, Benefício, Barbada, Bem Sucedido, Criativa, Colorido, Colossal, Completa, Competitiva, Confidencial, Conquistar, Comprovada, Coração, Como, Confiável, Considerável,
        Derrota, Demanda, Desejo, Descontos, Direto, Dominação, Diferenciado, Dinheiro, Digna, De Sucesso, De Repente, Definitivo, Desejado, Encantado, Excelente, Expert, Estranho, Emocionante, Explicação, Exclusivo, Enorme, Entregue, Escondida, Escasso, Famoso, Fortuna, Fácil, Facilmente, Forte, Força de Vontade, Grandeza, Garantia, Genuíno, Garantido, Hábil, Hoje, Hoje Mesmo,Instrutivo, Imediata, Imediatamente, Instantâneo, Informativo, Inspirador, Interessante, Incrível, Inesperado, Incomum, Incondicional, Ilimitado, Inigualável,
        Linda, Lançamento, Limitado, Luxo, Lucrativa, Livre, Magia, Mistério, Mais, Mágico, Melhor, Maior, Maior Que, Mesmo Que, Melhorada, Maravilhoso, Novo, Notável, Obsessão, Oferta Especial, Poderosa, Perspectiva, Promessa, Pioneiro, Popular, Prática, Proibido, Profissional, Participe, Pouco Comum,
        Qualquer Um, Qualidade, Rápido, Rapidamente, Raro, Revelando, Reduzido, Revolução, Revolucionária, Recompensa, Resultados, Recém-chegado, Robusto, Riqueza, Seguro, Segurança, Salvar, Segredo(s), Seguro, Sensação, Simples, Sensacional, Surpreendente, Sonho, Sempre, Saúde, Saudável, Super, Superior, Surpresa, Selvagem, Sim, Seu,
        Tech, Último, Único, Urgente, Útil, Valor, Valioso, Vitalício, Venda, Você.
      </fundamentos>
    `,
    ],

    [
      "human",
      `Eu gostaria que você observasse com atenção os fundamentos e gere uma descrição 100% único baseado no titulo: {title} e que respeite 140 caracteres. 
        Utilize as listas de palavras de impacto e poder.
        Utilize a <keyword>{keyword}</keyword> na descrição.
        Vou te passar alguns exemplos de descrição criados pelos meus concorrêntes <exemplos>{examples}</exemplos> para você se inspirar e seguir a mesma linha de criação. 
        Evite frases genéricas e padrões comuns.
        Evite comentários explicativos, responda apenas com a metadescription.
    `,
    ],
  ]);

  const chain = RunnableSequence.from([
    prompt,
    new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0.1,
      n: 1,
    }),
    new StringOutputParser(),
  ]);

  let transformExamples = "";
  const keyword = post?.keywords?.split(",")[0];
  if (examples) {
    transformExamples = examples.join(", ");
  } else {
    if (keyword) {
      const serpGoogle = await listGoogleSearch(keyword, post?.siteId!);
      transformExamples = serpGoogle.organic
        .filter((item: any) => !item.snippet.includes("...")) // Filtra os snippets que não contém "..."
        .map((item: any) => item.snippet)
        .join(", "); // Mapeia os snippets filtrados
    }
  }

  console.log(transformExamples);
  const response = await chain.invoke({
    title: post?.title,
    examples: transformExamples,
    keyword,
  });

  console.log(response);
  return response.replaceAll('"', "");
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

  const post = await prisma.post.findFirst({ where: { id: postId } });

  const openai = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
    n: 1,
  });
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const vectorStore = new MemoryVectorStore(embeddings);

  const documents = (await constructorText(postId, "docs")) as Document[];

  await vectorStore.addDocuments(documents);

  const outlines = post?.outlines?.split("\n") || [];
  let article = "";

  for (const outline of outlines) {
    const limitWord: number = Math.round(
      Math.min(post!.limitWords! / outlines.length, 400),
    ); // Limite de palavras por outline

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

    const retriever = vectorStore.asRetriever({
      searchType: "mmr",
      searchKwargs: {
        fetchK: 10,
      },
      k: 2,
    });

    const documentChain = await createStuffDocumentsChain({
      llm: openai,
      prompt,
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

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

export const generateIdeas = async () => {};

export const generateOutlines = async () => {};

export const generateContentProduct = async () => {
  return "";
};

const splitText = (text: string, maxLength: number) => {
  const parts = [];
  let currentPart = "";

  text.split(" ").forEach((word) => {
    if ((currentPart + word).length > maxLength) {
      parts.push(currentPart.trim());
      currentPart = "";
    }
    currentPart += `${word} `;
  });

  if (currentPart) {
    parts.push(currentPart.trim());
  }

  return parts;
};

const constructorText = async (
  postId: string,
  type: "docs" | "text" = "text",
  content?: string,
) => {
  let message: string = "";
  let text = "";
  if (content) {
    message = content;
  } else {
    const post = await prisma?.post.findFirst({
      where: { id: postId },
      include: {
        knowledges: true,
      },
    });

    if (post && post?.knowledges?.length > 0) {
      post.knowledges.map(async (knowledge: any, idx: number) => {
        if (knowledge.content) {
          text += knowledge.content + "\n";
        }
      });
      message = JSON.stringify(text);
    } else {
      message = JSON.stringify(post!.content);
    }
  }
  if (type === "docs") {
    return splitText(text, 500).map(
      (part, index) =>
        new Document({
          pageContent: part,
          metadata: { part: index + 1 },
        }),
    );
  }
  return message;
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
Sempre que possível, inclua paragrafo com story-telling que se encaixa naturalmente no artigo.
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
