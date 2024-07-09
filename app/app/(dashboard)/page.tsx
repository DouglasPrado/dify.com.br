import OverviewSitesCTA from "@/app/app/(dashboard)/site/[id]/_components/overview-sites-cta";
import Sites from "@/app/app/(dashboard)/site/[id]/_components/sites";
import PlaceholderCard from "@/components/global/placeholder-card";
import { ArrowUp, Calendar, CalendarCheck } from "lucide-react";
import { Suspense } from "react";
const ROADMAP_PLANNING = [
  {
    title: "Inscrições por whatsapp",
    description: "Permitir criar base de leads através do whatsapp",
    obs: "Descoberta de interesses",
    votes: 21,
    date: "07/04/2024",
  },
];
const ROADMAP_IN_PROGRESS = [
  {
    title: "Integração com Google Tag Manager",
    description:
      "Integrar google tag manager para utilização do Google analytics",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/05/2024",
  },
  {
    title: "Integração com Facebook Pixel",
    description: "Integrar pixel do facebook para campanhas na Meta",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/05/2024",
  },
];
const ROADMAP_DONE = [
  {
    title: "Aplicar link na raíz do domínio",
    description: "Permitir aplicar um link específico na raíz do domínio.",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/04/2024",
  },
  {
    title: "Personalizar cores",
    description: "Personalizar cores dos links",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/04/2024",
  },
  {
    title: "Duplicar link",
    description: "Facilitar o teste A/B de links permitindo copiar links.",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "09/04/2024",
  },
  {
    title: "Inscrições por e-mail",
    description: "Permitir criar base de leads através do e-mail",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/04/2024",
  },
  {
    title: "Botão para preview de links",
    description: "Permitir visualizar links antes de publicar.",
    obs: "Descoberta de interesses",
    votes: 11,
    date: "07/04/2024",
  },
];
export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-title text-3xl font-bold dark:text-slate-100">
            Príncipais projetos
          </h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>

      {false && (
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-start justify-between">
            <h1 className="font-title text-3xl font-bold dark:text-slate-100">
              Roadmap 2024
            </h1>
            <p className="text-sm font-light text-slate-500">
              Para que todos participem do desenvolvimento do projeto você pode
              votar em nosso roadmap para agilizar alguma funcionalidade nova ou
              até mesmo indicar uma nova funcionalidade.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="p-0">
              <div className="flex items-center justify-start gap-3">
                <div className="h-4 w-4 rounded bg-indigo-500" />
                <h2 className="font-title dark:text-slate-400">Planejado</h2>
              </div>
              <div className="flex flex-col gap-4 py-6">
                {ROADMAP_PLANNING.map((task) => (
                  <div
                    key={task.title}
                    className="rounded-xl border  p-4 shadow dark:border-slate-800 dark:bg-slate-900"
                  >
                    <h3 className="font-title text-sm dark:text-slate-400">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500">{task.description}</p>
                    <div className="flex items-center justify-between gap-1 pt-2">
                      <div className="flex items-center gap-1 ">
                        <Calendar width={16} className="dark:text-slate-600" />
                        <span className="text-sm text-slate-500 dark:text-slate-600">
                          Aguardando votação
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded border p-2 text-sm dark:border-slate-800">
                        <div className="flex items-center gap-1 dark:text-slate-400">
                          <span>votos</span>
                          <strong>{task.votes}</strong>
                          <ArrowUp width={12} className="dark:text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" rounded-xl p-0">
              <div className="flex items-center justify-start gap-3">
                <div className="h-4 w-4 rounded bg-orange-500" />
                <h2 className="font-title dark:text-slate-400">Em progresso</h2>
              </div>
              <div className="flex flex-col gap-4 py-6">
                {ROADMAP_IN_PROGRESS.map((task) => (
                  <div
                    key={task.title}
                    className="rounded-xl border  p-4 shadow dark:border-slate-800 dark:bg-slate-900"
                  >
                    <h3 className="font-title text-sm dark:text-slate-400">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500">{task.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-0">
              <div className="flex items-center justify-start gap-3">
                <div className="h-4 w-4 rounded bg-emerald-500" />
                <h2 className="font-title dark:text-slate-400">Concluído</h2>
              </div>
              <div className="flex flex-col gap-4 py-6">
                {ROADMAP_DONE.map((task) => (
                  <div
                    key={task.title}
                    className="rounded-xl border  p-4 shadow dark:border-slate-800 dark:bg-slate-900"
                  >
                    <h3 className="font-title text-sm dark:text-slate-400">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500">{task.description}</p>
                    <div className="flex items-center justify-between gap-1 pt-2">
                      <div className="flex items-center gap-1 ">
                        <CalendarCheck
                          width={16}
                          className="text-emerald-500"
                        />
                        <span className="text-sm text-slate-600">
                          {task.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
