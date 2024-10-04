import { Construction } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "react-share";

export default function Hero() {
  return (
    <main className="grid place-items-center pb-8 pt-16 md:pb-24 md:pt-12 lg:grid-cols-2">
      <div className="hidden py-6 md:order-1 md:block">
        <Image
          src={
            "https://astroship.web3templates.com/_astro/hero.DlKDY3ml_Z1VhsC8.webp"
          }
          alt="Astronaut in the air"
          sizes="(max-width: 800px) 100vw, 620px"
          loading="eager"
          width={520}
          height={424}
        />
      </div>
      <div>
        <h1 className="text-5xl font-bold lg:text-6xl lg:tracking-tight xl:text-7xl xl:tracking-tighter">
          Construa seu império em órbita de vendas
        </h1>
        <p className="mt-4 max-w-xl text-lg text-stone-600">
          Crie listas e comparações de produtos, construa seu site de afiliados
          automaticamente e foque na conversão, sem depender de plataformas
          terceiras. Lucre como afiliado com facilidade!
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <span className="flex items-center justify-center gap-2 rounded border-2 border-black px-4 py-2 text-black">
            <Construction />
            Fase beta da plataforma
          </span>
          <Link
            href={"https://w.app/Kj9fG6"}
            target="_blank"
            className="w-full max-w-[320px] items-center"
          >
            <div className="hover:transform-y-1 flex w-full items-center justify-center gap-1 rounded-lg bg-[#25D366] py-1 font-title text-white shadow-xl transition-all">
              <WhatsappIcon size={40} />
              Acesso pelo whatsapp
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
