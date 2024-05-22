import { CalendarForm } from "@/components/form/launch/calendar-form";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ScheduleSVG from "@/public/schedule.svg";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function LaunchNamePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.launch.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          logo: true,
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="h-screen w-full flex-col">
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* STEPS */}
        <section className="flex flex-col justify-center p-6 lg:py-12 lg:pl-12">
          <header className="flex items-center justify-between pb-6 lg:pt-3">
            <svg
              width="60"
              height="36"
              viewBox="0 0 120 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.836 41.84C2.10533 38.64 0.74 34.6933 0.74 30C0.74 25.3067 2.10533 21.36 4.836 18.16C7.56667 14.96 11.1293 13.36 15.524 13.36C19.3213 13.36 22.372 14.9813 24.676 18.224V3.888H33.252V46H24.676V41.84C22.372 45.04 19.3213 46.64 15.524 46.64C11.1293 46.64 7.56667 45.04 4.836 41.84ZM11.556 23.984C10.148 25.52 9.444 27.5253 9.444 30C9.444 32.4747 10.148 34.48 11.556 36.016C13.0067 37.552 14.8627 38.32 17.124 38.32C19.3427 38.32 21.156 37.552 22.564 36.016C23.972 34.48 24.676 32.4747 24.676 30C24.676 27.5253 23.972 25.52 22.564 23.984C21.156 22.448 19.3427 21.68 17.124 21.68C14.8627 21.68 13.0067 22.448 11.556 23.984ZM40.9025 46V14H49.4785V46H40.9025ZM40.1345 5.744C40.1345 4.336 40.6252 3.14133 41.6065 2.16C42.6305 1.136 43.8252 0.623997 45.1905 0.623997C46.5985 0.623997 47.7932 1.136 48.7745 2.16C49.7985 3.14133 50.3105 4.336 50.3105 5.744C50.3105 7.10933 49.7985 8.304 48.7745 9.328C47.7932 10.3093 46.5985 10.8 45.1905 10.8C43.8252 10.8 42.6305 10.3093 41.6065 9.328C40.6252 8.304 40.1345 7.10933 40.1345 5.744ZM58.855 46V20.912H53.863V14H58.919V11.824C58.919 10.2453 59.1537 8.816 59.623 7.536C60.135 6.256 60.7537 5.25333 61.479 4.528C62.2043 3.76 63.0363 3.14133 63.975 2.672C64.9137 2.16 65.7883 1.81867 66.599 1.648C67.4523 1.43467 68.2417 1.328 68.967 1.328C70.887 1.328 72.5723 1.54133 74.023 1.968C75.4737 2.39466 76.455 2.82133 76.967 3.248L77.735 3.888L74.471 9.776C72.8923 8.88 71.5697 8.432 70.503 8.432C68.4977 8.432 67.495 9.69067 67.495 12.208V14H75.431V20.912H67.431V46H58.855ZM84.5235 55.408V47.344C86.4008 47.344 87.8302 47.0027 88.8115 46.32C89.7928 45.68 90.5822 44.6987 91.1795 43.376L91.7555 42.16L78.5075 14H87.2755L93.7395 28.976L95.7235 34.096C96.6622 31.4507 97.3235 29.6373 97.7075 28.656L103.468 14H112.172L97.7715 47.344C95.4248 52.72 91.0088 55.408 84.5235 55.408Z"
                fill="black"
              />
            </svg>
            <div className="flex flex-col-reverse ">
              <span className="rounded-full border bg-stone-50 px-3 py-1 text-center text-xs font-semibold">
                Etapa 4 de 4
              </span>
            </div>
          </header>
          <div className="flex h-full flex-col justify-start gap-6">
            <div className="grid grid-cols-1 items-center justify-between lg:flex lg:flex-row">
              <div className="flex flex-col">
                <h1 className="font-cal text-2xl">
                  Escolha uma data legal e vamos concluir o agendamento
                </h1>
                <p className="flex">
                  Escolha uma data para iniciar o agendamento, informe a
                  quantidade de artigos criados e quantos dias de campanha será
                  realizado.
                </p>
              </div>
            </div>
            <CalendarForm data={data} />
          </div>
        </section>
        {/* FORMULARIO */}
        <section className="flex h-full flex-col items-center justify-center bg-stone-100 p-6">
          <h1 className="font-cal text-3xl">Agendamento de artigos</h1>
          <p className="text-center text-xl">
            Deixe seu site fazendo publicações de forma automática.
          </p>
          <Image src={ScheduleSVG} alt="" width="500" height="500" />
        </section>
      </div>
    </div>
  );
}
