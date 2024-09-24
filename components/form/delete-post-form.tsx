"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { deletePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function DeletePostForm({ postName }: { postName: string }) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        window.confirm("Tem certeza de que deseja excluir seu conteúdo?") &&
          deletePost(data, id, "delete").then((res) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              va.track("Deleted Content");
              router.refresh();
              router.push(`/site/${res.siteId}/contents/posts`);
              toast.success(`Postagem excluída com sucesso!`);
            }
          });
      }}
      className="rounded-lg border border-red-600 bg-white dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-title text-xl dark:text-white">Deletar conteúdo</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Exclui sua postagem permanentemente. Digite o nome do seu conteúdo{" "}
          <b>{postName}</b> para confirmar.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={postName}
          placeholder={postName}
          className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          Esta ação é irreversível. Por favor, proceda com cautela.
        </p>
        <div className="w-32">
          <FormButton />
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Deletar</p>}
    </button>
  );
}
