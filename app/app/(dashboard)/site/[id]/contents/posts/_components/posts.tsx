import { getSession } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import PostCard from "./post-card";

export default async function Posts({
  posts,
  limit,
}: {
  posts?: any;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4 py-6">
      <h1 className="font-title text-4xl">Você não tem nenhum conteúdo</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/crashed-error.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você ainda não tem conteúdo. Crie um para começar.
      </p>
    </div>
  );
}
