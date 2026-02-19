"use client";

import { useTranslation } from "@mels-loop/i18n/client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useColorScheme } from "../../color-scheme/useColorScheme";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();

  const label = colorScheme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark");

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={styles.button}
            onClick={toggleColorScheme}
            aria-label={label}
          >
            <span className={styles.light}><MoonIcon /></span>
            <span className={styles.dark}><SunIcon /></span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltip} sideOffset={5}>
            {label}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
