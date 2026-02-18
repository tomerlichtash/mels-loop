import { Card, Text, Anchor, Group } from "@mantine/core";

interface PostCardProps {
  slug: string;
  locale: string;
  title?: string;
  date?: string;
}

export function PostCard({ slug, locale, title, date }: PostCardProps) {
  const displayTitle = title || slug.replace(/-/g, " ");

  return (
    <Card withBorder padding="md">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text fw={500}>{displayTitle}</Text>
          {date && (
            <Text size="xs" c="dimmed">
              {date}
            </Text>
          )}
        </div>
        <Anchor href={`/${locale}/posts/${slug}`} size="sm">
          Read →
        </Anchor>
      </Group>
    </Card>
  );
}
