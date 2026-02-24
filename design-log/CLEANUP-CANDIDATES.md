# Rewrite Branch: Cleanup Candidates

Audit of the `rewrite` branch identifying leftover, unused, or legacy code from previous implementations.

---

## Orphaned / Dead Code

### 1. ScrambleText — Orphaned component

- **File:** `apps/web/src/app/[locale]/ScrambleText.tsx`
- **What:** Text scramble animation component (88 lines)
- **Evidence:** Exported but zero imports anywhere in the codebase

### 2. FaviconAnimator — Disabled feature

- **Files:**
  - `apps/web/src/components/FaviconAnimator.tsx`
  - `apps/web/src/components/favicon-animator.ts`
- **What:** Animates the browser favicon
- **Evidence:** Import commented out in `layout.tsx:14`, usage commented out at `layout.tsx:59`

---

## Unimplemented Feature Scaffolding

### 3. Tags feature — Empty directory + spec with no implementation

- **Files:**
  - `apps/web/src/app/[locale]/tags/` (empty dir with empty `[tagSlug]/` subdir)
  - `TAGS_FEATURE.md` (project root)
- **What:** Spec references loaders, pages, and i18n keys that don't exist
- **Evidence:** No `page.tsx`, no loader, no nav link, no translation keys

---

## Commented-Out Code

### 4. GlyphShift — Old animation approach

- **Location:** `apps/web/src/components/GlyphShift/GlyphShift.tsx:150-153`
- **What:** 4 commented-out lines of an alternative opacity/transition animation, replaced by transform-based approach

### 5. FaviconAnimator references in layout

- **Location:** `apps/web/src/app/[locale]/layout.tsx:14,59`
- **What:** Commented-out import and JSX usage of FaviconAnimator (related to item 2)

---

## Design / Planning Documents

### 6. `design-log/` directory — Planning docs

- `BREADCRUMB-PLAN.md`
- `COMPONENT-GUIDE.md`
- `IMPLEMENTATION-PLAN.md`
- `MONOREPO-PLAN.md`
- `PRIMITIVE-REFACTOR-PLAN.md`
- `PROJECT-ARCHITECTURE.md`
- `REWRITE-PLAN.md`
- `SEARCH-PLAN.md`
- `TOKEN-GUIDE.md`
- `token-utilization-plan.md`
- `sources-system.md`

Some may be outdated relative to current implementation.

---

## Investigated & Confirmed Active

| Item | Why it stays |
| --- | --- |
| `parse_mode` | Used in codex frontmatter → `base.ts` → `pipeline.ts` → `remark-verse.ts` for verse/poetry rendering |
| All 12 remark/rehype plugins | All wired into `pipeline.ts` |
| All content loaders | All imported in app pages |
| `next.config.ts` redirects (`/docs/…`) | SEO backwards-compat, intentional |
| InternalLink, NavBar, useContent, SourceDetail | Internal components used within annotation/popover system |
| GlyphShift component | Used on home page (`page.tsx`) |
| `content-init.ts` | Used in `layout.tsx` and `sitemap.ts` |
