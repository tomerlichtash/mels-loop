"use client";

import { ActionIcon, useMantineColorScheme, Tooltip } from "@mantine/core";
import { useTranslation } from "@/i18n/client";

export function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";

  return (
    <Tooltip label={t("theme.toggle")}>
      <ActionIcon
        variant="subtle"
        onClick={toggleColorScheme}
        aria-label={t("theme.toggle")}
        size="lg"
      >
        {isDark ? "☀️" : "🌙"}
      </ActionIcon>
    </Tooltip>
  );
}
