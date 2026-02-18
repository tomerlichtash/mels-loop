"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { useTranslation } from "@/i18n/client";
import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();

  const targetLocale = locale === "en" ? "he" : "en";
  const label = locale === "en" ? "עב" : "EN";

  // Replace the current locale prefix in the pathname
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Tooltip label={targetLocale === "he" ? "עברית" : "English"}>
      <ActionIcon
        component="a"
        href={targetPath}
        variant="subtle"
        size="lg"
        aria-label={`Switch to ${targetLocale === "he" ? "Hebrew" : "English"}`}
      >
        {label}
      </ActionIcon>
    </Tooltip>
  );
}
