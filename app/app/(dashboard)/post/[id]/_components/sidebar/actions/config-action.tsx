"use client";
import FormUpload from "@/components/form/form-upload";
import LoadingCircle from "@/components/icons/loading-circle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { updatePostMetadata } from "@/lib/actions";
import { generateMagic } from "@/lib/actions/magics";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { prepareURL } from "@/lib/utils";
import {
  Bolt,
  Facebook,
  Instagram,
  Sparkles,
  Target,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ConfigAction() {
  const [post, updatePost] = useStudioStore((state) => [
    state.post,
    state.updatePost,
  ]);
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState<string | null>(post.slug);
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Bolt width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Configurações</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Refine a sua publicação para publicar e destacar seu conteúdo.
      </p>
      <div className="my-6 flex h-full w-full  flex-col gap-6 ">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-light text-stone-600">
            Slug personalizada
          </span>
          <div className="flex items-center gap-3 text-sm font-light text-stone-600">
            <Input
              placeholder="URL Personalizada"
              value={slug || ""}
              onChange={(e) => {
                const slug = new FormData();
                const value = prepareURL(e.target.value);
                setSlug(value);
                slug.append("slug", value);
                updatePostMetadata(slug, post.id, "slug").then(
                  (resPost: any) => {
                    setLoading(false);
                    updatePost(resPost);
                    toast.success(`Successfully created ${"slug"}!`);
                  },
                );
              }}
            />
            <button
              onClick={() => {
                const data = new FormData();
                data.append("content", post.title);
                data.append("type", "slug");
                post && setLoading(true),
                  generateMagic(data, post.id).then((res) => {
                    setSlug(res);
                    const slug = new FormData();
                    slug.append("slug", res);
                    updatePostMetadata(slug, post.id, "slug").then(
                      (resPost: any) => {
                        setLoading(false);
                        updatePost(resPost);
                        toast.success(`Successfully created ${"slug"}!`);
                      },
                    );
                  });
              }}
            >
              {!loading ? (
                <Sparkles className="text-stone-300" />
              ) : (
                <LoadingCircle />
              )}
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-3 ">
          <span className="text-sm font-light text-stone-600">
            Imagem de destaque
          </span>
          <FormUpload
            inputAttrs={{
              name: "image",
              type: "file",
              defaultValue: post?.image!,
            }}
            handleSubmit={updatePostMetadata}
          />
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Destacar publicação</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Publicação automática</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Notificação em massa</span>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="google">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Target size={16} />
                Google
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="facebook">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Facebook size={16} />
                Facebook
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="instagram">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Instagram size={16} />
                Instagram
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="twitter">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Twitter size={16} />
                Twitter
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
