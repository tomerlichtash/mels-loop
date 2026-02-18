import { Stack } from "@mantine/core";
import { PostCard } from "./PostCard";
import type { ContentMetadata } from "@/lib/content/types";

interface PostListProps {
  posts: Array<{ slug: string; metadata: ContentMetadata }>;
  locale: string;
}

export function PostList({ posts, locale }: PostListProps) {
  return (
    <Stack gap="sm">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          locale={locale}
          title={post.metadata.title}
          date={post.metadata.date}
        />
      ))}
    </Stack>
  );
}
