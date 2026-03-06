# @mels-loop/scripts

CLI utilities for managing media assets on S3.

## Setup

Create a `.env` file in this directory:

```env
AWS_BUCKET=...
AWS_REGION=...
```

AWS credentials are resolved via the default SDK credential chain (`~/.aws/credentials`, environment variables, etc.). You can optionally add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to `.env` to override.

## Commands

### Upload

```bash
pnpm s3:upload <path> [path ...] [--tags tag1 [tag2...]]
```

Uploads files or directories to the configured S3 bucket. Directories are traversed recursively and folder structure is preserved as S3 key prefixes. Fails if an object with the same key already exists. Optionally tags uploaded objects.

### Download

```bash
pnpm s3:download [output-dir]
```

Downloads all objects from the bucket. Defaults to `apps/web/public/media/` for local development. Supports pagination for buckets with more than 1000 objects.

### Delete

```bash
pnpm s3:delete <key> [key ...] [--prefix <prefix>]
```

Deletes objects by exact key or by prefix (folder). Supports multiple keys and `--prefix` flags in a single command. Handles batching for large deletions.

### List

```bash
pnpm s3:list
```

Lists all objects in the configured S3 bucket with name, size, and URL.

## Tests

```bash
pnpm --filter @mels-loop/scripts test
```
