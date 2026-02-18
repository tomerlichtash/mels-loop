"use client";

import { Group, Anchor } from "@mantine/core";
import { useTranslation } from "@/i18n/client";

const navItems = [
  { key: "nav.about", href: "/about" },
  { key: "nav.blog", href: "/posts" },
  { key: "nav.glossary", href: "/glossary" },
  { key: "nav.contact", href: "/contact" },
] as const;

export function NavMenu() {
  const { locale, t } = useTranslation();

  return (
    <Group gap="lg">
      {navItems.map((item) => (
        <Anchor
          key={item.key}
          href={`/${locale}${item.href}`}
          size="sm"
          fw={500}
          tt="uppercase"
        >
          {t(item.key)}
        </Anchor>
      ))}
    </Group>
  );
}
