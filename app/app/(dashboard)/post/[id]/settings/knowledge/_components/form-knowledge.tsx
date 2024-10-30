"use client";
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { FC, ReactElement } from "react";
import PDFForm from "./pdf-form";
import SitemapForm from "./sitemap-form";
import TextForm from "./text-form";
import URLForm from "./url-form";
import YoutubeForm from "./youtube-form";
import { useParams } from "next/navigation";

type FormKnowledgeProps = {
  // Prop types here
};

const FormKnowledge: FC<
  FormKnowledgeProps
> = ({}: FormKnowledgeProps): ReactElement => {
  const { id } = useParams() as { id: string };
  const [type] = useKnowledgeStore((state) => [state.type]);
  return (
    <div>
      <h2 className="font-cal text-stone-800">
        Enviar conteúdo para base de conhecimento
      </h2>
      {type === "text" && <TextForm postId={id} />}
      {type === "pdf" && <PDFForm postId={id} />}
      {type === "sitemap" && <SitemapForm postId={id} />}
      {type === "url" && <URLForm postId={id} />}
      {type === "youtube" && <YoutubeForm postId={id} />}
    </div>
  );
};

export default FormKnowledge;
