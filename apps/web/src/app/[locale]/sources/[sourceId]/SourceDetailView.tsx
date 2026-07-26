import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import Image from 'next/image';

import styles from './page.module.css';

const LICENSE_LABELS: Record<string, string> = {
	'public-domain': 'Public Domain',
	'cc-by': 'CC BY',
	'cc-by-sa': 'CC BY-SA',
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

/**
 * The record itself: the picture, and the archive's account of it.
 *
 * Everything the page knew used to arrive as one stack — image, description,
 * a definition list of metadata, a link out — which read as a pile of facts
 * rather than as a document. The catalogue data now sits in the rail (see
 * SourceMeta) and this column holds the record and what it is, in that order.
 */
export function SourceMedia({ source }: { source: ResolvedSource }) {
	return (
		<div className={styles.media}>
			{source.type === 'image' && source.url && (
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
}: {
	source: ResolvedSource;
	labels: SourceLabels;
}) {
	const rows: [string, string][] = (
		[
			[labels.author, source.author],
			[labels.date, source.date],
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
			{source.page && (
				<a href={source.page} className={styles.metaLink}>
					{labels.transcription}
				</a>
			)}

			{/* An image is opened by clicking it; everything else needs a way
			    through to the original. */}
			{source.url && source.type !== 'image' && (
				<a
					href={source.url}
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
