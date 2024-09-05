import { cn } from "@/lib/utils";
import { cal, inter } from "@/styles/fonts";
import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import { Metadata } from "next";
import { Providers } from "./providers";

const title = "dify - Faça lançamentos de produtos em menos de 15 minutos";
const description =
  "Faça lançamento de produtos físicos ou digitais 10x mais rápido. Alavanque o crescimento do seu negócio online com uma estrutura personalizada, dispensando a necessidade de contratar programadores.";
const image = "/logo.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["/favicon.png"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@dify",
  },
  metadataBase: new URL("https://dify.com.br"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body className={cn(cal.variable, inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
