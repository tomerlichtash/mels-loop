import '../content-init';

import type { MetadataRoute } from 'next';

import { buildSitemapEntries } from '../lib/sitemap';

const BASE_URL = process.env.SITE_URL ?? 'https://melsloop.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return buildSitemapEntries(BASE_URL);
}
