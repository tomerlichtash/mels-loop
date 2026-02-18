import { Container, Title, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { getAllPosts, getPost } from "@/lib/content/loaders";
import { PostList } from "@/components/posts/PostList";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PostsListingPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const slugs = await getAllPosts();

  // Load metadata for all posts
  const posts = (
    await Promise.all(
      slugs.map(async (slug) => {
        const content = await getPost(slug, locale as Locale);
        return content ? { slug, metadata: content.metadata } : null;
      })
    )
  )
    .filter(Boolean)
    .reverse(); // Reverse chronological

  const title =
    typeof dict === "object" &&
    dict !== null &&
    "nav" in dict &&
    typeof dict.nav === "object" &&
    dict.nav !== null &&
    "blog" in dict.nav
      ? String(dict.nav.blog)
      : "Blog";

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>{title}</Title>
        <PostList posts={posts as Array<{ slug: string; metadata: { title?: string; date?: string } }>} locale={locale} />
      </Stack>
    </Container>
  );
}
