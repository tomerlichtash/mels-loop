import type { ResolvedSource } from '@mels-loop/content-pipeline/types';

import { SourceBadge } from '../SourceBadge/SourceBadge';
import styles from './SourceDetail.module.css';

interface SourceDetailProps {
	source: ResolvedSource;
}

export function SourceDetail({ source }: SourceDetailProps) {
	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<SourceBadge type={source.type} />
				<p className={styles.title}>{source.title}</p>
			</div>
			{source.type === 'image' && source.url && (
				<div className={styles.imageWrap}>
					<img src={source.url} alt={source.title} className={styles.image} />
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
						<dd>{source.license}</dd>
					</>
				)}
			</dl>
			<a href={`/sources/${source.id}`} className={styles.openLink}>
				{source.type === 'image' ? 'View full image' : 'View source'} →
			</a>
		</div>
	);
}
