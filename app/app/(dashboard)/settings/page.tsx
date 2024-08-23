import Form from "@/components/form";
import { editUser } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <Form
          title="Nome"
          description="Digite como quer ser chamado"
          helpText="Por favor, utiliza no máximo 32 caracteres."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: session.user.name!,
            placeholder: "Ex: Douglas Prado",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Digite seu e-mail."
          helpText="Digite um e-mail válido."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "oi@douglasprado.com.br",
          }}
          handleSubmit={editUser}
        />
      </div>
    </div>
  );
}
