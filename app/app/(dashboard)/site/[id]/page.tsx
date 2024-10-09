import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Building2, Cake, Heart, Link, MapPin } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = data.customDomain
    ? `https://${data.customDomain}`
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="relative flex flex-col">
        <div
          className={cn(
            "rounded-xl bg-stone-100 bg-cover bg-center bg-no-repeat sm:bg-none",
            `relative top-0 mx-auto flex min-h-48 w-full max-w-7xl flex-col items-center justify-between gap-6 lg:mx-0 lg:justify-between lg:px-0 lg:py-6`,
          )}
          style={{
            backgroundImage: `url("${data.image}")`,
          }}
        >
          <div className="absolute -bottom-32 flex w-full  items-end justify-start gap-6 sm:justify-start md:-bottom-28  md:ml-12">
            <div className="hidden sm:block">
              <Avatar className="h-32 w-32 rounded-full border-4 border-stone-200 dark:border-white">
                <AvatarImage
                  src={String(data.logo!)}
                  className="bg-stone-50 object-contain p-2"
                />
                <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
              </Avatar>
            </div>

            <div className="flex flex-col  items-start space-x-0 space-y-2 ">
              <div className="flex items-center gap-3">
                <h1 className="font-title text-xl font-bold sm:text-3xl dark:text-white">
                  {data.name}
                </h1>
                <div className="flex ">
                  <Image
                    src={`https://flag.vercel.app/m/${"BR"}.svg`}
                    alt={String("Brasil")}
                    width={24}
                    height={16}
                  />
                </div>
              </div>

              <span className="line-clamp-1 text-xs text-stone-700">
                {data.description}
              </span>
              <a
                href={`https://${url}`}
                target="_blank"
                rel="noreferrer"
                className="truncate rounded-md bg-stone-200 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
              >
                {url} ↗
              </a>
            </div>
          </div>
        </div>
        <div className="mt-36 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-xl shadow-gray-200">
            <h2 className="font-title text-xl">Branding</h2>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-col gap-2">
                <h3 className="font-title text-sm">Site</h3>
                <span className="text-sm text-gray-700">
                  {data.customDomain}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-title text-sm">Proposta única de valor</h3>
                <span className="text-sm text-gray-700">
                  {data.description}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-title text-sm">Paleta de cores</h3>
                <div className="flex gap-3 py-3">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="h-12 w-12 rounded-full border-2 border-stone-200 bg-stone-100"></span>
                    <span className="font-title text-xs text-gray-800">
                      #fbfffd
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="h-12 w-12 rounded-full border-2 border-stone-200 bg-indigo-300"></span>
                    <span className="font-title text-xs text-gray-800">
                      #fbfffd
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="h-12 w-12 rounded-full border-2 border-stone-200 bg-indigo-600"></span>
                    <span className="font-title text-xs text-gray-800">
                      #fbfffd
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="h-12 w-12 rounded-full border-2 border-stone-200 bg-indigo-900"></span>
                    <span className="font-title text-xs text-gray-800">
                      #fbfffd
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-title text-sm">Layout da home</h3>
                <div className="flex w-full gap-6 ">
                  <div className="flex w-full max-w-24 flex-col items-center justify-center gap-2 ">
                    <div className="flex w-full flex-col items-center justify-center gap-1 rounded border p-2">
                      <div className="h-4 w-4 rounded-full bg-gray-200" />
                      <div className="h-3 w-full bg-gray-200" />
                      <div className="h-3 w-full bg-gray-200" />
                      <div className="h-3 w-full bg-gray-200" />
                      <div className="h-3 w-full bg-gray-200" />
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-700">link na bio</span>
                  </div>

                  <div className="flex w-full max-w-32 flex-col items-center justify-center gap-2 rounded-lg border border-black p-2">
                    <div className="flex w-full flex-col items-start justify-start gap-1 rounded border p-2">
                      <div className="flex w-full items-center justify-between gap-3">
                        <div className="h-2 w-3  bg-gray-200" />
                        <div className="h-2 w-full bg-gray-200" />
                      </div>
                      <div className="flex w-full items-center justify-between gap-1">
                        <div className="h-5 w-full bg-gray-200" />
                        <div className="h-5 w-full bg-gray-200" />
                      </div>
                      <div className="grid w-full grid-cols-3 items-center justify-between gap-1">
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                        <div className="h-3 w-full bg-gray-200" />
                      </div>

                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-700">blog</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-xl shadow-gray-200">
            <h2 className="font-title text-xl">Mercado</h2>
            <div className="flex flex-col gap-2">
              <h3 className="font-title text-sm">Nicho</h3>
              <span className="text-sm text-gray-700">
                Empreendedores digitais
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-title text-sm">Personas</h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage
                    src={
                      "https://media.licdn.com/dms/image/D4D03AQHaWsLKK9chwg/profile-displayphoto-shrink_800_800/0/1668880023875?e=2147483647&v=beta&t=pmDjD2t7YZyjawQTu3shyKiuXezNKB9je2041hs3Uo8"
                    }
                    className="rounded-full bg-stone-50 object-contain p-2"
                  />
                  <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
                </Avatar>
                <div>
                  <h1 className="font-title">Daniel Couto</h1>
                  <p className="text-xs text-gray-700">
                    Olá! Eu sou o Daniel Couto, um entusiasta do
                    empreendedorismo, sempre à procura da próxima grande ideia.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 py-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-black p-2 text-white">
                    <Cake size={16} color="white" />
                  </div>
                  <span>
                    <strong>Idade</strong>: 25 anos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-black p-2 text-white">
                    <MapPin size={16} color="white" />
                  </div>
                  <span>
                    <strong>Nascido em</strong>: São Paulo
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-black p-2 text-white">
                    <Heart size={16} color="white" />
                  </div>
                  <span>
                    <strong>Estado civíl</strong>: Solteiro
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-black p-2 text-white">
                    <Building2 size={16} color="white" />
                  </div>
                  <span>
                    <strong>Profissão</strong>: Empreendedor de pequeno negócio
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-sm text-gray-700">
                <span>Personalidade</span>
                <span>Dores</span>
                <span>Objetivos</span>
              </div>
              <div className="flex flex-col text-sm text-gray-700">
                <span>Marcas</span>
                <span>Redes sociais</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:gap-6">
          <div className="flex w-full flex-col rounded-2xl bg-white p-3 shadow-xl shadow-gray-200 md:p-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-title text-xl">Redes sociais</h2>
                <div className="flex h-5 w-5 gap-1.5">
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=instagram.com`}
                    alt={"Instagram"}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=twitter.com`}
                    alt={"Twitter"}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=tiktok.com`}
                    alt={"TikTok"}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=linkedin.com`}
                    alt={"Linkedin"}
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <p className="text-gray-700">
                Redes sociais, calendário de postagens semestrais
              </p>

              <div className="grid grid-cols-1 gap-2 py-6 md:grid-cols-2 md:gap-6">
                <div className="gap-2 rounded-xl border p-6 md:gap-6">
                  <div className="flex gap-3 pb-4">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=instagram.com`}
                      alt={"Instagram"}
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm font-bold">Instagram</h3>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-6">
                    <div className="flex gap-2 md:gap-6">
                      <Avatar className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 md:h-20 md:w-20">
                        <AvatarImage
                          src={String(data.logo!)}
                          className="rounded-full bg-stone-50 object-contain p-2"
                        />
                        <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-light text-gray-900">
                          @bookfy
                        </h3>
                        <h4 className="font-title text-sm text-gray-800">
                          {data.name}
                        </h4>
                        <p className="w-full text-sm text-gray-700 md:max-w-[340px]">
                          🚀 Transformo suas redes sociais em uma máquina de
                          atrair clientes 📊 Gestora de tráfego 📲 Especialista
                          em negócios e marketing 👇 Fale comigo
                        </p>
                        <span className="flex gap-1 text-sm text-indigo-900 underline">
                          <Link size={14} /> bookfy.com.br/link/awsfd4fs
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center justify-center">
                        <Avatar className="h-16 w-16 rounded-full bg-stone-100 p-0.5">
                          <AvatarImage
                            src={""}
                            className="rounded-full bg-stone-50 object-contain p-2"
                          />
                          <AvatarFallback className="from bg-gradient-to-tr from-indigo-500 to-indigo-800 font-semibold text-stone-700" />
                        </Avatar>
                        <span className="font-title text-xs">Insights</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Avatar className="h-16 w-16 rounded-full bg-stone-100 p-0.5">
                          <AvatarImage
                            src={""}
                            className="rounded-full bg-stone-50 object-contain p-2"
                          />
                          <AvatarFallback className="from bg-gradient-to-tr from-indigo-500 to-indigo-800 font-semibold text-stone-700" />
                        </Avatar>
                        <span className="font-title text-xs">Resumos</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Avatar className="h-16 w-16 rounded-full bg-stone-100 p-0.5">
                          <AvatarImage
                            src={""}
                            className="rounded-full bg-stone-50 object-contain p-2"
                          />
                          <AvatarFallback className="from bg-gradient-to-tr from-indigo-500 to-indigo-800 font-semibold text-stone-700" />
                        </Avatar>
                        <span className="font-title text-xs">Descontos</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-6 rounded-xl border p-6">
                  <div className="flex gap-3 pb-4">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=twitter.com`}
                      alt={"Twitter"}
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm font-bold">Twitter</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div
                      className={cn(
                        "rounded-xl bg-stone-100 bg-cover bg-center bg-no-repeat sm:bg-none",
                        `relative top-0 mx-auto flex min-h-28 w-full max-w-7xl flex-col items-center justify-between gap-6 lg:mx-0 lg:justify-between lg:px-0 lg:py-6`,
                      )}
                      style={{
                        backgroundImage: `url("${data.image}")`,
                      }}
                    ></div>
                    <Avatar className="absolute ml-3 mt-16 h-20 w-20 rounded-full bg-white p-0.5">
                      <AvatarImage
                        src={String(data.logo!)}
                        className="rounded-full bg-stone-50 object-contain p-2"
                      />
                      <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
                    </Avatar>
                    <div className="ml-3 mt-3 flex flex-col">
                      <h4 className="font-title text-sm text-gray-800">
                        {data.name}
                      </h4>
                      <h3 className="text-sm font-light text-gray-900">
                        @bookfy
                      </h3>
                      <p className="text-sm font-light text-gray-700">
                        🚀 Transformo suas redes sociais em uma máquina de
                        atrair clientes 📊 Gestora de tráfego 📲 Especialista em
                        negócios e marketing 👇 Fale comigo
                      </p>
                      <span className="flex items-center gap-1 text-sm text-indigo-900 underline">
                        <Link size={14} /> bookfy.com.br/link/awsfd4fs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gap-6 rounded-xl border p-6">
                  <div className="flex gap-3 pb-4">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=tiktok.com`}
                      alt={"TikTok"}
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm font-bold">TikTok</h3>
                  </div>
                  <div className="flex gap-6">
                    <Avatar className="h-20 w-20 rounded-full ">
                      <AvatarImage
                        src={String(data.logo!)}
                        className="rounded-full bg-stone-50 object-contain p-2"
                      />
                      <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="font-title text-lg  text-gray-800">
                        @bookfy
                      </h3>
                      <h4 className="font-light text-gray-900">{data.name}</h4>
                      <button
                        disabled
                        className="rounded bg-rose-500 py-1 text-white"
                      >
                        Seguir
                      </button>
                    </div>
                  </div>
                  <div className="py-3">
                    <p className="max-w-[340px] text-sm text-gray-700">
                      🚀 Transformo suas redes sociais em uma máquina de atrair
                      clientes 📊 Gestora de tráfego 📲 Especialista em negócios
                      e marketing 👇 Fale comigo
                    </p>
                    <span className="flex gap-1 text-sm text-indigo-900 underline">
                      <Link size={14} /> bookfy.com.br/link/awsfd4fs
                    </span>
                  </div>
                </div>

                <div className="gap-6 rounded-xl border p-6">
                  <div className="flex gap-3 pb-4">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=linkedin.com`}
                      alt={"Linkedin"}
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm font-bold">Linkedin</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div
                      className={cn(
                        "rounded-xl bg-stone-100 bg-cover bg-center bg-no-repeat sm:bg-none",
                        `relative top-0 mx-auto flex min-h-28 w-full max-w-7xl flex-col items-center justify-between gap-6 lg:mx-0 lg:justify-between lg:px-0 lg:py-6`,
                      )}
                      style={{
                        backgroundImage: `url("${data.image}")`,
                      }}
                    ></div>
                    <div className="absolute ml-3 mt-16 h-20 w-20 bg-white p-1">
                      <Image
                        src={String(data.logo!)}
                        className="h-full w-full bg-stone-100 object-contain p-2"
                        width={200}
                        height={200}
                        alt="logo"
                      />
                    </div>
                    <div className="ml-3 mt-3 flex flex-col">
                      <h4 className="font-title text-sm text-gray-800">
                        {data.name}
                      </h4>
                      <p className="text-sm font-light text-gray-700">
                        Transformo suas redes sociais em uma máquina de atrair
                        clientes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type calendarSocial = {
  public?: boolean;
  title: string;
  channel: "instagram" | "facebook" | "linkedin" | "tiktok" | "twitter";
  type: "short" | "middle" | "long";
  goal:
    | "engagement"
    | "traffic"
    | "brand"
    | "nutrition"
    | "conversion"
    | "lead";
  scheduleAt: Date;
};

const calendarSocial: calendarSocial[] = [
  {
    channel: "instagram",
    title: "Como colocar link da bio",
    type: "short",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    channel: "instagram",
    title: "8 conselhos para trabalhar de casa",
    type: "middle",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    channel: "twitter",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "traffic",
    scheduleAt: new Date(),
  },
  {
    channel: "tiktok",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "conversion",
    scheduleAt: new Date(),
  },
  {
    channel: "linkedin",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "brand",
    scheduleAt: new Date(),
  },
  {
    channel: "instagram",
    title: "Meu primeiro post no blog",
    type: "long",
    goal: "nutrition",
    scheduleAt: new Date(),
  },
  {
    channel: "twitter",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "lead",
    scheduleAt: new Date(),
  },
];

const calendarPrivate: calendarSocial[] = [
  {
    public: false,
    channel: "instagram",
    title: "Como colocar link da bio",
    type: "short",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "instagram",
    title: "8 conselhos para trabalhar de casa",
    type: "middle",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "twitter",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "traffic",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "tiktok",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "conversion",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "linkedin",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "brand",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "instagram",
    title: "Meu primeiro post no blog",
    type: "long",
    goal: "nutrition",
    scheduleAt: new Date(),
  },
  {
    public: false,
    channel: "twitter",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "lead",
    scheduleAt: new Date(),
  },
];

const calendarPublic: calendarSocial[] = [
  {
    public: true,
    channel: "instagram",
    title: "Como colocar link da bio",
    type: "short",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "instagram",
    title: "8 conselhos para trabalhar de casa",
    type: "middle",
    goal: "engagement",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "twitter",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "traffic",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "tiktok",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "conversion",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "linkedin",
    title: "Meu primeiro post no blog",
    type: "middle",
    goal: "brand",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "instagram",
    title: "Meu primeiro post no blog",
    type: "long",
    goal: "nutrition",
    scheduleAt: new Date(),
  },
  {
    public: true,
    channel: "twitter",
    title: "8 conselhos para trabalhar de casa",
    type: "long",
    goal: "lead",
    scheduleAt: new Date(),
  },
];
