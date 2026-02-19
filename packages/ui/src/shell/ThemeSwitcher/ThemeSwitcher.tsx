"use client";

import { useTranslation } from "@mels-loop/i18n/client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useColorScheme } from "../../color-scheme/useColorScheme";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleColorScheme}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
    >
      <span className={styles.light}><MoonIcon /></span>
      <span className={styles.dark}><SunIcon /></span>
    </button>
  );
}
