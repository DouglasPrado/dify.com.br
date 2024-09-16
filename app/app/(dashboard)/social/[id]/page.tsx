import BlurImage from "@/components/global/blur-image";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { placeholderBlurhash } from "@/lib/utils";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function SocialPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.social.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          name: true,
          logo: true,
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  const splitContent = data.content!.split("#")!;
  const content = splitContent[0]?.replace(/\\n/g, "<br/>");
  delete splitContent[0];
  let hashtags = "";
  splitContent.map((hashtag:any) => {
    if (hashtag !== "") {
      hashtags += `#${hashtag} `;
    }
  });
  console.log(hashtags);
  return (
    <article className="flex">
      <div className="relative">
        <BlurImage
          alt={data.title ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-full "
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
      </div>
      <div className="px-3">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5">
            <Image
              alt=""
              src={data.site!.logo as string}
              width={100}
              height={100}
              className="h-10 w-10 rounded-full bg-white object-contain p-1"
            />
          </div>
          <div className="flex items-center gap-1 ">
            <span className="font-title lowercase">
              {data.site!.name?.replaceAll(" ", "")}
            </span>
            <svg
              aria-label="Verificado"
              fill="rgb(0, 149, 246)"
              height="14"
              role="img"
              viewBox="0 0 45 45"
              width="14"
            >
              <title>Verificado</title>
              <path
                d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="w-[480px] cursor-pointer  py-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: `${content}`,
          }}
        />
        <div
          className="w-[480px]  text-sm  text-indigo-800"
          dangerouslySetInnerHTML={{
            __html: `${hashtags}`,
          }}
        />
      </div>
    </article>
  );
}
