import type { ResolvedSource } from '@mels-loop/content-pipeline/types';

import { SourceBadge } from '../SourceBadge/SourceBadge';
import styles from './SourceCard.module.css';

interface SourceCardProps {
	source: ResolvedSource;
}

export function SourceCard({ source }: SourceCardProps) {
	return (
		<div className={styles.root}>
			{source.type === 'image' && source.url && (
				<div className={styles.thumbnail}>
					<img
						src={source.url}
						alt={source.title}
						className={styles.thumbnailImage}
					/>
				</div>
			)}
			<div className={styles.body}>
				<div className={styles.header}>
					<SourceBadge type={source.type} />
					<p className={styles.title}>{source.title}</p>
				</div>
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
				<a
					href={source.url}
					className={styles.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					Open source ↗
				</a>
			</div>
		</div>
	);
}
