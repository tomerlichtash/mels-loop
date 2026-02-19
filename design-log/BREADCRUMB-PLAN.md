# Plan: Breadcrumb System for `apps/web`

## Context

The web app has no breadcrumb navigation. Pages like glossary terms, story articles, and codex sub-pages are nested 3-4 levels deep with no way to navigate back up the hierarchy (the glossary term page has a hardcoded "← Back to Glossary" link, but that's it). Adding breadcrumbs provides consistent hierarchical navigation across all pages.

## Approach

A `Breadcrumb` component in `packages/ui/` built on Mantine's `Breadcrumbs`. Each page composes its own breadcrumb items from data already in scope (params, config, dict) — no URL parsing or client-side route detection.

### 1. Add missing i18n keys

Add `nav.articles` and `nav.codex` to both locale files. All other labels (`nav.home`, `nav.about`, `nav.contact`, `nav.contribute`, `nav.glossary`, `nav.resources`) already exist.

**Edit:** `packages/i18n/src/messages/en.json` — add to `nav`:

```json
"articles": "Articles",
"codex": "Codex"
```

**Edit:** `packages/i18n/src/messages/he.json` — add to `nav`:

```json
"articles": "מאמרים",
"codex": "קודקס"
```

### 2. Create `Breadcrumb` component

**Create:** `packages/ui/src/shell/Breadcrumb.tsx`

```tsx
import { Breadcrumbs, Anchor, Text } from '@mantine/core';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
	if (items.length <= 1) return null;
	return (
		<Breadcrumbs mb="md">
			{items.map((item, index) =>
				index === items.length - 1 || !item.href ? (
					<Text key={index} size="sm" c="dimmed">
						{item.label}
					</Text>
				) : (
					<Anchor key={index} href={item.href} size="sm">
						{item.label}
					</Anchor>
				),
			)}
		</Breadcrumbs>
	);
}
```

- Returns `null` when ≤1 item (home page gets no breadcrumb)
- Last item renders as non-linked dimmed text
- Mantine handles separator and RTL automatically

**Edit:** `packages/ui/src/shell/index.ts` — add export

### 3. Create breadcrumb helper

**Create:** `apps/web/src/lib/breadcrumbs.ts`

```ts
import type { BreadcrumbItem } from '@mels-loop/ui/shell';

export function homeItem(locale: string, homeLabel: string): BreadcrumbItem {
	return { label: homeLabel, href: `/${locale}` };
}

/** Safely resolve a dot-notation key from the dict */
export function dictGet(dict: Record<string, unknown>, key: string): string {
	const parts = key.split('.');
	let current: unknown = dict;
	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = (current as Record<string, unknown>)[part];
		} else return key;
	}
	return typeof current === 'string' ? current : key;
}
```

The `dictGet` helper avoids repeating the verbose type-narrowing pattern used in existing pages (e.g. `typeof dict === "object" && dict !== null && "nav" in dict && ...`).

### 4. Add `breadcrumbs` prop to `ArticleLayout`

**Edit:** `apps/web/src/components/story/ArticleLayout.tsx`

Add optional `breadcrumbs?: BreadcrumbItem[]` prop. Render `<Breadcrumb items={breadcrumbs} />` before the title inside the existing `<Stack>`.

### 5. Wire breadcrumbs into each page

#### Static pages (about, contribute)

Already have `dict`. Add `Breadcrumb` + `homeItem` before `<Title>`:

- `Home > About`
- `Home > Contribute`

**Edit:** `apps/web/src/app/[locale]/about/page.tsx`
**Edit:** `apps/web/src/app/[locale]/contribute/page.tsx`

#### Contact page

Currently just delegates to `<ContactPage>`. Wrap with a container for the breadcrumb above:

- `Home > Contact`

**Edit:** `apps/web/src/app/[locale]/contact/page.tsx` — add `getDictionary`, render breadcrumb in a `Container` before `<ContactPage>`

#### Glossary index

Already has `dict`:

- `Home > Glossary`

**Edit:** `apps/web/src/app/[locale]/glossary/page.tsx`

#### Glossary term

Add `getDictionary`. Remove the hardcoded "← Back to Glossary" link (breadcrumb replaces it):

- `Home > Glossary > [Term Name]`

**Edit:** `apps/web/src/app/[locale]/glossary/[termSlug]/page.tsx`

#### Story landing

Add `getDictionary`:

- `Home > [Story Title]`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/page.tsx`

#### Articles listing

Add `getDictionary`:

- `Home > [Story Title] > Articles`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/articles/page.tsx`

#### Single article (via ArticleLayout)

Add `getStoryConfig` to `Promise.all`, add `getDictionary`, pass `breadcrumbs` prop:

- `Home > [Story Title] > Articles > [Article Title]`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/articles/[articleSlug]/page.tsx`

#### Codex root (via ArticleLayout)

Add `getStoryConfig` to `Promise.all`, add `getDictionary`, pass `breadcrumbs` prop:

- `Home > [Story Title] > Codex`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/codex/page.tsx`

#### Codex sub-page (via ArticleLayout)

Add `getStoryConfig`, add `getDictionary`, pass `breadcrumbs` prop:

- `Home > [Story Title] > Codex > [Page Title]`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/codex/[pageSlug]/page.tsx`

#### Resources

Add `getStoryConfig`, add `getDictionary`:

- `Home > [Story Title] > Resources`

**Edit:** `apps/web/src/app/[locale]/stories/[storySlug]/resources/page.tsx`

## Files summary

| Action     | File                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| **Create** | `packages/ui/src/shell/Breadcrumb.tsx`                                          |
| **Create** | `apps/web/src/lib/breadcrumbs.ts`                                               |
| **Edit**   | `packages/ui/src/shell/index.ts`                                                |
| **Edit**   | `packages/i18n/src/messages/en.json`                                            |
| **Edit**   | `packages/i18n/src/messages/he.json`                                            |
| **Edit**   | `apps/web/src/components/story/ArticleLayout.tsx`                               |
| **Edit**   | `apps/web/src/app/[locale]/about/page.tsx`                                      |
| **Edit**   | `apps/web/src/app/[locale]/contact/page.tsx`                                    |
| **Edit**   | `apps/web/src/app/[locale]/contribute/page.tsx`                                 |
| **Edit**   | `apps/web/src/app/[locale]/glossary/page.tsx`                                   |
| **Edit**   | `apps/web/src/app/[locale]/glossary/[termSlug]/page.tsx`                        |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/page.tsx`                        |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/articles/page.tsx`               |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/articles/[articleSlug]/page.tsx` |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/codex/page.tsx`                  |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/codex/[pageSlug]/page.tsx`       |
| **Edit**   | `apps/web/src/app/[locale]/stories/[storySlug]/resources/page.tsx`              |

## Verification

1. `pnpm build --filter @mels-loop/web` — builds without errors
2. `pnpm dev --filter @mels-loop/web` — manually verify breadcrumbs on:
   - `/en/about` → `Home > About`
   - `/en/glossary` → `Home > Glossary`
   - `/en/glossary/[term]` → `Home > Glossary > [Term]`
   - `/en/stories/[story]` → `Home > [Story Title]`
   - `/en/stories/[story]/articles/[article]` → `Home > [Story Title] > Articles > [Article Title]`
   - `/he/about` → RTL breadcrumbs with Hebrew labels
3. Verify Home crumb links back to `/{locale}`
4. Verify last crumb is not a link
