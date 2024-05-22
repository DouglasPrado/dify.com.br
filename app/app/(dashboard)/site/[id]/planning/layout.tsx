import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import PlanningNav from "./nav";

export default async function LaunchLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex gap-6">
      <div className="relative flex w-[300px]">
        <PlanningNav />
      </div>
      <div className="flex w-full flex-col">{children}</div>
    </div>
  );
}
