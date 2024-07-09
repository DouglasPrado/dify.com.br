import type { Media, ProductSections, Site } from "@prisma/client";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface FooterSectionProps {
  data: {
    colors: {
      backgroundFooter: string;
      colorContrastFooter: string;
    };
    site: Site;
    sections?: ProductSections[] & { medias: Media[] };
  };
}

export default function LinkFooterSection({ data }: FooterSectionProps) {
  return (
    <footer
      style={{
        backgroundColor: data.colors?.backgroundFooter,
        color: data.colors?.colorContrastFooter,
      }}
      className="bottom-0 flex w-full flex-col items-center justify-center"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-4 lg:px-0">
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="flex gap-6">
            {/* <div className="w-full">
              <BlurImage
                alt={data.site.name ?? "User Avatar"}
                height={80}
                src={data.site.logoFooter!}
                width={80}
                className=""
              />
            </div> */}
            <div className="flex flex-col items-start gap-3">
              <h1 className="font-title text-xl">{data.site.name}</h1>
              <p className="text-left text-xs">{data.site.description}</p>
            </div>
          </div>
          {data.site.address && (
            <div className="flex flex-col">
              <h1 className="text-left font-title">Endereço</h1>
              <p className="text-left text-xs">{data.site.address}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-left font-title text-xl ">Fale com a gente</h1>
          <ul className="list-item py-4 text-sm">
            {data.site.phone && (
              <li className="flex gap-3">
                <Phone strokeWidth={1.25} width={16} />
                <span>{data.site.phone}</span>
              </li>
            )}
            {data.site.whatsapp && (
              <li className="flex gap-3">
                <Phone strokeWidth={1.25} width={16} />
                <span>{data.site.whatsapp}</span>
              </li>
            )}
            {data.site.email && (
              <li className="flex gap-3">
                <Mail strokeWidth={1.25} width={16} />
                <span>{data.site.email}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-start">
          <h1 className="text-left font-title text-xl ">Páginas</h1>
          <div className="flex items-center justify-center">
            <ul className="flex flex-col items-center gap-3 py-4 text-sm ">
              <li className="cursor-pointer hover:underline">
                <Link href={`/page/sobre`}>
                  <span>Sobre</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/page/codigo-de-rastreio`}>
                  <span>Código de rastreio</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/page/termos-de-uso`}>
                  <span>Termos de uso</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/posts`}>
                  <span>Conteúdo</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/webstories`}>
                  <span>Webstories</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/sitemap.xml`}>
                  <span>Mapa do site</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/page/disclaimer`}>
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link href={`/page/politica-de-privacidade`}>
                  <span>Políticas de privacidade</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start ">
          <h1 className="text-left font-title text-xl">Redes sociais</h1>
          <div className="flex gap-6 py-4">
            {data.site.facebook && (
              <Link
                href={data.site.facebook}
                target="_blank"
                className="hover:cursor-pointer"
              >
                <Facebook strokeWidth={1.25} />
              </Link>
            )}
            {data.site.instagram && (
              <Link
                href={data.site.instagram}
                target="_blank"
                className="hover:cursor-pointer"
              >
                <Instagram strokeWidth={1.25} />
              </Link>
            )}
            {data.site.youtube && (
              <Link
                href={data.site.youtube}
                target="_blank"
                className="hover:cursor-pointer"
              >
                <Youtube strokeWidth={1.25} />
              </Link>
            )}
            {data.site.linkedin && (
              <Link
                href={data.site.linkedin}
                target="_blank"
                className="hover:cursor-pointer"
              >
                <Linkedin strokeWidth={1.25} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className=" flex-col items-center justify-center py-3">
        <h1 className="text-center text-sm font-light uppercase">
          {data.site.companyName}
        </h1>
        <h3 className="text-center text-xs"> {data.site.employerNumber}</h3>
      </div>
    </footer>
  );
}
