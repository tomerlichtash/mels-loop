import { notFound } from "next/navigation";
import { Container, Title, Text, Stack, Anchor } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getPost, getAllPosts } from "@/lib/content/loaders";
import { ContentRenderer } from "@/components/content/ContentRenderer";

interface PageProps {
  params: Promise<{ locale: string; postSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPosts();
  return slugs.flatMap((postSlug) =>
    locales.map((locale) => ({ locale, postSlug }))
  );
}

export default async function PostPage({ params }: PageProps) {
  const { locale, postSlug } = await params;
  const content = await getPost(postSlug, locale as Locale);

  if (!content) notFound();

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Anchor href={`/${locale}/posts`} size="sm">
          ← {locale === "he" ? "חזרה לבלוג" : "Back"}
        </Anchor>
        {content.metadata.title && (
          <Title order={1}>{content.metadata.title}</Title>
        )}
        {content.metadata.date && (
          <Text size="sm" c="dimmed">
            {content.metadata.date}
          </Text>
        )}
        {content.metadata.author && (
          <Text size="sm" c="dimmed" tt="uppercase">
            {content.metadata.author}
          </Text>
        )}
        <ContentRenderer hast={content.hast} />
      </Stack>
    </Container>
  );
}
