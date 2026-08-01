import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import Image from 'next/image';

import { formatSourceDate } from '@/lib/format-date';
import { isImageUrl } from '@/lib/source-media';

import styles from './page.module.css';

const LICENSE_LABELS: Record<string, string> = {
	'public-domain': 'Public Domain',
	'cc-by': 'CC BY',
	'cc-by-sa': 'CC BY-SA',
	'cc-by-nc-sa': 'CC BY-NC-SA',
	'fair-use': 'Fair Use',
	'all-rights-reserved': 'All Rights Reserved',
	unknown: 'Unknown',
};

export interface SourceLabels {
	author: string;
	date: string;
	credit: string;
	license: string;
	openSource: string;
	transcription: string;
}

interface SourceMetaProps {
	source: ResolvedSource;
	labels: SourceLabels;
	locale: string;
	/** When the transcription is embedded in the page, the rail drops its link. */
	transcriptEmbedded?: boolean;
}

/**
 * The record itself: the picture, and the archive's account of it.
 *
 * Everything the page knew used to arrive as one stack — image, description,
 * a definition list of metadata, a link out — which read as a pile of facts
 * rather than as a document. The catalogue data now sits in the rail (see
 * SourceMeta) and this column holds the record and what it is, in that order.
 */
export function SourceMedia({
	source,
	openLabel,
}: {
	source: ResolvedSource;
	openLabel: string;
}) {
	/*
	 * The record itself, where we cannot show it inline. A document or PDF
	 * lives at its archival URL (often plain http, so an embed would be
	 * blocked as mixed content); the media slot holds the way through to it
	 * instead of sitting empty.
	 */
	const hostedImage = isImageUrl(source.url);
	const externalUrl =
		source.originUrl ?? (hostedImage ? undefined : source.url);

	return (
		<div className={styles.media}>
			{hostedImage && (
				<figure className={styles.figure}>
					{/*
					 * Opens in the lightbox, which is mounted for every page and binds
					 * to any [data-zoomable] image. It replaces a "View full image"
					 * link that navigated away to the bare file on S3 — losing the
					 * title, the credit and the way back.
					 *
					 * data-source-id is deliberately not set: it would add a "Source
					 * details" link to the lightbox pointing at this very page. The
					 * credit attributes are, so the record stays attributed while the
					 * picture is open.
					 */}
					<Image
						src={source.url}
						alt={source.title}
						width={1200}
						height={800}
						className={styles.image}
						data-zoomable=""
						{...(source.author && { 'data-source-author': source.author })}
						{...(source.credit && { 'data-source-credit': source.credit })}
						{...(source.license && { 'data-source-license': source.license })}
					/>
				</figure>
			)}
			{externalUrl && (
				<a
					href={externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.mediaLink}
				>
					{openLabel} ↗
				</a>
			)}
			{source.description && (
				<p className={styles.description}>{source.description}</p>
			)}
		</div>
	);
}

/**
 * The catalogue entry, for the rail.
 *
 * Labels come from the dictionary rather than the hardcoded English they were
 * before, which put "Author" and "License" above Hebrew values on a Hebrew
 * page.
 */
export function SourceMeta({
	source,
	labels,
	locale,
	transcriptEmbedded,
}: SourceMetaProps) {
	const rows: [string, string][] = (
		[
			[labels.author, source.author],
			[
				labels.date,
				source.date ? formatSourceDate(source.date, locale) : undefined,
			],
			[labels.credit, source.credit],
			[
				labels.license,
				source.license
					? (LICENSE_LABELS[source.license] ?? source.license)
					: undefined,
			],
		] as [string, string | undefined][]
	).filter((row): row is [string, string] => Boolean(row[1]));

	return (
		<div className={styles.meta}>
			{rows.length > 0 && (
				<dl className={styles.metaList}>
					{rows.map(([label, value]) => (
						<div key={label} className={styles.metaRow}>
							<dt className={styles.metaLabel}>{label}</dt>
							<dd className={styles.metaValue}>{value}</dd>
						</div>
					))}
				</dl>
			)}

			{/* Where the archive holds a transcription that is the thing to read,
			    and the record's own page had no way through to it. */}
			{source.page && !transcriptEmbedded && (
				<a href={source.page} className={styles.metaLink}>
					{labels.transcription}
				</a>
			)}

			{/*
			 * Where the record came from.
			 *
			 * originUrl when the record has one — for an image it is the only
			 * external link there can be, since url holds the copy we host and
			 * would open a bare file on S3. Otherwise url, which for a link-type
			 * source is already the thing itself.
			 */}
			{(source.originUrl ?? (isImageUrl(source.url) ? null : source.url)) && (
				<a
					href={source.originUrl ?? source.url}
					className={styles.metaLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					{labels.openSource} ↗
				</a>
			)}
		</div>
	);
}
