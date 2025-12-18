import "../globals.css";
import "katex/dist/katex.min.css";

import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { ViewTransition } from "react";
import { twMerge } from "tailwind-merge";
import { GeistMono, Pretendard } from "~/app/_fonts";
import { variables } from "~/constants/variables";
import { Header } from "../_components/header";
import { NavigationMenu } from "../_components/navigation-menu";

import type { Locale } from "../../i18n-config";

export const metadata: Metadata = {
  metadataBase: new URL(variables.siteUrl),
  title: variables.siteName,
  description: variables.siteDescription,
  authors: [{ name: variables.siteName, url: variables.siteUrl }],
  openGraph: {
    title: variables.siteName,
    description: variables.siteDescription,
    url: variables.siteUrl,
    type: "website",
    images: [
      { url: variables.preview_image, alt: variables.preview_image_alt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: variables.siteName,
    description: variables.siteDescription,
    images: [
      { url: variables.preview_image, alt: variables.preview_image_alt },
    ],
    creator: variables.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type RootLayoutProps = PropsWithChildren<{
  params: Promise<{ lang: string }>;
}>;

import { getDictionary } from "./dictionaries";

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={twMerge("pt-8 pb-12", Pretendard.variable, GeistMono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <ViewTransition name="cross">
            <main className="mx-auto w-full max-w-3xl px-5 py-10">
              {children}
            </main>
          </ViewTransition>
          <NavigationMenu navDict={dict.nav} />
        </ThemeProvider>

        <Script
          async
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required to initialize GA.
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${variables.ga_id}')`,
          }}
          id="_next-ga-init"
        />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${variables.gt_id}`}
        />
      </body>
    </html>
  );
};

export default RootLayout;
