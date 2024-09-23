import Link from "next/link";

const SITES = [
  {
    image: "",
    label: "Bookfy",
    description: "",
    url: "https://bookfy.com.br",
    size: 19,
  },
  {
    image: "",
    label: "Lilibox",
    description: "",
    url: "https://lilibox.com.br",
    size: 13,
  },
  {
    image: "",
    label: "Meu negócio",
    description: "",
    url: "https://meunegocio.io",
    size: 41,
  },
  {
    image: "",
    label: "Dify PRO",
    description: "",
    url: "https://dify.pro",
    size: 90,
  },
  {
    image: "",
    label: "Video game portátil",
    description: "",
    url: "https://videogameportatil.com",
    size: 54,
  },
  {
    image: "",
    label: "Peguicinha",
    description: "",
    url: "https://peguicinha.com.br",
    size: 11,
  },
  {
    image: "",
    label: "HippoDrs.",
    description: "",
    url: "https://hippodrs.com.br",
    size: 14,
  },
  {
    image: "",
    label: "Burstfy.",
    description: "",
    url: "https://burstfy.com",
    size: 6,
  },
];
export default function Logos() {
  return (
    <div className="mt-24">
      <h2 className="text-center text-stone-500">
        Alguns sites que utilizam nossa plataforma
      </h2>
      <div className="mt-10 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-4 md:gap-6">
        {SITES.map((site, idx: number) => (
          <Link
            href={site.url}
            target="_blank"
            key={`key-site-${site.label}`}
            className="flex flex-col rounded-lg p-6 shadow-xl"
          >
            <span className="font-cal ">{site.label}</span>

            <span className="text-xs font-light text-stone-500">
              {site.url}
            </span>
            <span className="text-sm font-light text-stone-700">
              Monetizado com <strong className="font-cal">{site.size}</strong>{" "}
              artigos
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
