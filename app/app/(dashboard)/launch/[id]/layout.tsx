import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import LaunchSettingsNav from "./nav";

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
    <div className="flex flex-col">
      <LaunchSettingsNav />
      {children}
    </div>
  );
}
