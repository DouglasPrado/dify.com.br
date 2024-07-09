import LoadingDots from "@/components/icons/loading-dots";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Calendar, User } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { PostsTable } from "@/components/table/posts-table";
import { QueuesTable } from "@/components/table/queues-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
export default async function LaunchPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.launch.findFirst({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
      queues: true,
    },
  });

  if (!data) {
    notFound();
  }

  const taskComplete = data.queues.filter(
    (queue) => queue.status === "complete" && queue.type !== "post",
  );
  const taskScheduled = data.queues.filter(
    (queue) => queue.status === "complete" && queue.type !== "post",
  );
  const postComplete = data.queues.filter(
    (queue) => queue.status === "complete" && queue.type === "post",
  );

  const nextPost = data.queues.filter(
    (queue) => queue.status === "waiting" && queue.type === "post",
  );

  const queueProcessing = data.queues.filter(
    (queue) => queue.status === "processing",
  );

  return (
    <div className="w-full flex-col p-6">
      <div className="w-full ">
        <h2 className="font-title text-xl">Analise do agendamento.</h2>
        <p className="font-light text-gray-800">
          Crie um nome para sua campanha para distribuir os conteúdos
        </p>
      </div>
      <div className="flex gap-6 py-6">
        <div className="bg-card text-card-foreground w-full rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight text-gray-600">
              Total de postagens
            </h3>
            {queueProcessing.length > 0 && <LoadingDots />}
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              <span className="text-emerald-500">
                {postComplete.length} concluído
              </span>
            </div>
            <p className="text-muted-foreground text-xs text-gray-600">
              {data.quantity} postagens
            </p>
          </div>
        </div>
        <div className="bg-card text-card-foreground w-full rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight text-gray-600">
              Tarefas
            </h3>
            {queueProcessing.length > 0 && <LoadingDots />}
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {taskComplete.length} tarefas executadas
            </div>
            <p className="text-muted-foreground text-xs text-gray-600">
              {taskScheduled.length} tarefas agendadas
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground w-full rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight text-gray-600">
              Proxima postagem
            </h3>
            <Calendar size={16} color="gray" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {nextPost[0]
                ? format(nextPost[0].scheduleAt || new Date(), "dd 'de' MMMM", {
                    locale: ptBR,
                  })
                : "Postagens finalizadas."}
            </div>
            <p className="text-muted-foreground line-clamp-2 text-xs text-gray-600">
              {nextPost[0] && nextPost[0]?.description}
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground w-full rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight text-gray-600">
              Visitas
            </h3>
            <User size={16} color="gray" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">0</div>
            <p className="text-muted-foreground text-xs text-gray-600">+0.0%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
        <div className="bg-card text-card-foreground w-full rounded-xl border px-3 shadow">
          <h1 className="px-3 py-6 font-title text-lg text-stone-800">
            Conteúdo criado
          </h1>
          <ScrollArea className="h-96 w-full pb-6">
            <PostsTable data={data.queues} />
          </ScrollArea>
        </div>
        <div className="bg-card text-card-foreground w-full rounded-xl border px-3 shadow">
          <h1 className="px-3 py-6 font-title text-lg text-stone-800">
            Processamento de tarefas
          </h1>
          <ScrollArea className="h-96 w-full pb-6">
            <QueuesTable data={data.queues} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
