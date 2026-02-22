import { Container } from '@mels-loop/ui/primitives';
import type { ReactNode } from 'react';

import styles from './Story.module.css';

interface StoryProps {
	children: ReactNode;
	sidebar: ReactNode;
}

export function Story({ children, sidebar }: StoryProps) {
	return (
		<Container>
			<div className={styles.layout}>
				<main className={styles.content}>{children}</main>
				<aside className={styles.sidebar}>{sidebar}</aside>
			</div>
		</Container>
	);
}
