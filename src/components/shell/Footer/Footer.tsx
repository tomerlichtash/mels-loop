"use client";

import { Box, Container, Group, Text, Anchor } from "@mantine/core";
import { useTranslation } from "@/i18n/client";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box component="footer" className={styles.footer}>
      <Container size="lg" py="xl">
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <Box>
            <Text fw={700} size="sm" tt="uppercase" mb="xs">
              {t("siteTitle")}
            </Text>
            <Text size="sm" c="dimmed">
              {t("siteSubtitle")}
            </Text>
          </Box>
          <Group gap="lg">
            <Anchor href="https://twitter.com/aboutmelsloop" target="_blank" size="sm">
              Twitter
            </Anchor>
            <Anchor href="https://github.com/nicedoc/mels-loop" target="_blank" size="sm">
              GitHub
            </Anchor>
          </Group>
        </Group>
        <Text size="xs" c="dimmed" mt="lg" ta="center">
          {t("siteLicenseLabel").toUpperCase()} {t("siteLicenseAttrs").toUpperCase()}
        </Text>
      </Container>
    </Box>
  );
}
