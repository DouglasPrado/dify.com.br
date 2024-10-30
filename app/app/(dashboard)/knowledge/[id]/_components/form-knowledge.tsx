"use client";
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { useParams } from "next/navigation";
import { FC, ReactElement } from "react";
import PDFForm from "./pdf-form";
import SitemapForm from "./sitemap-form";
import TextForm from "./text-form";
import URLForm from "./url-form";
import YoutubeForm from "./youtube-form";

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
      {type === "text" && <TextForm knowledgeId={id} />}
      {type === "pdf" && <PDFForm knowledgeId={id} />}
      {type === "sitemap" && <SitemapForm knowledgeId={id} />}
      {type === "url" && <URLForm knowledgeId={id} />}
      {type === "youtube" && <YoutubeForm knowledgeId={id} />}
    </div>
  );
};

export default FormKnowledge;
