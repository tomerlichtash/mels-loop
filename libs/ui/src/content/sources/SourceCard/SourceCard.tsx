import type { ResolvedSource } from '@mels-loop/content-pipeline/types';

import { SourceDetail } from '../SourceDetail/SourceDetail';
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
				<SourceDetail source={source} />
			</div>
		</div>
	);
}
