import Form from "@/components/form";
import { updateColumnistMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ColumnistSocials({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.columnist.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Redes sociais
        </h1>
        <div className="flex flex-col space-y-6">
          <Form
            title="Facebook"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "facebook",
              type: "text",
              defaultValue: data?.facebook!,
              placeholder: "https://facebook.com/dify",
              maxLength: 240,
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <Form
            title="Instagram"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "instagram",
              type: "text",
              defaultValue: data?.instagram!,
              placeholder: "https://instagram.com/dify",
              maxLength: 240,
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <Form
            title="TikTok"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "tiktok",
              type: "text",
              defaultValue: data?.tiktok!,
              placeholder: "https://tiktok.com/dify",
              maxLength: 240,
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <Form
            title="Twitter"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "twitter",
              type: "text",
              defaultValue: data?.twitter!,
              placeholder: "https://twitter.com/dify",
              maxLength: 240,
              required: false,
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <Form
            title="Youtube"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "youtube",
              type: "text",
              defaultValue: data?.youtube!,
              placeholder: "https://youtube.com/dify",
              maxLength: 240,
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <Form
            title="Linkedin"
            description="Se você deseja fortalecer a presença online do seu negócio, adicionar a URL da sua rede social é uma etapa crucial. "
            helpText="Use no máximo 240 caracteres."
            inputAttrs={{
              name: "linkedin",
              type: "text",
              defaultValue: data?.linkedin!,
              placeholder: "https://linkedin.com/dify",
              maxLength: 240,
            }}
            handleSubmit={updateColumnistMetadata}
          />
        </div>
      </div>
    </div>
  );
}
