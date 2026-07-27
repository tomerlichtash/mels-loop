import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import Image from 'next/image';

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
					<Image
						src={source.url}
						alt={source.title}
						width={600}
						height={300}
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
						<dd>{source.license}</dd>
					</>
				)}
			</dl>
			{/*
			 * No link out. The catalogue pages this pointed at are hidden for
			 * now, and a "View source →" that 404s is worse than none. The
			 * metadata above still names author, credit and licence, which is
			 * what attribution requires.
			 */}
		</div>
	);
}
