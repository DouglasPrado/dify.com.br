"use client";
import { createMedia } from "@/lib/actions/medias";
import Placeholder from "@/public/placeholder.png";
import { Media } from "@prisma/client";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import Medias from "../../app/app/(dashboard)/site/[id]/media/_components/medias";
import Form from "../form";
import { Button } from "../ui/button";

export default function UploadImages({
  medias,
  siteId,
}: {
  siteId: string;
  medias: Media[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleCreateMedia = useCallback(
    async (dataMedia: any) => {
      createMedia(dataMedia, siteId, "image").then((res: any) => {
        va.track(`Created Media with sucess`);
        router.refresh();
        toast.success(`Midia criada com sucesso!`);
      });
    },
    [router, siteId],
  );

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg border border-stone-200 bg-white shadow-md transition-all hover:shadow-xl">
      <div className="flex w-full gap-3 px-6 pt-6">
        {!open ? (
          <Button
            variant={"outline"}
            onClick={() => {
              setOpen(true);
            }}
            type="button"
          >
            Fazer upload
          </Button>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => {
              setOpen(false);
            }}
            type="button"
          >
            Listar toda mídia
          </Button>
        )}
      </div>
      {!open ? (
        <Medias medias={medias} />
      ) : (
        <div className="flex flex-col px-6 pb-6">
          <Form
            title=""
            description="Faça upload do seu computador. Formatos aceitos: .png, .jpg, .jpeg .webp"
            helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
            inputAttrs={{
              name: "image",
              type: "file",
              defaultValue: Placeholder.src,
            }}
            handleSubmit={handleCreateMedia}
          />
        </div>
      )}
    </div>
  );
}
