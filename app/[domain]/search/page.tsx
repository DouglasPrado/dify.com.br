import CookieSection from "@/components/sections/products/cookie-section";
import FooterSection from "@/components/sections/products/footer-section";
import NavSection from "@/components/sections/products/nav-section";
import { getCategoriesForSite, getSiteData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
import GridContents from "./_components/grid-contents";

export default async function SiteSearchPage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, categories]: any = await Promise.all([
    getSiteData(domain),
    getCategoriesForSite(domain),
  ]);

  if (!data) {
    notFound();
  }
  return (
    <>
      <CookieSection data={{ site: data }} />
      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center">
        {/* Navegação */}
        <NavSection
          logo={{ logo: data.logo, config: data.logoConfig }}
          categories={categories}
        />

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-around gap-6 px-6 pt-6 lg:flex-row lg:px-0">
          {/* Conteúdo */}
          <div className="flex w-full flex-col gap-6">
            <GridContents siteId={`${data.id}`} openActions={false} />
          </div>
        </section>

        {/* Produtos */}
        <section className="mx-auto flex w-full max-w-7xl flex-col justify-around px-6 py-3 lg:px-0">
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3"></div>
        </section>
      </div>
      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.colors["backgroundFooter"],
            colorContrastFooter: data.colors["colorContrastFooter"],
          },
          site: data,
        }}
      />
    </>
  );
}
