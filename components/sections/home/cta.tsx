import Link from "next/link";
import { WhatsappIcon } from "react-share";

export default function CTA() {
  return (
    <div className="mx-auto mt-20 flex max-w-5xl flex-col items-center rounded-lg bg-black p-8 text-center md:px-20 md:py-20">
      <h2 className="text-4xl tracking-tight text-white md:text-6xl">
        Afiliados em um próximo nível.
      </h2>
      <p className="mt-4 text-lg text-stone-200 md:text-xl">
        Automatize a criação de sites e maximize suas conversões com ferramentas
        inovadoras para afiliados. Seu sucesso começa aqui!
      </p>
      <div className="mt-5 flex">
        <Link
          href={
            "https://wa.me/5516997399953?text=Oi%20Douglas,%20eu%20gostaria%20de%20testar%20a%20plataforma%20de%20afiliados."
          }
          target="_blank"
          className="flex items-center"
        >
          <div className="hover:translate-y-1 flex w-full items-center justify-center gap-1 rounded-lg bg-[#25D366] px-4 py-1 font-title text-white shadow-xl transition-all">
            <WhatsappIcon size={40} />
            Acesso pelo whatsapp
          </div>
        </Link>
      </div>
    </div>
  );
}
