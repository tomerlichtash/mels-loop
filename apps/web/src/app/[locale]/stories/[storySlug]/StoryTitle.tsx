'use client';

import { Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './StoryHeader.module.css';

interface StoryTitleProps {
	href: string;
	children: ReactNode;
}

export function StoryTitle({ href, children }: StoryTitleProps) {
	const segment = useSelectedLayoutSegment();
	const isHome = segment === null;

	if (isHome) {
		return (
			<Text variant="h1" className={styles.title}>
				{children}
			</Text>
		);
	}

	return (
		<Link href={href} className={styles.titleLink}>
			<Text variant="h1" className={styles.title}>
				{children}
			</Text>
		</Link>
	);
}
