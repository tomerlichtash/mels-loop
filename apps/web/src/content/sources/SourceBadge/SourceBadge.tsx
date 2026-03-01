import type { SourceType } from '@mels-loop/content/types';
import { Badge } from '@mels-loop/ui/primitives';

import { SOURCE_TYPE_LABELS } from '../source-types';
import styles from './SourceBadge.module.css';

interface SourceBadgeProps {
	type: SourceType;
}

export function SourceBadge({ type }: SourceBadgeProps) {
	return (
		<Badge
			radius="sm"
			bordered
			className={styles.badge}
			data-source-type={type}
		>
			{SOURCE_TYPE_LABELS[type] ?? type}
		</Badge>
	);
}
