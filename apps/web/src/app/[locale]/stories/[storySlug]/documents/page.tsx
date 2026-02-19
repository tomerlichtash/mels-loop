import { Title, Stack, Card, Group, Text } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import { getStoryConfig, getDocumentMeta } from "@mels-loop/content-pipeline/loaders";
import { homeItem, dictGet } from "@/lib/breadcrumbs";
import { StoryShell } from "@/components/story/StoryShell";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function DocumentsListingPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const typedLocale = locale as Locale;
  const [config, dict, documentsMeta] = await Promise.all([
    getStoryConfig(storySlug),
    getDictionary(typedLocale),
    getDocumentMeta(storySlug, typedLocale),
  ]);

  const storyTitle = config.title[typedLocale];
  const documentsLabel = dictGet(dict as Record<string, unknown>, "nav.documents");

  return (
    <StoryShell
      storySlug={storySlug}
      locale={typedLocale}
      activePath="documents"
      breadcrumbs={[
        homeItem(locale, dictGet(dict as Record<string, unknown>, "nav.home")),
        { label: storyTitle, href: `/stories/${storySlug}` },
        { label: documentsLabel },
      ]}
    >
      <Stack gap="lg">
        <Title order={1}>{documentsLabel} &mdash; {storyTitle}</Title>
        {documentsMeta.map((doc) => (
          <Card key={doc.slug} withBorder padding="md">
            <Group justify="space-between">
              <div>
                <Text weight={500} component="span">
                  {doc.title}
                </Text>
                {doc.author && (
                  <Text size="sm" color="dimmed">{doc.author}</Text>
                )}
              </div>
              <a href={`/stories/${storySlug}/documents/${doc.slug}`}>
                Read
              </a>
            </Group>
          </Card>
        ))}
      </Stack>
    </StoryShell>
  );
}
