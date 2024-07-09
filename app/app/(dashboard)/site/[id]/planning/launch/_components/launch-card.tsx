import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Launch } from "@prisma/client";
import { redirect } from "next/navigation";
import { LaunchMenu } from "../../../../../../../../components/menu/launch-menu";
export default async function LaunchCard({ data }: { data: Launch }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-6 rounded-lg border px-8 py-4 transition-all",
        "border-stone-100 bg-white shadow hover:cursor-pointer hover:shadow-lg dark:border-stone-700 dark:hover:border-white",
      )}
    >
      <div className="flex items-center justify-center gap-6">
        <span
          className={cn(
            data.status === "processing"
              ? `bg-green-500`
              : data.status === "play"
              ? `bg-blue-500`
              : `bg-yellow-500`,
            "h-3 w-3 rounded-full",
          )}
        />
        <div className="flex flex-col">
          <h1 className="font-title text-sm text-stone-700">
            {data.name || "(Sem Título)"}
          </h1>
          <p className="text-xs text-stone-400 ">
            {data.subject || "(Sem descrição detalhada sobre o agendamento)"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 rounded-lg bg-stone-100 py-4">
          <span className="flex w-full items-center gap-2 px-6 py-1 text-xs text-stone-400">
            <strong className="font-title">{data.period}</strong>{" "}
            {+data.period > 1 ? "dias" : "dia"}
          </span>
          <span className="flex w-full items-center gap-2 px-6 py-1 text-xs text-stone-400">
            <strong className="font-title">{data.quantity}</strong> artigos
          </span>
        </div>
        <div className="flex">
          <LaunchMenu data={data} />
        </div>
      </div>
    </div>
  );
}
