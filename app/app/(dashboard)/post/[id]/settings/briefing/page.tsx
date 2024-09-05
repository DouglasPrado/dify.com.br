import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Steps from "./_components/steps";
export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-cal text-3xl font-bold dark:text-white">
            Configurações do conteúdo
          </h2>
          <h3 className="text-sm font-light text-stone-700">{data.title}</h3>
        </div>
        <Steps
          steps={[
            { index: "01", name: "Briefing", selected: true },
            { index: "02", name: "Template", selected: false },
            { index: "03", name: "Conhecimento", selected: false },
            { index: "04", name: "SEO", selected: false },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="font-cal text-stone-800">Escolha a palavra chave</h2>
          <div className="my-3 flex gap-3">
            <Input placeholder="Digite a palavra chave para iniciar seu conteúdo" />
            <Button>Adicionar palavra chave</Button>
          </div>
          <Carousel className="mx-12">
            <CarouselContent className="my-6 flex w-full gap-6 p-6">
              {SERP.organic.map((site: any, idx: number) => (
                <CarouselItem
                  className="w-full md:basis-1/2 lg:basis-1/3"
                  key={`key-site-${site}-${idx}`}
                >
                  <div className="flex w-full max-w-xl flex-col gap-3 rounded-xl border border-stone-200 bg-white p-6 shadow-lg shadow-gray-200">
                    <span className="w-[80px] rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-400">
                      posição: {idx + 1}
                    </span>
                    <h4 className="text-xs font-light text-stone-500">
                      https://www.kickstarter.com
                    </h4>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-cal text-sm text-stone-700">
                        {site.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-stone-500">{site.snippet}</p>
                    </div>
                    <span className="text-xs font-light text-stone-500">
                      795 palavras | 9 imagens | 0 vídeos
                    </span>
                    <div className="flex flex-col gap-2">
                      <h4>Headings</h4>
                      <div className="flex items-center gap-3 rounded border border-stone-200/70 bg-stone-100 px-2 py-3">
                        <span className="rounded bg-blue-500 p-0.5 px-1 text-xs text-white">
                          H1
                        </span>
                        <div className="line-clamp-2 text-xs font-light">
                          {site.title}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded border border-stone-200/70 bg-stone-100 px-2 py-3">
                        <span className="rounded bg-pink-500 p-0.5 px-1 text-xs text-white">
                          H2
                        </span>
                        <div className="line-clamp-2 text-xs font-light">
                          Custo x Benefício
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

const SERP = {
  slug: "abxylute",
  serpId: "0d91dccb-f0c9-4cf9-a096-9fc4ae97f9af",
  credits: 1,
  organic: [
    {
      link: "https://abxylute.com/?srsltid=AfmBOor50pgoGFuKKmalWm3NDjU18FFSV4v0MiAlvP3q6aj7OShN3Cvf",
      title: "abxylute: Streamline your gaming experience with ease.",
      snippet:
        "With affordable pricing and sturdy build, abxylute extends your gameplay seamlessly from remote play and cloud gaming. SHOP NOW ...",
      position: 1,
      sitelinks: [
        {
          link: "https://abxylute.com/products/abxylute-handheld-console",
          title: "Abxylute handheld [Cloud ...",
        },
        {
          link: "https://abxylute.com/products/abxylute-handheld-bundle",
          title: "Abxylute Handheld 64G Bundle",
        },
        {
          link: "https://abxylute.com/pages/abxylute-s9",
          title: "Abxylute S9 Mobile Controller",
        },
        {
          link: "https://abxylute.com/products/refurbished-abxylute-handheld-cloud-gaming-remote-play",
          title: "[Refurbished] abxylute handheld",
        },
        {
          link: "https://abxylute.com/products/abxylute-c6-wireless-gaming-controller",
          title: "[🔥New Arrival🔥] abxylute C6 ...",
        },
      ],
    },
    {
      link: "https://www.amazon.com/abxylute-streaming-Compatible-Playstation-Lightweight-Android/dp/B0CHLK67XJ",
      title:
        "Amazon.com: abxylute streaming handheld, 1080P 7-Inch Portable ...",
      rating: 3.8,
      snippet:
        "1080P 7-Inch Portable Gaming Console, Compatible with PC/Playstation/Xbox, Minimal Latency, Lightweight and Long Battery Life, Cloud Gaming, Remote Play (64G, ...",
      position: 2,
      ratingCount: 23,
    },
    {
      date: "May 19, 2024",
      link: "https://www.reddit.com/r/cloudygamer/comments/1cvp8e9/wich_should_i_buy_abxylute_vs_g_cloud/",
      title: "Wich should I buy? Abxylute vs G Cloud : r/cloudygamer - Reddit",
      snippet:
        "I could only find them in a store that sells the Abxylute at 280$ and the G cloud at 505$ (both with free shipping).",
      position: 3,
    },
    {
      date: "Dec 25, 2023",
      link: "https://www.youtube.com/watch?v=MoPeREuztR4",
      title: "The GOOD, the BAD, the WHY - abxylute review - YouTube",
      snippet:
        "The abxylute (called absolute) has been around for a few weeks now. After the highly publicized ...",
      imageUrl:
        "https://i.ytimg.com/vi/MoPeREuztR4/default.jpg?sqp=-oaymwEECHgQQw&rs=AMzJL3nFTfAgkVjNx9BxbbQgxmAS4K_wVQ",
      position: 4,
      attributes: { Posted: "Dec 25, 2023", Duration: "15:57" },
    },
    {
      date: "May 11, 2023",
      link: "https://www.androidpolice.com/abyxlute-console-review/",
      title:
        "Abxylute handheld review: Absolutely the best budget streaming ...",
      snippet:
        "Should you buy? At $229, The Abyxlute is the best value handheld console for streaming games, but that's not a particularly high bar to meet.",
      position: 5,
    },
    {
      date: "Mar 28, 2024",
      link: "https://www.kickstarter.com/projects/abxylute/abxylute-cloud-gaming-handheld-console",
      title: "abxylute: Top-notch streaming handheld with stunning display",
      snippet:
        'One-stop gaming | Remote Play | 7" 1080P Graphics | 8-hr Gameplay | Low latency | Built-in Launcher | Precise Controls.',
      position: 6,
    },
    {
      date: "Apr 16, 2024",
      link: "https://www.youtube.com/watch?v=EsaDLrKwoBI",
      title: "Abxylute Review | Had No idea It Could Be This Good - YouTube",
      snippet:
        "I had no idea streaming could be this good. Today I'm going to be taking a look at the Abxylute ...",
      imageUrl:
        "https://i.ytimg.com/vi/EsaDLrKwoBI/default.jpg?sqp=-oaymwEECHgQQw&rs=AMzJL3m4nette4hiXNXfKc3813EejZdxqA",
      position: 7,
      attributes: { Posted: "Apr 16, 2024", Duration: "6:36" },
    },
  ],
  peopleAlsoAsk: [
    {
      link: "https://abxylute.com/products/abxylute-handheld-console",
      title: "abxylute handheld [Cloud Gaming ＆ Remote Play]",
      snippet:
        "For the price is one the best gaming handhelds I came across. This things handles everything from gamepass, PS5 remote play, to even some great quality emulation. Definitely be looking forward to future models , and highly recommend getting this.... oh and the display is even better in person!!",
      question: "Is abxylute good?",
    },
    {
      link: "https://www.kogan.com/au/buy/abxylute-streaming-handheld-gaming-console-4gb-64gb-abxylute/",
      title:
        "Abxylute Streaming Handheld Gaming Console (4GB, 64GB) - Kogan.com",
      snippet:
        "Abxylute Streaming Handheld Gaming Console (4GB, 64GB) - Compatible with PC/PlayStation/Xbox.",
      question:
        "What is abxylute streaming handheld gaming console 4GB 64GB compatible with?",
    },
    {
      link: "https://wccftech.com/review/the-absolute-abxylute-review-the-new-cloud-handheld-soon-to-be-on-kickstarter/",
      title:
        "The Absolute Abxylute Review: The New Cloud Handheld Soon To Be ...",
      snippet:
        'The abxylute has a size of 10 inches, a height of 1.13 inches, and 4.63 in width. The screen bezel on the abxylute is 7.5 inches, with an actual screen size of 7" screen.',
      question: "How big is the Abxylute?",
    },
  ],
  relatedSearches: [
    { query: "Abxylute review" },
    { query: "Abxylute price" },
    { query: "Abxylute Amazon" },
    { query: "Abxylute Gaming Console" },
    { query: "Abxylute One" },
    { query: "Abxylute where to buy" },
    { query: "Abxylute vs G Cloud" },
    { query: "Abxylute Android" },
  ],
  searchParameters: {
    q: "ABXYlute",
    gl: '"br"',
    hl: '"pt-br"',
    type: "search",
    engine: "google",
    location: '"Brazil"',
  },
};
