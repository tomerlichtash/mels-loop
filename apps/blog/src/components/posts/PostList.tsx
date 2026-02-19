import { Stack } from "@mels-loop/ui/primitives";
import { PostCard } from "./PostCard";
import type { ContentMetadata } from "@mels-loop/content-pipeline/types";

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
