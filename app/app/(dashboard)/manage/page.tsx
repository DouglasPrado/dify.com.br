import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManageNav from "./nav";

export default async function ManageHome({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
          Gerenciamento do seu negócio
        </h1>
      </div>
      <ManageNav />
    </>
  );
}
