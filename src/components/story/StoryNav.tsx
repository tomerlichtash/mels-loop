"use client";

import { Group, Anchor } from "@mantine/core";
import { useTranslation } from "@/i18n/client";

interface StoryNavProps {
  storySlug: string;
  sections: string[];
}

const sectionLabels: Record<string, Record<string, string>> = {
  articles: { en: "Articles", he: "מאמרים" },
  codex: { en: "Codex", he: "קודקס" },
  resources: { en: "Resources", he: "מקורות" },
};

export function StoryNav({ storySlug, sections }: StoryNavProps) {
  const { locale } = useTranslation();

  return (
    <Group gap="lg" py="sm">
      {sections.map((section) => (
        <Anchor
          key={section}
          href={`/${locale}/stories/${storySlug}/${section}`}
          size="sm"
          fw={500}
        >
          {sectionLabels[section]?.[locale] || section}
        </Anchor>
      ))}
    </Group>
  );
}
