import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import IntegrationCard from "./integration-card";

export default async function Integrations({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-title text-2xl">Configurações</h1>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-5 xl:grid-cols-5">
        <IntegrationCard
          data={{
            title: "Google Publisher Center",
            description: "A ferramenta para criar campanhas e nutrir leads",
            logo: "https://nearviewmedia.com/wp-content/uploads/2023/10/High-Value-Publishing-Intro.002.jpeg",
          }}
        />
        <IntegrationCard
          data={{
            title: "Google Analytics 4",
            description: "A ferramenta para criar campanhas e nutrir leads",
            logo: "https://www.webfx.com/wp-content/uploads/2021/10/google-analytics-4-graphic.gif",
          }}
        />
      </div>

      <h1 className="font-title text-2xl">Marketing</h1>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-5 xl:grid-cols-5">
        <IntegrationCard
          data={{
            title: "RD Station",
            description: "A ferramenta para criar campanhas e nutrir leads",
            logo: "https://robbu.global/wp-content/uploads/2021/10/rd-station1.png",
          }}
        />
        <IntegrationCard
          data={{
            title: "Brevo",
            description: "Solução de experiência do cliente",
            logo: "https://k7n8p8z5.rocketcdn.me/wp-content/uploads/2023/05/medium_2023-05-04-242208482b.jpg",
          }}
        />
        <IntegrationCard
          data={{
            title: "Many Chat",
            description: "A ferramenta para criar campanhas e nutrir leads",
            logo: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_manychat.png",
          }}
        />
      </div>
      <h1 className="font-title text-2xl">Pagamentos</h1>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-5 xl:grid-cols-5">
        <IntegrationCard
          data={{
            title: "Stripe - Pagamentos",
            description: "Infraestrutura de pagamentos pela internet",
            logo: "https://cdn.dribbble.com/users/920/screenshots/3031540/untitled-3.gif",
          }}
        />
        <IntegrationCard
          data={{
            title: "Mercado Pago",
            description: "Infraestrutura de pagamentos pela internet",
            logo: "https://conteudo.traycorp.com.br/wp-content/uploads/2020/03/mercadopago.jpg",
          }}
        />
      </div>
      <h1 className="font-title text-2xl">Marketplace</h1>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-5 xl:grid-cols-5">
        <IntegrationCard
          data={{
            title: "Amazon",
            description: "Loja de produtos fisícos",
            logo: "https://res.cloudinary.com/zenbusiness/image/upload/v1670445040/logaster/logaster-2020-03-amazon-gif-logo.gif",
          }}
        />
        <IntegrationCard
          data={{
            title: "Americanas",
            description: "Loja de produtos fisícos",
            logo: "https://99prod.s3.amazonaws.com/uploads/image/file/657486/4dda1ee4a4f732e5c02a2f06964fa45c.jpg",
          }}
        />
        <IntegrationCard
          data={{
            title: "Mercado Livre",
            description: "Loja de produtos fisícos",
            logo: "https://s2.glbimg.com/Bu6upvmSg6SRv0za635uXphThKo=/620x430/e.glbimg.com/og/ed/f/original/2020/03/28/mercado-livre.jpg",
          }}
        />
      </div>

      <h1 className="font-title text-2xl">Redes sociais</h1>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-5 xl:grid-cols-5">
        <IntegrationCard
          data={{
            title: "Whatsapp",
            description: "Rede social",
            logo: "https://gifdb.com/images/high/whatsapp-typing-logo-yhpoe34slgldf6ek.gif",
          }}
        />
        <IntegrationCard
          data={{
            title: "Facebook",
            description: "Rede social",
            logo: "https://cdn.dribbble.com/users/954572/screenshots/17357871/media/af709d784f14cb4cff42471e1afadd23.gif",
          }}
        />
        <IntegrationCard
          data={{
            title: "Instagram",
            description: "Rede social",
            logo: "https://cdn.logojoy.com/wp-content/uploads/20230511124058/instagram-new-gradient-logo-animation.gif",
          }}
        />
        <IntegrationCard
          data={{
            title: "Tik tok",
            description: "Rede social",
            logo: "https://media.tenor.com/sBqC9XzJSOoAAAAC/tiktok-logo.gif",
          }}
        />
      </div>
    </div>
  );
}
