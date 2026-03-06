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

### Upload files

```bash
pnpm s3:upload <path> [path ...] [--tags tag1 [tag2...]]
```

Uploads one or more files to the configured S3 bucket. Fails if a file with the same name already exists. Optionally tags uploaded objects.

### List media

```bash
pnpm s3:list
```

Lists all objects in the configured S3 bucket with name, size, and URL.

## Tests

```bash
pnpm --filter @mels-loop/scripts test
```
