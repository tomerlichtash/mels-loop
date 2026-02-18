"use client";

import { Drawer, Stack, NavLink } from "@mantine/core";
import { useTranslation } from "@/i18n/client";

interface MobileDrawerProps {
  opened: boolean;
  onClose: () => void;
}

const navItems = [
  { key: "nav.home", href: "" },
  { key: "nav.about", href: "/about" },
  { key: "nav.blog", href: "/posts" },
  { key: "nav.glossary", href: "/glossary" },
  { key: "nav.resources", href: "/stories/the-story-of-mel/resources" },
  { key: "nav.contact", href: "/contact" },
  { key: "nav.contribute", href: "/contribute" },
] as const;

export function MobileDrawer({ opened, onClose }: MobileDrawerProps) {
  const { locale, t } = useTranslation();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="xs"
      padding="md"
      title={t("siteTitle")}
      hiddenFrom="sm"
      zIndex={1000}
    >
      <Stack gap={0}>
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            component="a"
            href={`/${locale}${item.href}`}
            label={t(item.key)}
            onClick={onClose}
          />
        ))}
      </Stack>
    </Drawer>
  );
}
