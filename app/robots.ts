import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const domain =
    headersList
      .get("host")
      ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
    "vercel.pub";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [`https://app.${domain}`, "/_next/static/media/"],
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
