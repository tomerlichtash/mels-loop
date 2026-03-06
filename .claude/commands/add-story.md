Add a new story to the content system.

## Input

- **slug**: URL-friendly story slug (e.g. `always-mount-a-scratch-monkey`) — required
- **title_en**: English title — required
- **title_he**: Hebrew title — required
- **abstract_en**: English abstract (1 sentence) — required
- **abstract_he**: Hebrew abstract (1 sentence) — required
- **codex_en**: English codex content (the story text) — required
- **codex_he**: Hebrew codex content — required
- **parse_mode**: Optional, e.g. `verse` for line-break preservation
- **featured**: Optional, defaults to `false`

## Steps

1. Create `content/stories/{slug}/story.json` with the story configuration.
2. Create `content/stories/{slug}/codex/index.en.md` with English frontmatter and content.
3. Create `content/stories/{slug}/codex/index.he.md` with Hebrew frontmatter and content.

## File formats

### story.json

```json
{
  "slug": "{slug}",
  "title": {
    "en": "{title_en}",
    "he": "{title_he}"
  },
  "abstract": {
    "en": "{abstract_en}",
    "he": "{abstract_he}"
  },
  "featured": false,
  "sections": [],
  "articles": []
}
```

### codex/index.{locale}.md

```markdown
---
title: "{title}"
parse_mode: "{parse_mode}"
---

{content}
```

Omit `parse_mode` from frontmatter if not specified.

## Rules

- Check that `content/stories/{slug}/` doesn't already exist.
- Use content directives where appropriate:
  - `:::email-header` / `:::` for email metadata (Date/From/To/Re fields)
  - `:::chat` / `:::` for dialog/chat sequences (one `Name: Message` per line)
- If sources are provided, create them with `/add-source` and add their IDs to the `sources` array in `story.json`.
- Keep abstracts concise — one sentence describing the story's theme.
- Do not add `sections` entries unless the story has corresponding content directories (articles, documents, resources).

## Usage

```
/add-story slug=a-story-about-magic title_en="A Story About 'Magic'" title_he="סיפור על ״קסם״" abstract_en="A mysterious switch..." abstract_he="מתג מסתורי..." codex_en="Some years ago..." codex_he="לפני כמה שנים..."
```
