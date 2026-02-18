import { Container, Title, Text, Stack, Box } from "@mantine/core";
import type { ProcessedContent } from "@/lib/content/types";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { AnnotationProvider } from "@/components/content/AnnotationProvider";
import { AnnotationAwareLink } from "@/components/content/AnnotationAwareLink";
import styles from "./ArticleLayout.module.css";

interface ArticleLayoutProps {
  content: ProcessedContent;
  annotations?: Record<string, ProcessedContent>;
  glossary?: Record<string, ProcessedContent>;
  children?: React.ReactNode;
}

export function ArticleLayout({
  content,
  annotations = {},
  glossary = {},
  children,
}: ArticleLayoutProps) {
  const { metadata, hast } = content;

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        {metadata.title && <Title order={1}>{metadata.title}</Title>}
        {metadata.abstract && (
          <Text size="lg" c="dimmed" fs="italic">
            {metadata.abstract}
          </Text>
        )}
        {metadata.moto && (
          <Text size="sm" c="dimmed" fs="italic">
            {metadata.moto}
          </Text>
        )}
        {metadata.credits && (
          <Text size="xs" c="dimmed">
            {metadata.credits}
          </Text>
        )}
        {metadata.author && (
          <Text size="sm" c="dimmed" tt="uppercase">
            {metadata.author}
          </Text>
        )}
        <Box className={styles.articleBody}>
          <AnnotationProvider annotations={annotations} glossary={glossary}>
            <ContentRenderer
              hast={hast}
              components={{ a: AnnotationAwareLink }}
            />
          </AnnotationProvider>
        </Box>
        {children}
      </Stack>
    </Container>
  );
}
