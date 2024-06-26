import { ThemeProvider } from "@/components/global/theme-provider";
import { cn } from "@/lib/utils";
import { cal, inter } from "@/styles/fonts";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Head from "next/head";
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
    <html lang="pt-br" suppressHydrationWarning>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <body className={cn(cal.variable, inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
