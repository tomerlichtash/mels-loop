import type { ReactNode } from "react";
import "./styles/globals.css";
import { ColorSchemeScript } from "./color-scheme/ColorSchemeScript";
import { robotoSlab, assistant } from "./fonts";
import {
  getDirection,
  isValidLocale,
  type Locale,
} from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import { I18nProvider } from "@mels-loop/i18n/client";
import { AppShell } from "./shell/AppShell/AppShell";
import { FaviconAnimator } from "./shell/FaviconAnimator/FaviconAnimator";
import type { NavItem, FooterLinkColumn } from "./shell/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface LayoutConfig {
  navItems: NavItem[];
  footerLinks?: FooterLinkColumn[];
  titlePrefix?: string;
  titleTemplate?: string;
  resolveNavItems?: (navItems: NavItem[], locale: Locale) => Promise<NavItem[]>;
}

export function createLocaleLayout(config: LayoutConfig) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const siteTitle =
      typeof dict === "object" && dict !== null && "siteTitle" in dict
        ? String(dict.siteTitle)
        : "Mel's Loop";
    const description =
      typeof dict === "object" && dict !== null && "siteSubtitle" in dict
        ? String(dict.siteSubtitle)
        : "A Comprehensive Guide to The Story of Mel";

    const defaultTitle = config.titlePrefix
      ? `${config.titlePrefix} | ${siteTitle}`
      : siteTitle;
    const template =
      config.titleTemplate ||
      (config.titlePrefix
        ? `%s | ${config.titlePrefix} | ${siteTitle}`
        : `%s | ${siteTitle}`);

    return {
      title: { default: defaultTitle, template },
      description,
      openGraph: {
        title: siteTitle,
        description,
        siteName: siteTitle,
        locale: locale === "he" ? "he_IL" : "en_US",
        type: "website",
      },
    };
  }

  async function Layout({
    children,
    params,
  }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
      notFound();
    }

    const dir = getDirection(locale);
    const messages = await getDictionary(locale);
    const navItems = config.resolveNavItems
      ? await config.resolveNavItems(config.navItems, locale)
      : config.navItems;

    return (
      <html
        lang={locale}
        dir={dir}
        suppressHydrationWarning
      >
        <head>
          <link rel="icon" href="/favicon-light.png" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
          <ColorSchemeScript />
        </head>
        <body className={`${robotoSlab.variable} ${assistant.variable}`}>
          <I18nProvider locale={locale} messages={messages}>
            <FaviconAnimator />
            <AppShell navItems={navItems} footerLinks={config.footerLinks}>{children}</AppShell>
          </I18nProvider>
        </body>
      </html>
    );
  }

  return { Layout, generateMetadata };
}
