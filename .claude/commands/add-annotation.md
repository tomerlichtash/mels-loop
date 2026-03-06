Add an annotation to a story.

## Input

- **story**: Story slug (e.g. `a-story-about-magic`) — required
- **id**: Annotation slug (e.g. `gls`) — required
- **text**: The text/term being annotated — required
- **en**: English annotation content — required
- **he**: Hebrew annotation content — required
- **source_url**: Optional source URL for the annotation
- **source_name**: Optional source name (defaults to URL domain)

## Steps

1. Create `content/stories/{story}/annotations/{id}/index.en.md` with frontmatter (`source_url`, `source_name` if provided) and English content.
2. Create `content/stories/{story}/annotations/{id}/index.he.md` with the same frontmatter and Hebrew content.
3. Find the annotated text in the English codex (`content/stories/{story}/codex/index.en.md`) and add `[^](annotations/{id})` immediately after it.
4. Find the equivalent text in the Hebrew codex (`content/stories/{story}/codex/index.he.md`) and add `[^](annotations/{id})` immediately after it.

## Annotation file format

```markdown
---
source_url: {source_url}
source_name: {source_name}
---

{content}
```

If no `source_url` is provided, omit the frontmatter entirely (no empty `---` block).

## Rules

- Never duplicate an existing annotation — check if `annotations/{id}/` already exists first.
- The `[^](annotations/{id})` link should be placed right after the annotated word/phrase, with no space before the `[^]`.
- Both EN and HE codex files must get the annotation link.
- Keep annotation content concise — 1-2 sentences.

## Usage

```
/add-annotation story=a-story-about-magic id=gls text="GLS" en="Guy L. Steele Jr. is an American computer scientist..." he="גאי ל. סטיל ג׳וניור הוא מדען מחשב..." source_url=https://en.wikipedia.org/wiki/Guy_L._Steele_Jr.
```
