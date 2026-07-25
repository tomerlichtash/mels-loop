# Architecture

Load the chapter that matches what you are about to do. Don't read them all.

| If you are… | Read |
|---|---|
| Adding or changing a remark/rehype plugin, touching how markdown becomes HTML, adding a directive, or debugging why content renders oddly | [01 — Content pipeline](./01-content-pipeline.md) |
| Writing CSS, adding a component, picking a colour or a size, working on dark mode, or fixing something that looks wrong in Hebrew | [02 — Styling and tokens](./02-styling-tokens.md) |
| Adding a route, changing what is static vs dynamic, touching the locale middleware, or working on sticky chrome | [03 — Routing and locale](./03-routing-locale.md) |

Three chapters, because three is what has earned its place. Add a fourth when a
session actually needs one — not in advance.

## The short version

Markdown in `content/` is the source of truth; the code serves it. A story is a
folder with a `story.json` and adding one requires no code changes.

The site is bilingual (English and Hebrew, RTL) at equal depth, which is the
constraint that shapes the most decisions — see chapter 02 for what that means
in CSS and chapter 03 for what it means in URLs.

Content is loaded and rendered at build time. Annotations, glossary terms and
sources are embedded in page props, so popovers open instantly with no fetch.
