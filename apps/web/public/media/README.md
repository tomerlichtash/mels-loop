# Media Library

Local clone of the S3 media bucket, organized by type.

## Structure

```
media/
  images/       — photos, screenshots, scans
  documents/    — PDFs (manuals, writeups)
  covers/       — story cover images
  _junk/        — unreferenced/test files (not uploaded to S3)
```

## URL Resolution

Content files store environment-agnostic paths: `/media/images/mel-kaye-grave.jpg`

At build time, these are resolved based on `AWS_BUCKET` and `AWS_REGION` env vars (in `apps/web/.env`):

- **Both set** (prod): `/media/images/foo.jpg` → `https://{bucket}.s3.{region}.amazonaws.com/images/foo.jpg`
  - Browser fetches directly from S3, no server involvement
- **Not set** (dev): paths stay as `/media/images/foo.jpg`, served from `public/media/`

### Where resolution happens

- **Markdown images**: `rehypeMediaBaseUrl` plugin in `libs/content-plugins` rewrites `img[src]` and `a[href]` at build time
- **JSON data** (cover, avatar): `resolveMediaUrl()` from `apps/web/src/lib/media-url.ts`
- **Source URLs**: `resolveSource()` in `libs/content-loaders` resolves `source.url`

## Uploading to S3

```bash
pnpm media:upload apps/web/public/media/images
pnpm media:upload apps/web/public/media/documents
pnpm media:upload apps/web/public/media/covers
```

Files in `_junk/` are not uploaded.
