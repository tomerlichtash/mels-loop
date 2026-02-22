#!/usr/bin/env tsx
/**
 * Writes a static sitemap.xml to apps/web/public/.
 * Run: pnpm sitemap (from apps/web) or pnpm --filter @mels-loop/web sitemap (from root)
 */
import { setContentDir } from '@mels-loop/content-pipeline/loaders';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { buildSitemapEntries, toSitemapXml } from '../src/lib/sitemap.js';

// ESM equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.SITE_URL ?? 'https://melsloop.com';
const OUTPUT_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const CONTENT_DIR = path.resolve(__dirname, '../../../content');

// Must be called before any content loaders are used
setContentDir(CONTENT_DIR);

const entries = await buildSitemapEntries(BASE_URL);
await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await fs.writeFile(OUTPUT_PATH, toSitemapXml(entries), 'utf-8');
console.log(`Wrote ${entries.length} URLs to ${OUTPUT_PATH}`);
