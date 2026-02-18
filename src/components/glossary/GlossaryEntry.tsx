import { Card, Text, Anchor, Group } from "@mantine/core";

interface GlossaryEntryProps {
  slug: string;
  locale: string;
}

export function GlossaryEntry({ slug, locale }: GlossaryEntryProps) {
  const displayName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Card withBorder padding="sm">
      <Group justify="space-between">
        <Text fw={500}>{displayName}</Text>
        <Anchor href={`/${locale}/glossary/${slug}`} size="sm">
          View →
        </Anchor>
      </Group>
    </Card>
  );
}
