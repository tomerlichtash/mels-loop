import type { SourceType } from '@mels-loop/content-pipeline/types';

import styles from './SourceBadge.module.css';

const TYPE_LABELS: Record<SourceType, string> = {
	image: 'Image',
	pdf: 'PDF',
	audio: 'Audio',
	video: 'Video',
	link: 'Link',
	text: 'Text',
	archive: 'Archive',
	other: 'Other',
};

interface SourceBadgeProps {
	type: SourceType;
}

export function SourceBadge({ type }: SourceBadgeProps) {
	return (
		<span className={styles.root} data-type={type}>
			{TYPE_LABELS[type] ?? type}
		</span>
	);
}
