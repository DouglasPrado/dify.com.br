import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import WrapperContentReference from "./_components/wrapper-content-reference";
export default async function ContentTunningPage({
  params,
}: {
  params: { referenceId: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const handleChange = () => {};
  const data = await prisma.reference.findUnique({
    where: {
      id: decodeURIComponent(params.referenceId),
    },
  });
  if (!data) {
    notFound();
  }

  if (!session.user.id) {
    notFound();
  }

  return <WrapperContentReference data={data} />;
}
