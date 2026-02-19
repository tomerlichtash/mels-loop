import type { ReactNode } from "react";
import { Container } from "@mels-loop/ui/primitives";
import { Breadcrumb } from "@mels-loop/ui/shell";
import type { BreadcrumbItem } from "@mels-loop/ui/shell";
import type { Locale } from "@mels-loop/i18n/config";
import type { ArticleMeta } from "@mels-loop/content-pipeline/types";
import { getStoryConfig, getArticleMeta, getDocumentMeta } from "@mels-loop/content-pipeline/loaders";
import styles from "./StoryShell.module.css";

const sectionLabels: Record<string, Record<string, string>> = {
  articles: { en: "Articles", he: "מאמרים" },
  codex: { en: "Codex", he: "קודקס" },
  documents: { en: "Documents", he: "מסמכים" },
  resources: { en: "Resources", he: "מקורות" },
};

interface StoryShellProps {
  storySlug: string;
  locale: Locale;
  breadcrumbs: BreadcrumbItem[];
  /** Current path segment to highlight in the sidebar, e.g. "articles/mel-kaye-cv" or "resources" */
  activePath?: string;
  children: ReactNode;
}

function SidebarItems({ items, storySlug, section, activePath }: {
  items: ArticleMeta[];
  storySlug: string;
  section: string;
  activePath?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={styles.sidebarList}>
      {items.map((item) => {
        const isActive = activePath === `${section}/${item.slug}`;
        return (
          <li key={item.slug}>
            <a
              href={`/stories/${storySlug}/${section}/${item.slug}`}
              className={`${styles.sidebarLink}${isActive ? ` ${styles.active}` : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.title}
            </a>
            {item.author && (
              <span className={styles.sidebarAuthor}>{item.author}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export async function StoryShell({ storySlug, locale, breadcrumbs, activePath, children }: StoryShellProps) {
  const [config, articlesMeta, documentsMeta] = await Promise.all([
    getStoryConfig(storySlug),
    getArticleMeta(storySlug, locale),
    getDocumentMeta(storySlug, locale),
  ]);

  const metaBySection: Record<string, ArticleMeta[]> = {
    articles: articlesMeta,
    documents: documentsMeta,
  };

  return (
    <Container size="md">
      <Breadcrumb items={breadcrumbs} />

      <div className={styles.layout}>
        <main className={styles.content}>
          {children}
        </main>

        <aside className={styles.sidebar}>
          {config.sections.map((section) => (
            <div key={section} className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>
                <a
                  href={`/stories/${storySlug}/${section}`}
                  className={`${styles.sidebarTitleLink}${activePath === section ? ` ${styles.active}` : ""}`}
                >
                  {sectionLabels[section]?.[locale] || section}
                </a>
              </h3>
              {metaBySection[section] && (
                <SidebarItems
                  items={metaBySection[section]}
                  storySlug={storySlug}
                  section={section}
                  activePath={activePath}
                />
              )}
            </div>
          ))}
        </aside>
      </div>
    </Container>
  );
}
