import { Card, Text, Anchor, Group, Badge } from "@mantine/core";
import type { Locale, StoryConfig } from "@/lib/content/types";

interface StoryCardProps {
  config: StoryConfig;
  locale: Locale;
}

export function StoryCard({ config, locale }: StoryCardProps) {
  return (
    <Card withBorder padding="lg">
      <Group justify="space-between" mb="xs">
        <Text fw={700} size="lg">
          {config.title[locale]}
        </Text>
        {config.featured && <Badge color="pink">Featured</Badge>}
      </Group>
      <Text size="sm" c="dimmed" mb="md">
        {config.abstract[locale]}
      </Text>
      <Anchor href={`/${locale}/stories/${config.slug}`}>
        {locale === "he" ? "עוד" : "Learn More"} →
      </Anchor>
    </Card>
  );
}
