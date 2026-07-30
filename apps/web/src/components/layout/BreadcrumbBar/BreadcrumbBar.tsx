import type { ReactNode } from 'react';

import styles from './BreadcrumbBar.module.css';

interface BreadcrumbBarProps {
	children: ReactNode;
}

/**
 * The sticky bar under the site header that carries the breadcrumb trail.
 *
 * Was StoryPanel, and lived with the story components, because the story
 * layout was the only thing using it — so every other page that has a trail
 * rendered it loose in the content column instead: the stories index, the
 * sources browser and a source's own page, the glossary and its terms. The
 * same trail, in two different places, depending which route you were on.
 */
export function BreadcrumbBar({ children }: BreadcrumbBarProps) {
	return (
		<div className={styles.root}>
			<div className={styles.inner}>{children}</div>
		</div>
	);
}
