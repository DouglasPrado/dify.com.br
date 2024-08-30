"use server";
import prisma from "@/lib/prisma";
import { type_serp } from "@prisma/client";
import { prepareURL } from "./utils";
const isProduction = process.env.NODE_ENV === "production";
export type SerpProduct = {
  title: string;
  source: string;
  link: string;
  price: string;
  delivery: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  offers: string;
  productId: string;
  position: number;
};
export const getGoogleShopping = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "shopping", siteId });
};

export const listGoogleSearch = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "search", siteId });
};

export const getGoogleSuggestion = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "suggestions", siteId });
};

export const getGoogleImages = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "images", siteId });
};

export const getGoogleNews = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "news", siteId });
};

export const getGoogleVideos = async (query: string, siteId: string) => {
  return await getSerper({ query, type: "videos", siteId });
};

async function getSerper({
  query,
  type,
  siteId,
}: {
  query: string;
  type: type_serp;
  siteId: string;
}) {
  const prepareQuery = prepareURL(query);
  const serp = await prisma.serp.findFirst({
    where: {
      keyword: prepareQuery,
      type,
    },
  });
  return serp
    ? serp.content
    : isProduction
    ? await fetch(
        `https://google.serper.dev/${
          type !== "suggestions" ? type : "autocomplete"
        }`,
        {
          method: "POST",
          headers: {
            "X-API-KEY": process.env.SERPER_TOKEN as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: query,
            location: "Brazil",
            gl: "br",
            hl: "pt-br",
          }),
          redirect: "follow",
        },
      )
        .then((response) => response.text())
        .then(async (result) => {
          const response = JSON.parse(result);
          await prisma.serp.create({
            data: {
              keyword: prepareQuery,
              content: response,
              type,
              siteId,
            },
          });
          return response;
        })
    : type === "search"
    ? GOOGLE_SEARCH
    : type === "shopping"
    ? GOOGLE_SHOPPING
    : type === "images"
    ? GOOGLE_IMAGES
    : type === "news"
    ? GOOGLE_NEWS
    : type === "suggestions"
    ? GOOGLE_SUGGESTIONS
    : {};
}

const GOOGLE_SHOPPING = {
  shopping: [
    {
      title:
        "Mini Vídeo Portátil 400 Game Jogos Sup Retrô Clássicos ,Para crianças lcd colorido",
      source: "Shopee",
      link: "https://shopee.com.br/product/648811123/19099181915?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMjB3bkI0Vm5JWjJQc2RYVzVEUmp4SXB2dTRPdC9wQkw5R1Z6R21EM0tlaDNpcVNaSlFsZHpZdXZhbTNlSG5ac1poTFRhczdmcVFydW1pSVZtL1J6bHlyYlFseDEvbmdxZU5xeEtZbXlMbGZ3PT0&srsltid=AfmBOorOj0151FL4qWpDUd8MtoSQvErOG_kf8QjtFbNbUV0Da8HGhSAXPbk",
      price: "R$ 23,88",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRSb-PXPf_9_l53_QQpiimtQqOxBLGH2gZb7_6tU0XYgYraIqnWj_m7Fkpz6r2fJNXkzHM80QIeMnvxwVJ2r7Ao0gHHUd02AV83d9pjxzZWM0tvJZOg-Q&usqp=CAE",
      rating: 4.5,
      ratingCount: 92,
      position: 1,
    },
    {
      title:
        "Mini Vídeo Game Sup Portátil Retrô Com Mais De 400 Jogos na Memória-Marblue",
      source: "Amazon.com.br - Seller",
      link: "https://www.amazon.com.br/v%C3%ADdeo-Port%C3%A1til-Retr%C3%B4-Jogos-Mem%C3%B3ria-Marblue/dp/B0CHCJPRXD?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AQI7ZHPLXNKTA",
      price: "R$ 32,30",
      delivery: "+ taxa de envio de R$ 9,72",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQkguzxoEbhtLmBO5fgd40kLkd2ejyBKV9pFxYY7qUnYrd0vIluMwP-uzXN33syd335-r_w6QDTrBKY-s5uURR24eY-82PfLKq70-p9VsLMPceBVcmZQg&usqp=CAE",
      position: 2,
    },
    {
      title:
        "Mini 400 Game Nintendo Vídeo Portátil Jogos Sup Retrô Clássicos Antigos Anos 80",
      source: "Shopee",
      link: "https://shopee.com.br/product/362859393/9716372815?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWVp3RFo3Mkw5czd4Z0hzdEF1WVFibGE3akUxQ1M5YllOWW1FUmlDQnJQSHVhbVYveGJ3Z09TOEo0MmtKZHQvRGlUQnJ5dDV6Ky9pZmhTQTJKcjdKV05rYmliemtROEdKUWtMZTV3WEVMQTE&srsltid=AfmBOoqavkyloIUTLJ2UCAc3z0z3bxArJAGuz5QAEV9UHWhk82erg_1kstQ",
      price: "R$ 23,88",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQmU21H-bW2-4_WYeyI5nRWi6cKMcvLLUufv5HMiaylnOeTCPjL7j2D6C-qJmSkBbb6BUPq_6_piSZvV7K3iG_UVdbqmUo9QdA-iWfshG2YmiXqvpdbWY&usqp=CAE",
      rating: 4,
      ratingCount: 9.155,
      position: 3,
    },
    {
      title: "Sup Mini Game Retrô Com Adaptador Para Tv 400 In 1",
      source: "Mercado Livre",
      link: "https://produto.mercadolivre.com.br/MLB-3795206291-sup-mini-game-retr-com-adaptador-para-tv-400-in-1-_JM?matt_tool=18956390&utm_source=google_shopping&utm_medium=organic",
      price: "R$ 59,90",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvlOJBwIWWFlRqrf7Fwr8sx0fMRrr9YBylVJvDOx0znV0VpXPzZ5tYEy3hFq-fWEOA4RMLts72WTzy4YJnDBA0r50oY6YimDB8WuhUVQix3-DyBFOgCLE&usqp=CAE",
      position: 4,
    },
    {
      title:
        "Mini 400 Game Nintendo Vídeo Portátil Jogos Sup Retrô Clássicos Antigos Anos 80 com Controle Para 2 Pessoas",
      source: "Shopee",
      link: "https://shopee.com.br/product/362859393/7573525552?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWVp3RFo3Mkw5czd4Z0hzdEF1WVFibGE3akUxQ1M5YllOWW1FUmlDQnJQSExieDQ5T2NKRERxWnNZZlVsSXlxcm1ubDdMSjhVWUVjckR1RU4yN1FjVkNLUGdUK08vN3l0MTNzdkNmRHB5eVM&srsltid=AfmBOoolttWxSeQUksDoOnNgTvFR9EEfQaVthkXkrl4FaQg5_NcBPgdoVm8",
      price: "R$ 27,88",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJZN5HQzB5VZO-nQRMxlCli7TUvlk-2Uf7OcWXbCgsulXCWqmQFjWudOuRQOaiDX2fCwxINu48ZNkyJPodH7e8IUviWH7dkP9-RLE034LBGVBa56eXyw&usqp=CAE",
      rating: 4,
      ratingCount: 5.95,
      position: 5,
    },
    {
      title:
        "Mini Video Game Sup Game Box 400 Jogos Em 1 Portátil Jogos Antigos",
      source: "Shopee",
      link: "https://shopee.com.br/product/1057319077/23892557092?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWHlFU0hvQlZFVENpb1FnT09uNDlDSVovcnV5d2t4RjhUVkM3RFlRUXE4MXRKNERFTXVPSGs5dnVFNndlSXh3T2JObGJCdERwY1RxQ05aT2pidjdvdlpZTHBRalJPa3psbzdKbTdqSzRwUmR5YUhCaVpGL0QxMnJuQkgwREtFVTBBPT0&srsltid=AfmBOoqkaFdr0R2rSeUUEn1VLa020buThXsxYaXZLKKIrHkiKY0UoZGU0w8",
      price: "R$ 27,88",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR9IrYRFSwUR6ay2HoL75gsfLsUtWLxtu7uuD5neBoGOCiJCOTru-KvZ9BfsO5bQT5VIC9wBiTbZEw_DLnpncawopk_wJNqjzA70agjwk7Jt6r-lZCelNo&usqp=CAE",
      rating: 4.5,
      ratingCount: 2.353,
      position: 6,
    },
    {
      title: "Mini Vídeo Game Retrô Portátil Sup, 400 Jogos, Amarelo",
      source: "KaBuM!",
      link: "https://www.kabum.com.br/produto/580149/mini-video-game-retro-portatil-sup-400-jogos-amarelo?srsltid=AfmBOooXP7FICvzJ3I4xiZ7Jp9cVt0aF_NuCcByxqEKy-FuHE6WitohcRwM",
      price: "R$ 28,57/mês",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAWajslB7znqHAxQCwD_aTbkCc-DOOy1WqIF5Ohs3d_rCjsS8QaTeHLI7HDOSERh3lYB93K2G-BRdn_lmOOLXfHM3h8QdDhBEf60sbh9LW7_Ic53VKEGQ&usqp=CAE",
      rating: 4.5,
      ratingCount: 44,
      offers: "2",
      productId: "6898474928431460180",
      position: 7,
    },
    {
      title: "Sup Game Portátil Com Controle 400 Jogos Super Console Vermelho",
      source: "Amazon.com.br - Seller",
      link: "https://www.amazon.com.br/Port%C3%A1til-Retro-Console-Jogos-Controle/dp/B09JTXHK5L?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A32UZ0ZU4PQEZR",
      price: "R$ 84,90",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRcotePM7BKLp5ef9cJteQpbChEpjsKoOdMcHLA3nw5L8YIIiHmOnGLoShMkweIizqqjyjbpOx4R5mkugtt4tnoZnZ_Z1GXFyhLNZZHOGYwqeI43MjUbg&usqp=CAE",
      position: 8,
    },
    {
      title:
        "Vídeo Game Boy Portátil 400 Jogos Internos Mini Game Sup Retrô Clássicos",
      source: "Shopee",
      link: "https://shopee.com.br/product/768659092/19777113968?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMFRraG15bURRSVBwL1pUbjRnY0FRaStGNDVCQ2tIaVBqbUZKODdVV3lsSVdIMm85Q2tBaElUK21LbFJDVkdQWEJ1MFlrWUpEQk81STVXWnJtRlhZNWVhMTVRRlRFcWoxSG9FZDZFQ0FmTU5nPT0&srsltid=AfmBOopuGpsmbNvu70j-s7DToci1r_Laptj8jsnvRo4s7PZb4ifkPnwaGQ8",
      price: "R$ 39,99",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSe5Dor-dXf4hcEdUEn6Dalb976ZWbXv2QlLISstxYSqTfFm4GFfEU6jGfsIeWH0hCZjK6PgAsWq2NEAi73Lv3hib0iIEVGIm_7iQPBOP8dl7rDGapXIhY&usqp=CAE",
      rating: 4.5,
      ratingCount: 378,
      position: 9,
    },
    {
      title: "Sup Game Portátil Com Controle 400 Jogos Super Console",
      source: "Casas Bahia",
      link: "https://www.casasbahia.com.br/mini-game-portatil-sup-game-box-plus-400-jogos-com-controle-1568323211/p/1568323211?utm_medium=Cpc&utm_source=google_freelisting&IdSku=1568323211&idLojista=205413&tipoLojista=3P&srsltid=AfmBOooj0B6C7p6bieZecdWRaV4Ej-1xCC6qYpYHdjvcM0jMsrWPpslVwfY",
      price: "R$ 102,83",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSd3uNC37zx0LOfSpKtSUeWjynHm8fgZF-ywt3183nSFU9Sbs8FFrl3E-Io3MTjrLgfgfRXUmXDNhA7S5qIqpOQildOY9fK8GsCFG8kzoOT6WDrhJJ0ors&usqp=CAE",
      rating: 4.5,
      ratingCount: 27,
      offers: "5",
      productId: "6168870525547660608",
      position: 10,
    },
    {
      title: "Game Sup 400 jogos em 1",
      source: "Arcaderama Games",
      link: "https://www.arcaderamagames.com.br/game-sup-400-jogos-em-1?srsltid=AfmBOoqLzZ_J1K8-v8_KgOluJ7yLbUvCf-JcjOLWu_hyTFNfgkwE61zsX40",
      price: "R$ 65,00",
      delivery: "+ taxa de envio de R$ 10,00",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTVvw7Ozn8LoWgSGBH8pZtA6Cp_IOxMj3p7gykLptyBmay-p5teRC2svAY3ULVxpgsaBlCyv7iCkQaaWnLyEGUSnTLok25Mw5NE4Y5HDMyPu2_l7FNSlQ&usqp=CAE",
      rating: 4,
      ratingCount: 9.155,
      position: 11,
    },
    {
      title:
        "Mini Vídeo Game Portátil Sup 2 900 Jogos + Cartão Sd Com os jogos",
      source: "Shopee",
      link: "https://shopee.com.br/product/312026437/17429688470?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMld5NWFteWNRa3kxeEJrT0JWb3Y1ME1VSk1LWVQ5VmFySVNNUktWZEJIdy9VNTBjSlFVRVlPUGlTRmZRM0w3OWw3TFRTWUxXRGJtZGVpUkNuNFlsdDJVRjRLYW1qVXFCazlwY3NDam5LRU13PT0&srsltid=AfmBOopOmB44bvs2N16kxM1yn8vlbEMqbgy-9RabWfHVn9pr_2aE1Bng0iY",
      price: "R$ 134,90",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTV68BvThfFWWakZfUStjKIV_Ib0c1z4tRu3U8eLGR04GpcFdt-4FjWyW9klc8C3P6hnyz3-SIqHaUyDEaGJpaMWHp2ObABVey6vhJejQ63cCQxeM598A&usqp=CAE",
      rating: 4.5,
      ratingCount: 16,
      position: 12,
    },
    {
      title: "Sup Game Retrô 400 Em 1 Adaptador Para Tv",
      source: "Mercado Livre",
      link: "https://produto.mercadolivre.com.br/MLB-3784185881-sup-game-retr-400-em-1-adaptador-para-tv-_JM?matt_tool=18956390&utm_source=google_shopping&utm_medium=organic",
      price: "R$ 21,33/mês",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTGFx7JTZYslSAaTFrP1WxU2bPGzQwowST3kuRX3NocpkszT5o_MFdiyd08XK4XAG5eCeJAIEHGBaclaAUodfSupbmM5_jGW5YaCrc8t39dH4nin7U2A30&usqp=CAE",
      position: 13,
    },
    {
      title: "Mini Game Portátil 400 Jogos Super Console Controle Retro",
      source: "Carrefour",
      link: "https://www.carrefour.com.br/mini-game-portatil-400-jogos-super-console-controle-retro-mp937533595/p",
      price: "R$ 55,90",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTQFkw_bF0hFiKeRtZNVhHJpXusglmJ_8DSdR938CLnDLCGBt22UWhCoASWlYPE6Zqc8VrHXU4RKLso8ML2RhTq0AOh2Q86JCJyNwfEpm0eNwOidL5OUg&usqp=CAE",
      offers: "2",
      productId: "6257716905459613951",
      position: 14,
    },
    {
      title:
        "Mini Game Portátil 400 Jogos Sup Retrô Clássicos Para crianças LCD Colorido",
      source: "Amazon.com.br - Seller",
      link: "https://www.amazon.com.br/Port%C3%A1til-Jogos-Cl%C3%A1ssicos-crian%C3%A7as-Colorido/dp/B0CQD71FY8?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2QH3N8T92LTT3",
      price: "R$ 69,00",
      delivery: "+ taxa de envio de R$ 8,56",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8N83aRpoCk98ZEAs74Vmp1BqArNjxzaZ5nfu6wASc30pdFpubjL7jjmd-oKhJiNs9XjtWiPT1ZTYgTLC8s44wts1G1DEfrpzqKxOm&usqp=CAE",
      position: 15,
    },
    {
      title: "Videogame Portatil Sup Game Box Power M3, Preto",
      source: "KaBuM!",
      link: "https://www.kabum.com.br/produto/452218/videogame-portatil-sup-game-box-power-m3-preto?srsltid=AfmBOoqnZM0d1tug0JZK4EC7eAg9mDIZ_VIasfVV7gY24-amPlb6qwdxxwI",
      price: "R$ 35,99/mês",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR5TElEsVKiPbvMnV49Mmbv9BSS_R_CtTKi-6IboCmGfL3jx4ss2bd5cmkxmj921VNwixc7vLk2hVGnlO2gq-RpSn6lQFmkV3llsN6VtVR8ELyH_5OW920&usqp=CAE",
      rating: 4,
      ratingCount: 6,
      position: 16,
    },
    {
      title:
        "Vídeo Game Portátil 400 Jogos Internos Mini Game Sup Red 2 Player Com Controle",
      source: "Shopee",
      link: "https://shopee.com.br/product/407952755/23519102935?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBM3VuY3hReUpVQi8xOHh2dkFRMjJEbmN6VzBja2J5T3I5U0dJUEZqZ0lWelA2NmZPMEkyNXlxdUgzSjRTeXE5S0VUU3R6ZGo0bSt3MXNxRVl2Y1NiN0h0akpUMnl4bnhzVFdJOTQ5UERCMUV3PT0&srsltid=AfmBOopsq2ShW6qArhcGZe0_MxU2xTLsFQzEC7jSfRBKUWLI6wAOg88WOfs",
      price: "R$ 39,99",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQd3vkbn3LLeoVCtTQh-Gwukt5sEjKeM_68UO9JOsfD6uPen__qPQtdSqZtI794WQHIgtWfxKPyOYuG_HeCV2Rsk1WLKc8oR_3SQVe4MgXZ42IeM34_lA&usqp=CAE",
      rating: 4.5,
      ratingCount: 180,
      position: 17,
    },
    {
      title:
        "Vídeo Game Mini Portátil Sup 400 Jogos Retro Clássico Ligue Tv + Controle Bateria Recarregável Atari",
      source: "Original Baby",
      link: "https://originalbaby.com.br/products/mini-game-portatil?currency=BRL&variant=47156927660351&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=a567dc5e1946",
      price: "R$ 249,90",
      delivery: "Frete grátis",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTjH9AKjLBUOWFqZbqDyDgiiLUNrOXJzSFDfM581MeUSc_7b0eQbIp3HpTHaQXyTmwn508sUFFnpwTF58TC0q9PRutkLAjnXGtWakMevLgQXVrfVL988A&usqp=CAE",
      offers: "2",
      productId: "9836097044011973438",
      position: 18,
    },
    {
      title: "Console Sup Megagame Portátil (400 Jogos)",
      source: "Elite Games",
      link: "https://www.lojaselitegames.com.br/produto/console-sup-megagame-portatil-400-jogos.html?utm_source=Site&utm_medium=GoogleShopping&utm_campaign=IntegracaoGoogle",
      price: "R$ 8,10/mês",
      delivery: "+ taxa de envio de R$ 50,00",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAL-PLUUep0x_6up9-ZRDVkpO3viQ0LFK6WfHbWd65HmwvD5IgFWF-gLssjYJAZJn3Gw4fX0OdzPDb8-wb7_f8s_W6bXqqY-r_Xjn45fNAjO0aEPyxuQ&usqp=CAE",
      position: 19,
    },
    {
      title: "Mini Video Game Portátil - SUP com 400 jogos - Game Azul",
      source: "Idm distribuições",
      link: "https://www.idmdistribuicoes.com.br/eletronicos/mini-video-game-portatil-sup-com-400-jogos?variant_id=12171&parceiro=2665&srsltid=AfmBOoph-Ihuj_ciPlFG3VpTUQqIGDYjYu9mcxs5Ly1M47PFBRUJKoo4yAA",
      price: "R$ 38,25",
      delivery: "",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQtakyizdlLc_apuqtf9N0gU71eFpCYdqXQ3wuB1qMg052SU1cYyjG06BioKc_67ZB4udmnxXeK3t5KHChddQeSD4K22s_WrtpyRrNXaHz2LrALcEm8pw&usqp=CAE",
      position: 20,
    },
  ],
  credits: 2,
};
const GOOGLE_SEARCH = {
  organic: [
    {
      title: "8 melhores consoles portáteis para comprar no Brasil em 2024",
      link: "https://www.techtudo.com.br/listas/2024/05/8-melhores-consoles-portateis-para-comprar-no-brasil-em-2024-edjogos.ghtml",
      snippet:
        "8 melhores consoles portáteis para comprar no Brasil em 2024 · 1. Steam Deck · 2. ROG Ally · 3. Lenovo Legion Go · 4. MSI Claw · 5. Ayaneo 2 · 6 ...",
      date: "17 de mai. de 2024",
      position: 1,
    },
    {
      title:
        "Guia completo: veja os melhores consoles portáteis para comprar ...",
      link: "https://www.tecmundo.com.br/voxel/281052-guia-completo-veja-melhores-consoles-portateis-comprar-2024.htm",
      snippet:
        "1. O melhor — AYN ODIN 2. Disponível apenas no site oficial de sua fabricante, o AYN ODIN 2 domina o mercado! Equipado com um Snapdragon 8 Gen 2 ...",
      date: "18 de mar. de 2024",
      position: 2,
    },
    {
      title: "Melhor console portátil para comprar | Guia do TudoCelular",
      link: "https://www.tudocelular.com/jogos/noticias/n145292/guia-comprar-melhor-console-videogame-portatil.html",
      snippet:
        "Nintendo Switch Lite — O melhor portátil da atualidade ; Nintendo Switch — Híbrido para levar para qualquer lugar ; Nintendo Switch OLED — Tela ...",
      date: "11 de set. de 2023",
      position: 3,
    },
    {
      title: "Os Melhores 5 Consoles Portáteis - Mercado Livre",
      link: "https://www.mercadolivre.com.br/blog/melhores-consoles-portateis",
      snippet:
        "Top 5 Consoles com os Melhores Gráficos · Por que os Gráficos Importam? · Steam Deck · Nintendo DSi · PlayStation Vita · New Nintendo 3DS XL · Nintendo Switch.",
      position: 4,
    },
    {
      title: "TOP 10 MELHORES CONSOLES PORTÁTEIS DE 2024 ! - YouTube",
      link: "https://www.youtube.com/watch?v=huSxNyPXA-w",
      snippet:
        "Qual o melhor console portátil barato de 2024? Essa é uma pergunta que recebo ...",
      date: "20 de jan. de 2024",
      attributes: {
        Duração: "16:20",
        "Data da postagem": "20 de jan. de 2024",
      },
      imageUrl:
        "https://i.ytimg.com/vi/huSxNyPXA-w/default.jpg?sqp=-oaymwEECHgQQw&rs=AMzJL3lNwkGkUBu14uPx4jPssIB1pjS16A",
      position: 5,
    },
    {
      title: "Os 7 MELHORES consoles portáteis da atualidade! - PSBlog",
      link: "https://psblog.com.br/os-7-melhores-consoles-portateis-da-atualidade/",
      snippet:
        "Os 7 MELHORES consoles portáteis da atualidade! · 1 Steam Deck · 2 Nintendo Switch · 3 ASUS ROG Ally · 4 Retroid Pocket 4 Pro · 5 AYN Odin 2 · 6 ...",
      date: "15 de mai. de 2024",
      position: 6,
    },
    {
      title: "Melhores Videogames Portáteis em 2024 (Nintendo Switch e mais)",
      link: "https://br.my-best.com/20263",
      snippet:
        "Top 10 Melhores Videogames Portáteis ; 1. NINTENDO. Nintendo Switch Lite｜HBHSBAZA1 ; 2. SUP. Mini Game Sup 400 Jogos ; 3. NINTENDO. Nintendo Switch Joy-Con｜ ...",
      position: 7,
    },
    {
      title: "Top 5 MELHORES Consoles Portáteis de Jogos em (2024) - YouTube",
      link: "https://www.youtube.com/watch?v=_kIsvfy4aIM",
      snippet:
        "Links para os melhores Consoles Portáteis de Jogos 2024 que listamos neste vídeo: ➜ 5 ...",
      date: "20 de mar. de 2024",
      attributes: {
        Duração: "12:09",
        "Data da postagem": "20 de mar. de 2024",
      },
      imageUrl:
        "https://i.ytimg.com/vi/_kIsvfy4aIM/default.jpg?sqp=-oaymwEECHgQQw&rs=AMzJL3k-4xckL5ucYZM10hGdldUQHyzv2w",
      position: 8,
    },
    {
      title: "Os 10 melhores consoles portáteis de jogos de 2023",
      link: "https://www.blogdodispositivo.com.br/os-10-melhores-consoles-portateis-de-jogos-de-2023/",
      snippet:
        "Os 10 melhores consoles portáteis de jogos de 2023 · 1. BTSEURY RG503 · 2. BTSEURY RG353P · 3. RGB10MAX2 · 4. Nintendo Switch OLED · 5.",
      date: "9 de mai. de 2023",
      position: 9,
    },
    {
      title: "Qual console portátil vale mais a pena comprar em 2023?",
      link: "https://olhardigital.com.br/2023/08/30/games-e-consoles/qual-console-portatil-vale-mais-a-pena-comprar-em-2023/",
      snippet:
        "Lista de consoles portáteis · Steam Deck · Nintendo Switch Lite · Nintendo Switch OLED · ROG Ally · New Nintendo 3DS XL.",
      date: "30 de ago. de 2023",
      sitelinks: [
        {
          title: "Steam Deck",
          link: "https://olhardigital.com.br/2023/08/30/games-e-consoles/qual-console-portatil-vale-mais-a-pena-comprar-em-2023/#h-steam-deck",
        },
        {
          title: "Nintendo Switch Lite",
          link: "https://olhardigital.com.br/2023/08/30/games-e-consoles/qual-console-portatil-vale-mais-a-pena-comprar-em-2023/#h-nintendo-switch-lite",
        },
        {
          title: "Nintendo Switch OLED",
          link: "https://olhardigital.com.br/2023/08/30/games-e-consoles/qual-console-portatil-vale-mais-a-pena-comprar-em-2023/#h-nintendo-switch-oled",
        },
      ],
      position: 10,
    },
  ],
  peopleAlsoAsk: [
    {
      question: "Quais são os melhores consoles portáteis?",
      snippet:
        "8 MELHORES CONSOLES PORTÁTEIS PARA COMPRAR NO BRASIL EM 2024\nSteam Deck. ...\nROG Ally. ...\nLenovo Legion Go. ...\nMSI Claw. ...\nAyaneo 2. ...\nONEXPlayer 2 Pro. ...\nNintendo Switch OLED. ...\nAnalogue Pocket.",
      title: "8 melhores consoles portáteis para comprar no Brasil em 2024",
      link: "https://www.techtudo.com.br/listas/2024/05/8-melhores-consoles-portateis-para-comprar-no-brasil-em-2024-edjogos.ghtml",
    },
    {
      question: "Qual console portátil comprar em 2024?",
      snippet:
        "Se você valoriza jogos exclusivos e versatilidade, o Nintendo Switch é uma excelente escolha. Para aqueles que procuram desempenho robusto e uma vasta biblioteca de jogos de PC, o Steam Deck e o ROG Ally são opções superiores. Para fãs de jogos retrô, o Analogue Pocket é a melhor escolha.",
      title:
        "Qual console portátil vale mais a pena comprar em 2024? - Olhar Digital",
      link: "https://olhardigital.com.br/2024/07/17/games-e-consoles/qual-console-portatil-vale-mais-a-pena-comprar-em-2024/",
    },
    {
      question: "Qual o melhor console para se comprar atualmente?",
      snippet:
        "MELHOR CONSOLE MODERNO PARA COMPRAR | GUIA DO TUDOCELULAR\nMicrosoft Xbox Series X: o mais poderoso da nova geração.\nSony PlayStation 5: versão com disco.\nSony PlayStation 5 Digital Edition: versão mais barata do PS5.\nMicrosoft Xbox One X: o mais poderoso da geração anterior.",
      title: "Melhor console moderno para comprar | Guia do TudoCelular",
      link: "https://www.tudocelular.com/windows-phone/noticias/n145262/guia-comprar-melhor-console-2019.html",
    },
    {
      question: "Qual é o console portátil mais poderoso do mundo?",
      snippet:
        "1 Scorpio Engine. Com 6 teraflops, 326 GB/s de largura de banda de memória e advanced, custom silicon, o Scorpio Engine é o processador de jogos de console mais poderoso já criado.",
      title: "O console mais poderoso do mundo - netshop informatica",
      link: "https://netshopinformatica.com.br/postagem/o-console-mais-poderoso-do-mundo/37",
    },
  ],
  relatedSearches: [
    {
      query: "Melhores videogames portáteis baratos",
    },
    {
      query: "Consoles portáteis baratos",
    },
    {
      query: "Melhor console portátil 2024",
    },
    {
      query: "Melhor console portátil emulador",
    },
    {
      query: "Consoles portáteis 2024",
    },
    {
      query: "Melhor console portátil retrô",
    },
    {
      query: "Lista de consoles portáteis",
    },
    {
      query: "Video game portátil PS4",
    },
  ],
  credits: 1,
};

const GOOGLE_IMAGES = {
  images: [
    {
      title:
        "Mini Game Portátil Sup Game Box Plus 400 Jogos Na Memoria Original",
      imageUrl:
        "https://down-br.img.susercontent.com/file/sg-11134201-7qvdc-lil4jzxv0lxp88",
      imageWidth: 1024,
      imageHeight: 1024,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQC_8wEG4kJgC8eSmI19RsFa6c3zXdICnS5_IB87C0hU325vf&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "Shopee",
      domain: "shopee.com.br",
      link: "https://shopee.com.br/Mini-Game-Port%C3%A1til-Sup-Game-Box-Plus-400-Jogos-Na-Memoria-Original-i.326556609.15828417763",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdown-br.img.susercontent.com%2Ffile%2Fsg-11134201-7qvdc-lil4jzxv0lxp88&tbnid=AlMuOYRHaZfAuM&imgrefurl=https%3A%2F%2Fshopee.com.br%2FMini-Game-Port%25C3%25A1til-Sup-Game-Box-Plus-400-Jogos-Na-Memoria-Original-i.326556609.15828417763&docid=v5uv5AyptOipPM&w=1024&h=1024&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIAigA",
      position: 1,
    },
    {
      title:
        "Mini Game Box Retro Portátil 400 Jogos At001 Sup + Cabo Av - Pode Ligar a TV",
      imageUrl:
        "https://m.media-amazon.com/images/I/51LkZLKpVTL._AC_UF894,1000_QL80_.jpg",
      imageWidth: 894,
      imageHeight: 877,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAOXKANNo15AIQ4HlwH7GFajPChIdjhIN2ba_BQGXd0MH8Cyg&s",
      thumbnailWidth: 227,
      thumbnailHeight: 222,
      source: "Amazon",
      domain: "www.amazon.com.br",
      link: "https://www.amazon.com.br/Mini-Retro-Port%C3%A1til-Jogos-At001/dp/B08C9XLQQL",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51LkZLKpVTL._AC_UF894%2C1000_QL80_.jpg&tbnid=9SCHTXlp163dqM&imgrefurl=https%3A%2F%2Fwww.amazon.com.br%2FMini-Retro-Port%25C3%25A1til-Jogos-At001%2Fdp%2FB08C9XLQQL&docid=e4kVjsboQaboSM&w=894&h=877&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIAygB",
      position: 2,
    },
    {
      title: "Mini Game Portátil Sup Game Box Plus com 400 Jogos - Utimix ...",
      imageUrl:
        "https://www.utimix.com/wp-content/uploads/2020/11/mini-game-portatil-sup-game-box-plus-com-400-jogos-3.png",
      imageWidth: 1000,
      imageHeight: 1000,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJaQQFMnOGFaeKxZITJIY_NxAH4s7yPm419qb8i1h75pMIWtY&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "Utimix",
      domain: "www.utimix.com",
      link: "https://www.utimix.com/produto/mini-game-portatil-sup-game-box-plus-com-400-jogos/",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.utimix.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fmini-game-portatil-sup-game-box-plus-com-400-jogos-3.png&tbnid=9egAH2I9B1uRkM&imgrefurl=https%3A%2F%2Fwww.utimix.com%2Fproduto%2Fmini-game-portatil-sup-game-box-plus-com-400-jogos%2F&docid=dmbDhsVS6faYRM&w=1000&h=1000&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIBCgC",
      position: 3,
    },
    {
      title: "Mini Game Portátil SUP 400 jogos com Controle",
      imageUrl:
        "https://m.media-amazon.com/images/I/51i41MeWLOL._AC_UF1000,1000_QL80_.jpg",
      imageWidth: 731,
      imageHeight: 1000,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRCr9I14N5mUbOpw8XlsUeOwYdKS6xyEbpIb-hRelOtPllxE&s",
      thumbnailWidth: 192,
      thumbnailHeight: 263,
      source: "Amazon",
      domain: "www.amazon.com.br",
      link: "https://www.amazon.com.br/Mini-Port%C3%A1til-SUP-jogos-Controle/dp/B0887Y8BXT",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51i41MeWLOL._AC_UF1000%2C1000_QL80_.jpg&tbnid=s8MY4s6eUF404M&imgrefurl=https%3A%2F%2Fwww.amazon.com.br%2FMini-Port%25C3%25A1til-SUP-jogos-Controle%2Fdp%2FB0887Y8BXT&docid=cdngGBKkuOA6hM&w=731&h=1000&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIBSgD",
      position: 4,
    },
    {
      title: "Mini Game Portátil Sup Game Box Plus 400 Jogos com Controle ...",
      imageUrl:
        "https://www.utimix.com/wp-content/uploads/2020/11/mini-game-portatil-sup-game-box-plus-400-jogos-com-controle.jpg",
      imageWidth: 1024,
      imageHeight: 1024,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ak4r7gfC7c0NmGBII8tjwtRy-_K4A4MYg6RdmIVAuoCoRihy&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "Utimix",
      domain: "www.utimix.com",
      link: "https://www.utimix.com/produto/mini-game-portatil-sup-game-box-plus-400-jogos-com-controle/",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.utimix.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fmini-game-portatil-sup-game-box-plus-400-jogos-com-controle.jpg&tbnid=oYXcftW-KmCDJM&imgrefurl=https%3A%2F%2Fwww.utimix.com%2Fproduto%2Fmini-game-portatil-sup-game-box-plus-400-jogos-com-controle%2F&docid=a8zaI-DoyaeZoM&w=1024&h=1024&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIBigE",
      position: 5,
    },
    {
      title:
        "Mini Sup Game Portátil 400 Jogos Clássico Super Console Retro ...",
      imageUrl:
        "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls35hiypqvppee",
      imageWidth: 1024,
      imageHeight: 1024,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY01z7X6d5Y811BT1aUrXXZBeb_gHYgF4zWzwD68nXc69CRFU&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "Shopee",
      domain: "shopee.com.br",
      link: "https://shopee.com.br/Mini-Sup-Game-Port%C3%A1til-400-Jogos-Cl%C3%A1ssico-Super-Console-Retro-i.1037374332.23492860593",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdown-br.img.susercontent.com%2Ffile%2Fbr-11134207-7r98o-ls35hiypqvppee&tbnid=Fbw8gEBlTHMkKM&imgrefurl=https%3A%2F%2Fshopee.com.br%2FMini-Sup-Game-Port%25C3%25A1til-400-Jogos-Cl%25C3%25A1ssico-Super-Console-Retro-i.1037374332.23492860593&docid=Fh-BSoxXp0e9RM&w=1024&h=1024&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcIBygF",
      position: 6,
    },
    {
      title: "Mini Game Portátil Sup Game Box Plus - 400 Jogos",
      imageUrl:
        "https://mycase.com.br/images/thumbs/0026573_mini_game_portatil_sup_game_box_plus_400_jogos.jpg",
      imageWidth: 1000,
      imageHeight: 1000,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1fVRX-aBxMHs5lDCUsOpMmJrrc8MtU1JdFXeF5kKxevqsNDo&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "Mycase - Mycase",
      domain: "mycase.com.br",
      link: "https://mycase.com.br/mini-game-portatil-sup-game-box-plus-400-jogos",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmycase.com.br%2Fimages%2Fthumbs%2F0026573_mini_game_portatil_sup_game_box_plus_400_jogos.jpg&tbnid=bXtaZy5CDgIWXM&imgrefurl=https%3A%2F%2Fmycase.com.br%2Fmini-game-portatil-sup-game-box-plus-400-jogos&docid=1eJO-tXq2uiVGM&w=1000&h=1000&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcICCgG",
      position: 7,
    },
    {
      title:
        "Mini Game Boy Portátil Sup Gme Box 400in1 Tela 3 Pol. - Azul Royal",
      imageUrl:
        "https://www.cbacessorios.com.br/media/catalog/product/cache/1/image/a4e40ebdc3e371adff845072e1c73f37/1/9/1948058026_1.jpg",
      imageWidth: 800,
      imageHeight: 800,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn3b3CEdRkmcyYD4NaFS9m4ySLtnI_DeuwNoH9x8EQiv04C5E&s",
      thumbnailWidth: 225,
      thumbnailHeight: 225,
      source: "CB Acessórios",
      domain: "www.cbacessorios.com.br",
      link: "https://www.cbacessorios.com.br/mini-game-boy-portatil-sup-gme-box-400in1-tela-3-pol-azul-royal",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.cbacessorios.com.br%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fimage%2Fa4e40ebdc3e371adff845072e1c73f37%2F1%2F9%2F1948058026_1.jpg&tbnid=8-1pJ0txH4DPOM&imgrefurl=https%3A%2F%2Fwww.cbacessorios.com.br%2Fmini-game-boy-portatil-sup-gme-box-400in1-tela-3-pol-azul-royal&docid=VvGglBH7ZXSD6M&w=800&h=800&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcICSgH",
      position: 8,
    },
    {
      title:
        "Mini Sup Game Box + Controle Extra - 2 Jogadores - 400 Jogos - Acessórios  com o melhor preço é na Coimbra Virtual",
      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/673889/mini_game_box_controle_extra_2_jogadores_400_jogos_1331_1_20191219173357.jpg",
      imageWidth: 529,
      imageHeight: 480,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-i8PsvQjQ9z80Vwq6tRABi4NQOIlo3CI0gxY2YS12_R1zy_C&s",
      thumbnailWidth: 236,
      thumbnailHeight: 214,
      source: "Coimbra Virtual",
      domain: "www.coimbravirtual.com.br",
      link: "https://www.coimbravirtual.com.br/games/acessorios/mini-game-box-controle-extra-2-jogadores-400-jogos",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F673889%2Fmini_game_box_controle_extra_2_jogadores_400_jogos_1331_1_20191219173357.jpg&tbnid=_5ZLpd9WTasnzM&imgrefurl=https%3A%2F%2Fwww.coimbravirtual.com.br%2Fgames%2Facessorios%2Fmini-game-box-controle-extra-2-jogadores-400-jogos&docid=tc_b8s_vxpVmRM&w=529&h=480&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcICigI",
      position: 9,
    },
    {
      title: "Mini Vídeo Game Sup Retro Clássico 400 Jogos Com Controle ...",
      imageUrl:
        "https://cdn.awsli.com.br/600x450/1781/1781384/produto/94644752/e4f1cae3af.jpg",
      imageWidth: 458,
      imageHeight: 450,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2TxZYdrvDz6uZdWotRU2db5kdKqUC3Sr6vcaARSkx4Di4KsG3&s",
      thumbnailWidth: 226,
      thumbnailHeight: 223,
      source: "ARCADERAMA GAMES",
      domain: "www.arcaderamagames.com.br",
      link: "https://www.arcaderamagames.com.br/mini-video-game-sup-retro-classico-400-jogos-com-controle",
      googleUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.awsli.com.br%2F600x450%2F1781%2F1781384%2Fproduto%2F94644752%2Fe4f1cae3af.jpg&tbnid=YYPeQO4nGNFINM&imgrefurl=https%3A%2F%2Fwww.arcaderamagames.com.br%2Fmini-video-game-sup-retro-classico-400-jogos-com-controle&docid=GlYAW9KsYeSoRM&w=458&h=450&ved=0ahUKEwjPhp2s9ZmIAxVLE1kFHeGZMkgQvFcICygJ",
      position: 10,
    },
  ],
  credits: 1,
};

const GOOGLE_NEWS = {
  searchParameters: {
    q: "apple inc",
    gl: "br",
    hl: "pt-br",
    type: "news",
    location: "Brazil",
    engine: "google",
  },
  news: [
    {
      title: "Apple redefine prioridades e corta empregos em serviços digitais",
      link: "https://valor.globo.com/empresas/noticia/2024/08/28/apple-redefine-prioridades-e-corta-empregos-em-servicos-digitais.ghtml",
      snippet:
        "Demissões incluíram algumas funções de engenharia, e os maiores cortes foram feitos na equipe responsável pelo aplicativo Apple Books e pela...",
      date: "há 16 horas",
      source: "Valor Econômico",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcwMgbxO3WiH369tsNJ-s2I_3tg3l1dBW6XJeHdur4hP08uzI-VQATrI6Njw&s",
      position: 1,
    },
    {
      title: "Apple anuncia vencedores do Apple Design Awards 2024",
      link: "https://www.apple.com/br/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/",
      snippet:
        "Hoje, a Apple revelou os vencedores da premiação anual Apple Design Awards, que celebra os 14 melhores apps e games.",
      date: "2 meses atrás",
      source: "Apple",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBWRt8gze9D0YNetB71v2gzltsNlYXx3W8L9B_82CIQjHjZXg8eCLqPxTxQ&s",
      position: 2,
    },
    {
      title:
        "A Apple supostamente demitiu 100 dessas equipes antes do lançamento do iPhone 16: aqui está o motivo",
      link: "https://perambranews.com/2024/08/28/a-apple-supostamente-demitiu-100-dessas-equipes-antes-do-lancamento-do-iphone-16-aqui-esta-o-motivo/",
      snippet:
        "A Apple Inc. tomou a rara medida de cortar cerca de 100 empregos em seu grupo de serviços, parte de uma mudança de prioridades para a...",
      date: "1 dia atrás",
      source: "PerambraNews -",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPusth91amU5xxyBMicYfDEcOSIAcgb7KRXB5ZTU48iJGOm9hxBbEdVCU2Vw&s",
      position: 3,
    },
    {
      title:
        "Apple vai adiar implementação de recursos de IA em novo sistema operacional",
      link: "https://www.infomoney.com.br/business/apple-vai-adiar-implementacao-de-recursos-de-ia-em-novo-sistema-operacional/",
      snippet:
        "Empresa planeja disponibilizar o Apple Intelligence para seus clientes por meio de atualizações de software a partir de outubro.",
      date: "1 mês atrás",
      source: "InfoMoney",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6szZjSfYFrivWs9vAGlSKMeCdZUL58qb5z9WWNwC2LAjAXYe6BCWooCHHMg&s",
      position: 4,
    },
    {
      title:
        "Por que só o iPhone 15 Pro terá a inteligência artificial da Apple?",
      link: "https://exame.com/inteligencia-artificial/por-que-so-o-iphone-15-pro-tera-inteligencia-artificial-da-apple/",
      snippet:
        "Com o lançamento do iOS 18, iPadOS 18 e macOS Sequoia, a Apple trará aos consumidores o recurso Apple Intelligence, uma nova experiência de...",
      date: "2 meses atrás",
      source: "Exame",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGR3UIyF7qViOIYd4GQjsMlPvxad_0bxjlXGsx9b1whlJostIp7klz-6ILw&s",
      position: 5,
    },
    {
      title: "Apple Maps: como apagar lugares favoritos e buscas recentes",
      link: "https://olhardigital.com.br/2024/05/08/dicas-e-tutoriais/apple-maps-como-apagar-lugares-favoritos-e-buscas-recentes/",
      snippet:
        "Quer realizar uma limpeza na sua conta do Apple Maps? Veja como excluir locais guardados como favoritos e suas buscas.",
      date: "3 meses atrás",
      source: "Olhar Digital",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmIgQzgJWIxkmoxzdsDqx4lKuQ8ybUsizU889yOLyVZKfi9_nZ1TzI8B1ydw&s",
      position: 6,
    },
    {
      title: "A oposição da Apple Inc ao registro de nomes de frutas",
      link: "https://br.lexlatin.com/opiniao/oposicao-da-apple-inc-ao-registro-de-nomes-de-frutas",
      snippet:
        "O Tribunal Geral da União Europeia afirmou em 2019 que, embora a Apple consiga demonstrar um maior grau de distintividade para produtos da...",
      date: "9 meses atrás",
      source: "LexLatin",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSn8UZ4ksbFEZul_FqLy0KOcWevEJhGqodZywqQVWBrVPooCyY7J8eWCG2Mg&s",
      position: 7,
    },
    {
      title:
        "Apple sem IA parece mais Coca-Cola do que tecnologia de alto crescimento",
      link: "https://www.infomoney.com.br/business/apple-sem-ia-parece-mais-coca-cola-do-que-tecnologia-de-alto-crescimento/",
      snippet:
        "Por duas décadas, nenhuma empresa incorporou melhor a promessa do mercado de ações do que a Apple Inc. Sua transformação de uma fabricante...",
      date: "5 meses atrás",
      source: "InfoMoney",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlAiNMA24yBvGe4Gj839gfUCDn8UkAqNhTje9Nyt99JIb1KhOXHARrFAQuQA&s",
      position: 8,
    },
    {
      title:
        "Departamento de Justiça dos EUA processa Apple por monopólio no setor de smartphones",
      link: "https://exame.com/tecnologia/departamento-de-justica-dos-eua-processa-apple-por-monopolio-no-setor-de-smartphones/",
      snippet:
        "A ação, movida no tribunal federal de Nova Jersey, alega que a Apple tem poder de monopólio no mercado de smartphones e usa seu controle...",
      date: "5 meses atrás",
      source: "Exame",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYvwnVdx3sLSBQ3bxyARD1U-nIv5Myea6dWVIr6XShJ9hbNFX0mnq43pp_g&s",
      position: 9,
    },
    {
      title:
        "Apple Targets Sept. 10 Debut for New iPhones, AirPods and Watches",
      link: "https://www.bloomberg.com/news/articles/2024-08-23/when-is-apple-announcing-the-iphone-16-apple-planning-event-on-sept-10-2024",
      snippet:
        "Update: Apple ultimately chose to schedule the event on Monday, Sept. 9. See the latest here. Apple Inc. is planning to hold its biggest...",
      date: "5 dias atrás",
      source: "Bloomberg",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVkTN5XVyEoOn4NZ5DarUq7M_P5UOh4FUUOu8AGE02CiOXd2QRiwdxOwzAw&s",
      position: 10,
    },
  ],
  credits: 1,
};

const GOOGLE_SUGGESTIONS = {
  searchParameters: {
    q: "apple inc",
    gl: "br",
    hl: "pt-br",
    type: "news",
    location: "Brazil",
    engine: "google",
  },
  news: [
    {
      title: "Apple redefine prioridades e corta empregos em serviços digitais",
      link: "https://valor.globo.com/empresas/noticia/2024/08/28/apple-redefine-prioridades-e-corta-empregos-em-servicos-digitais.ghtml",
      snippet:
        "Demissões incluíram algumas funções de engenharia, e os maiores cortes foram feitos na equipe responsável pelo aplicativo Apple Books e pela...",
      date: "há 16 horas",
      source: "Valor Econômico",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcwMgbxO3WiH369tsNJ-s2I_3tg3l1dBW6XJeHdur4hP08uzI-VQATrI6Njw&s",
      position: 1,
    },
    {
      title: "Apple anuncia vencedores do Apple Design Awards 2024",
      link: "https://www.apple.com/br/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/",
      snippet:
        "Hoje, a Apple revelou os vencedores da premiação anual Apple Design Awards, que celebra os 14 melhores apps e games.",
      date: "2 meses atrás",
      source: "Apple",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBWRt8gze9D0YNetB71v2gzltsNlYXx3W8L9B_82CIQjHjZXg8eCLqPxTxQ&s",
      position: 2,
    },
    {
      title:
        "A Apple supostamente demitiu 100 dessas equipes antes do lançamento do iPhone 16: aqui está o motivo",
      link: "https://perambranews.com/2024/08/28/a-apple-supostamente-demitiu-100-dessas-equipes-antes-do-lancamento-do-iphone-16-aqui-esta-o-motivo/",
      snippet:
        "A Apple Inc. tomou a rara medida de cortar cerca de 100 empregos em seu grupo de serviços, parte de uma mudança de prioridades para a...",
      date: "1 dia atrás",
      source: "PerambraNews -",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPusth91amU5xxyBMicYfDEcOSIAcgb7KRXB5ZTU48iJGOm9hxBbEdVCU2Vw&s",
      position: 3,
    },
    {
      title:
        "Apple vai adiar implementação de recursos de IA em novo sistema operacional",
      link: "https://www.infomoney.com.br/business/apple-vai-adiar-implementacao-de-recursos-de-ia-em-novo-sistema-operacional/",
      snippet:
        "Empresa planeja disponibilizar o Apple Intelligence para seus clientes por meio de atualizações de software a partir de outubro.",
      date: "1 mês atrás",
      source: "InfoMoney",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6szZjSfYFrivWs9vAGlSKMeCdZUL58qb5z9WWNwC2LAjAXYe6BCWooCHHMg&s",
      position: 4,
    },
    {
      title:
        "Por que só o iPhone 15 Pro terá a inteligência artificial da Apple?",
      link: "https://exame.com/inteligencia-artificial/por-que-so-o-iphone-15-pro-tera-inteligencia-artificial-da-apple/",
      snippet:
        "Com o lançamento do iOS 18, iPadOS 18 e macOS Sequoia, a Apple trará aos consumidores o recurso Apple Intelligence, uma nova experiência de...",
      date: "2 meses atrás",
      source: "Exame",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGR3UIyF7qViOIYd4GQjsMlPvxad_0bxjlXGsx9b1whlJostIp7klz-6ILw&s",
      position: 5,
    },
    {
      title: "Apple Maps: como apagar lugares favoritos e buscas recentes",
      link: "https://olhardigital.com.br/2024/05/08/dicas-e-tutoriais/apple-maps-como-apagar-lugares-favoritos-e-buscas-recentes/",
      snippet:
        "Quer realizar uma limpeza na sua conta do Apple Maps? Veja como excluir locais guardados como favoritos e suas buscas.",
      date: "3 meses atrás",
      source: "Olhar Digital",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmIgQzgJWIxkmoxzdsDqx4lKuQ8ybUsizU889yOLyVZKfi9_nZ1TzI8B1ydw&s",
      position: 6,
    },
    {
      title: "A oposição da Apple Inc ao registro de nomes de frutas",
      link: "https://br.lexlatin.com/opiniao/oposicao-da-apple-inc-ao-registro-de-nomes-de-frutas",
      snippet:
        "O Tribunal Geral da União Europeia afirmou em 2019 que, embora a Apple consiga demonstrar um maior grau de distintividade para produtos da...",
      date: "9 meses atrás",
      source: "LexLatin",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSn8UZ4ksbFEZul_FqLy0KOcWevEJhGqodZywqQVWBrVPooCyY7J8eWCG2Mg&s",
      position: 7,
    },
    {
      title:
        "Apple sem IA parece mais Coca-Cola do que tecnologia de alto crescimento",
      link: "https://www.infomoney.com.br/business/apple-sem-ia-parece-mais-coca-cola-do-que-tecnologia-de-alto-crescimento/",
      snippet:
        "Por duas décadas, nenhuma empresa incorporou melhor a promessa do mercado de ações do que a Apple Inc. Sua transformação de uma fabricante...",
      date: "5 meses atrás",
      source: "InfoMoney",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlAiNMA24yBvGe4Gj839gfUCDn8UkAqNhTje9Nyt99JIb1KhOXHARrFAQuQA&s",
      position: 8,
    },
    {
      title:
        "Departamento de Justiça dos EUA processa Apple por monopólio no setor de smartphones",
      link: "https://exame.com/tecnologia/departamento-de-justica-dos-eua-processa-apple-por-monopolio-no-setor-de-smartphones/",
      snippet:
        "A ação, movida no tribunal federal de Nova Jersey, alega que a Apple tem poder de monopólio no mercado de smartphones e usa seu controle...",
      date: "5 meses atrás",
      source: "Exame",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYvwnVdx3sLSBQ3bxyARD1U-nIv5Myea6dWVIr6XShJ9hbNFX0mnq43pp_g&s",
      position: 9,
    },
    {
      title:
        "Apple Targets Sept. 10 Debut for New iPhones, AirPods and Watches",
      link: "https://www.bloomberg.com/news/articles/2024-08-23/when-is-apple-announcing-the-iphone-16-apple-planning-event-on-sept-10-2024",
      snippet:
        "Update: Apple ultimately chose to schedule the event on Monday, Sept. 9. See the latest here. Apple Inc. is planning to hold its biggest...",
      date: "5 dias atrás",
      source: "Bloomberg",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVkTN5XVyEoOn4NZ5DarUq7M_P5UOh4FUUOu8AGE02CiOXd2QRiwdxOwzAw&s",
      position: 10,
    },
  ],
  credits: 1,
};
