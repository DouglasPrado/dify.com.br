"use client";
import NovelEditor from "@/components/editor/editor";
import LoadingDots from "@/components/icons/loading-dots";
import {
  updatePost as updatePostAction,
  updatePostMetadata,
} from "@/lib/actions";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

type PostWithSite = Post & { site: { subdomain: string | null } | null };

export default function Editor() {
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [post, updatePost, getPost, resetPost] = useStudioStore((state) => [
    state.post,
    state.updatePost,
    state.getPost,
    state.resetPost,
  ]);
  useEffect(() => {
    if (id !== post.id) {
      resetPost();
      getPost(id);
    }
    setLoading(false);
  }, [getPost, id, resetPost, post.id]);
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${post?.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${post.slug}`
    : `http://${post?.site?.subdomain}.localhost:3000/${post.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePostAction(post);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [post, startTransitionSaving]);

  const handleOnChange = useCallback(
    (editor: any) => {
      startTransitionSaving(async () => {
        updatePost({
          ...post,
          content: editor?.storage?.markdown?.getMarkdown(),
          contentJSON: JSON.stringify(editor.getJSON()),
        });
      });
    },
    [post, updatePost],
  );

  return !loading ? (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 dark:border-stone-700 ">
      <div className="absolute left-12 top-5 mb-5 flex items-center space-x-3">
        {post.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="rounded-lg bg-stone-100 px-2 py-2 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Salvando..." : "Salvar"}
        </div>
        <button
          onClick={() => {
            const formData = new FormData();
            formData.append("published", String(!post.published));
            startTransitionPublishing(async () => {
              await updatePostMetadata(formData, post.id, "published").then(
                () => {
                  updatePost({
                    ...post,
                    published: !post.published,
                  });
                  toast.success(
                    `Successfully ${
                      post.published ? "unpublished" : "published"
                    } your post.`,
                  );
                },
              );
            });
          }}
          className={cn(
            "flex h-8 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{post.published ? "Rascunho" : "Publicar"}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Título"
            defaultValue={post.title}
            autoFocus
            onChange={async (e) => {
              updatePost({
                ...post,
                title: e.target.value,
              });
            }}
            className="dark:placeholder-text-600 w-full border-none px-0 font-title text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <TextareaAutosize
            placeholder="Descrição"
            defaultValue={post.description}
            onChange={async (e) => {
              if (e.target.value !== post.description) {
                updatePost({ ...post, description: e.target.value });
              }
            }}
            className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
        </div>
      </div>
      <NovelEditor
        initialValue={
          typeof post.contentJSON === "string"
            ? JSON.parse(post.contentJSON)
            : post.contentJSON || post.content || ""
        }
        onChange={handleOnChange}
      />
    </div>
  ) : (
    <LoadingDots />
  );
}
