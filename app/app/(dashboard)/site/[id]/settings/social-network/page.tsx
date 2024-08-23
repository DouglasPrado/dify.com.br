import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import prisma from "@/lib/prisma";

export default async function SiteSettingsSocialNetwork({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
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
        handleSubmit={updateSite}
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
        handleSubmit={updateSite}
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
        handleSubmit={updateSite}
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
        handleSubmit={updateSite}
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
        handleSubmit={updateSite}
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
        handleSubmit={updateSite}
      />
    </div>
  );
}
