import Form from "@/components/form";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { updateSite } from "@/lib/actions";
import prisma from "@/lib/prisma";

export default async function SiteSettingsIndex({
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
        title="Nome"
        description="O nome do seu negócio. Ele também será usado como meta título no Google."
        helpText="Use no máximo 32 caracteres."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "Dify - Negócios digitais",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Descrição curta"
        description="A descrição do seu site. Isso também será usado como meta descrição no Google."
        helpText="Inclua palavras-chave otimizadas para SEO que você deseja classificar."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder:
            "Fale algo sobre seu negócio que seja realmente interessante.",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Razão social"
        description="Adicione a razão social do seu negócio."
        helpText="É importante para o rodapé do site, sites de terceiros validam o site através da razão social."
        inputAttrs={{
          name: "companyName",
          type: "text",
          defaultValue: data?.companyName!,
          placeholder: "Digite a razão social",
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="CNPJ"
        description="Adicione o CNPJ do seu negócio."
        helpText="É importante para o rodapé do site, sites de terceiros validam o site através do CNPJ."
        inputAttrs={{
          name: "employerNumber",
          type: "text",
          defaultValue: data?.employerNumber!,
          placeholder: "Digite o CNPJ",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Google Analytics"
        description="Adicione a tag do google para avaliar os acessos da sua página."
        helpText="É importante analisar se seus produtos estão performando bem."
        inputAttrs={{
          name: "gaTrackingId",
          type: "text",
          defaultValue: data?.gaTrackingId!,
          placeholder: "Digite o GA Tracking ID",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Endereço completo"
        description="Coloque o endereço completo do seu negócio"
        helpText="É importante para o rodapé do site, sites de terceiros validam o site através do endereço."
        inputAttrs={{
          name: "address",
          type: "text",
          defaultValue: data?.address!,
          placeholder: "Ex: Rua Nove de Julho 900, Centro, 12230-000",
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
