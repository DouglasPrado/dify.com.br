import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import prisma from "@/lib/prisma";

export default async function SiteSettingsAppearance({
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
      <div className="grid grid-flow-col grid-rows-1 gap-6">
        <Form
          title="Logo"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 600x600."
          inputAttrs={{
            name: "logo",
            type: "file",
            defaultValue: data?.logo!,
          }}
          handleSubmit={updateSite}
        />
        
        <Form
          title="Logo Footer"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 600x600."
          inputAttrs={{
            name: "logoFooter",
            type: "file",
            defaultValue: data?.logoFooter!,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Favicon"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 600x600."
          inputAttrs={{
            name: "favicon",
            type: "file",
            defaultValue: data?.favicon!,
          }}
          handleSubmit={updateSite}
        />
      </div>
      <Form
        title="Font"
        description="A fonte do texto do título do negócio."
        helpText="Selecione a fonte"
        inputAttrs={{
          name: "font",
          type: "select",
          defaultValue: data?.font!,
        }}
        handleSubmit={updateSite}
      />
      <div className="flex gap-6">
        <Form
          title="pageMain"
          description="A fonte do texto do título do negócio."
          helpText="Selecione a fonte"
          inputAttrs={{
            name: "pageMain",
            type: "select",
            defaultValue: data?.pageMain!,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Url da página principal"
          description="selecione a página principal."
          helpText="Adicione a página, senão vamos utilizar a primeira."
          inputAttrs={{
            name: "pageUrl",
            type: "text",
            defaultValue: data?.pageUrl!,
            placeholder: "Caramba! Você encontrou uma página que não existe.",
            maxLength: 240,
          }}
          handleSubmit={updateSite}
        />
      </div>
      <Form
        title="Texto da página 404"
        description="Mensagem a ser exibida na página 404."
        helpText="Use no máximo 240 caracteres."
        inputAttrs={{
          name: "message404",
          type: "text",
          defaultValue: data?.message404!,
          placeholder: "Caramba! Você encontrou uma página que não existe.",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
