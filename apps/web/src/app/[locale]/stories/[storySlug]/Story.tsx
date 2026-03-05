import type { ReactNode } from 'react';

import styles from './Story.module.css';

interface StoryProps {
	children: ReactNode;
	sidebar: ReactNode;
}

export function Story({ children, sidebar }: StoryProps) {
	return (
		<div className={styles.root}>
			<div className={styles.layout}>
				<main className={styles.content}>{children}</main>
				<aside className={styles.sidebar}>{sidebar}</aside>
			</div>
		</div>
	);
}
