import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "react-share";

export default function ForbiddenPage() {
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center gap-6 px-6">
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/creative-work.svg"
        width={400}
        height={400}
      />
      <h1 className="text-center font-cal text-4xl">
        Oi 👋, Meu nome é Douglas, <br />
        estou construindo essa plataforma!
      </h1>
      <p className="max-w-3xl text-center text-xl text-stone-900">
        Ela ainda não está pronta, mas se você quer fazer um teste ou bater um
        papo sobre, entre em contato comigo no meu whatsapp e vamos trocar uma
        ideia.
      </p>
      <Link
        href={
          "https://wa.me/5516997399953?text=Oi%20Douglas,%20eu%20gostaria%20de%20testar%20a%20plataforma%20de%20afiliados."
        }
        target="_blank"
        className="w-full max-w-[320px] items-center"
      >
        <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#25D366] py-1 font-title text-white shadow-xl transition-all hover:translate-y-1">
          <WhatsappIcon size={40} />
          Whatsapp
        </div>
      </Link>
    </div>
  );
}
