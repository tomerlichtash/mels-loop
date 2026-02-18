import type { ReactNode } from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@/styles/globals.css";
import { theme } from "@/lib/theme";
import { robotoSlab, assistant } from "@/lib/fonts";
import { getDirection, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import { AppShell } from "@/components/shell/AppShell";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const title =
    typeof dict === "object" && dict !== null && "siteTitle" in dict
      ? String(dict.siteTitle)
      : "Mel's Loop";
  const description =
    typeof dict === "object" && dict !== null && "siteSubtitle" in dict
      ? String(dict.siteSubtitle)
      : "A Comprehensive Guide to The Story of Mel";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website",
    },
  };
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale);
  const messages = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      {...mantineHtmlProps}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${robotoSlab.variable} ${assistant.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <I18nProvider locale={locale} messages={messages}>
            <AppShell>{children}</AppShell>
          </I18nProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
