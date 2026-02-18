"use client";

import { Group, Burger, Text, Box } from "@mantine/core";
import { useTranslation } from "@/i18n/client";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
import { NavMenu } from "../Navigation/NavMenu";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Group h="100%" px="md" justify="space-between" className={styles.header}>
      <Group>
        <Burger
          hiddenFrom="sm"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          size="sm"
        />
        <Box component="a" href={`/${useTranslation().locale}`} className={styles.logoLink}>
          <Text fw={500} size="lg" tt="uppercase" lts="1px">
            {t("siteTitle")}
          </Text>
        </Box>
      </Group>

      <Group visibleFrom="sm">
        <NavMenu />
      </Group>

      <Group gap="xs">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </Group>
    </Group>
  );
}
