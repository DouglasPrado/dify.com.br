import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import prisma from "@/lib/prisma";

export default async function SiteSettingsContacts({
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
        title="Telefone"
        description="Digite o telefone do seu negócio, isso será apresentado no rodapé"
        helpText="Siga o exemplo Ex: (11) 9999-9999"
        inputAttrs={{
          name: "phone",
          type: "text",
          defaultValue: data?.phone!,
          placeholder: "(16) 3251-0950",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Whatsapp"
        description="Digite o whatsapp do seu negócio, isso será apresentado no rodapé"
        helpText="Siga o exemplo Ex: (11) 9999-9999"
        inputAttrs={{
          name: "whatsapp",
          type: "text",
          defaultValue: data?.whatsapp!,
          placeholder: "(16) 99739-9953",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="E-mail"
        description="Digite o e-mail do seu negócio, isso será apresentado no rodapé"
        helpText="Siga o exemplo Ex: oi@dify.com.br"
        inputAttrs={{
          name: "email",
          type: "text",
          defaultValue: data?.email!,
          placeholder: "oi@dify.com.br",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
