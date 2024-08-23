import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import WrapperPost from "./_components/wrapper-post";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    notFound();
  }

  return <WrapperPost id={params.id} />;
}
