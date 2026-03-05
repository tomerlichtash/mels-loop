import type { ReactNode } from 'react';

import styles from './StoryPanel.module.css';

interface StoryPanelProps {
	children: ReactNode;
}

export function StoryPanel({ children }: StoryPanelProps) {
	return (
		<div className={styles.root}>
			<div className={styles.inner}>{children}</div>
		</div>
	);
}
