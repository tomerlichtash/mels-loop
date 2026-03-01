import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import Image from 'next/image';

import { SourceBadge } from '@/content';

import styles from './page.module.css';

const LICENSE_LABELS: Record<string, string> = {
	'public-domain': 'Public Domain',
	'cc-by': 'CC BY',
	'cc-by-sa': 'CC BY-SA',
	'fair-use': 'Fair Use',
	'all-rights-reserved': 'All Rights Reserved',
	unknown: 'Unknown',
};

interface SourceDetailViewProps {
	source: ResolvedSource;
}

export function SourceDetailView({ source }: SourceDetailViewProps) {
	return (
		<div className={styles.detail}>
			<div className={styles.badge}>
				<SourceBadge type={source.type} />
			</div>
			{source.type === 'image' && source.url && (
				<div className={styles.imageWrap}>
					<Image
						src={source.url}
						alt={source.title}
						width={800}
						height={400}
						className={styles.image}
					/>
				</div>
			)}
			{source.description && (
				<p className={styles.description}>{source.description}</p>
			)}
			<dl className={styles.meta}>
				{source.author && (
					<>
						<dt>Author</dt>
						<dd>{source.author}</dd>
					</>
				)}
				{source.date && (
					<>
						<dt>Date</dt>
						<dd>{source.date}</dd>
					</>
				)}
				{source.credit && (
					<>
						<dt>Credit</dt>
						<dd>{source.credit}</dd>
					</>
				)}
				{source.license && (
					<>
						<dt>License</dt>
						<dd>{LICENSE_LABELS[source.license] ?? source.license}</dd>
					</>
				)}
			</dl>
			{source.url && (
				<a
					href={source.url}
					className={styles.externalLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					{source.type === 'image' ? 'View full image' : 'Open source'} ↗
				</a>
			)}
		</div>
	);
}
