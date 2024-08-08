import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ExplorerCard from "./explorer-card";

export default async function Explorer({
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
    <div className="flex flex-col gap-12">
      <div className="flex flex-col">
        <h1 className="font-cal text-xl text-gray-800">Para hoje</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <ExplorerCard
            data={{
              title:
                "Retro Console R36S: O Melhor Videogame Portátil até R$200!",
              description:
                "Descubra o Retro Console R36S: o melhor videogame portátil abaixo de R$200! Mais de 15.000 jogos, design confortável e fácil de transportar. Perfeito para nostalgia!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "AYN ODIN 2: Console Portátil Incrível Chega ao Indiegogo!",
              description:
                "Descubra o AYN ODIN 2, o console portátil que chegou por R$2203,54! Com Snapdragon 8 Gen 2, design inovador e uma comunidade engajada. Junte-se à revolução gamer!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Unboxing e Impressões: ROG Ally X, o Portátil dos Gamers!",
              description:
                "Conheça o ROG Ally X! Unboxing, design aprimorado, maior autonomia e novas portas USB Tipo C. Uma escolha irresistível para gamers. Fique ligado para mais novidades!",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-cal text-xl text-gray-800">Ideias de conteúdo</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <ExplorerCard
            data={{
              title:
                "Retro Console R36S: O Melhor Videogame Portátil até R$200!",
              description:
                "Descubra o Retro Console R36S: o melhor videogame portátil abaixo de R$200! Mais de 15.000 jogos, design confortável e fácil de transportar. Perfeito para nostalgia!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "AYN ODIN 2: Console Portátil Incrível Chega ao Indiegogo!",
              description:
                "Descubra o AYN ODIN 2, o console portátil que chegou por R$2203,54! Com Snapdragon 8 Gen 2, design inovador e uma comunidade engajada. Junte-se à revolução gamer!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Unboxing e Impressões: ROG Ally X, o Portátil dos Gamers!",
              description:
                "Conheça o ROG Ally X! Unboxing, design aprimorado, maior autonomia e novas portas USB Tipo C. Uma escolha irresistível para gamers. Fique ligado para mais novidades!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Unboxing e Impressões: ROG Ally X, o Portátil dos Gamers!",
              description:
                "Conheça o ROG Ally X! Unboxing, design aprimorado, maior autonomia e novas portas USB Tipo C. Uma escolha irresistível para gamers. Fique ligado para mais novidades!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "AYN ODIN 2: Console Portátil Incrível Chega ao Indiegogo!",
              description:
                "Descubra o AYN ODIN 2, o console portátil que chegou por R$2203,54! Com Snapdragon 8 Gen 2, design inovador e uma comunidade engajada. Junte-se à revolução gamer!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Retro Console R36S: O Melhor Videogame Portátil até R$200!",
              description:
                "Descubra o Retro Console R36S: o melhor videogame portátil abaixo de R$200! Mais de 15.000 jogos, design confortável e fácil de transportar. Perfeito para nostalgia!",
            }}
          />
        </div>
      </div>
    </div>
  );
}
