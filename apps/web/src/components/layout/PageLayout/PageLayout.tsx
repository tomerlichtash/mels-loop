import type { ReactNode } from 'react';

import styles from './PageLayout.module.css';

interface PageLayoutProps {
	children: ReactNode;
	/** Rendered in a sticky rail beside the content. Omitted, the content runs full width. */
	sidebar?: ReactNode;
}

/**
 * The site's reading layout: a content column with an optional sticky rail.
 *
 * The story routes have had this for a while as StoryLayout, which also
 * decides from the route segment whether a sidebar belongs on the page and
 * offsets its rail by the height of the section tabs. Neither concern applies
 * anywhere else, and every other page that wants a column and a rail — a
 * source's record, to begin with — needs the grid without them.
 *
 * A server component, deliberately: there is no state here, and the story
 * variant is a client component only because it reads the router.
 */
export function PageLayout({ children, sidebar }: PageLayoutProps) {
	if (!sidebar) {
		return <main className={styles.plain}>{children}</main>;
	}

	return (
		<div className={styles.layout}>
			<main className={styles.content}>{children}</main>
			<aside className={styles.sidebar}>{sidebar}</aside>
		</div>
	);
}
