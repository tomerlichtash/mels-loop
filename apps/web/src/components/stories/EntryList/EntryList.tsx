import { Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import styles from './EntryList.module.css';

export interface EntryListItem {
	slug: string;
	title: string;
	author?: string;
	abstract?: string;
	date?: string;
}

interface EntryListProps {
	items: EntryListItem[];
	/** Built per item as `${hrefBase}/${slug}`. */
	hrefBase: string;
}

/**
 * A story's articles and documents are a reading sequence, not a gallery, so
 * they read as an ordered list rather than a grid of cards. Cards existed to
 * let an image do the discriminating; none of these entries have one.
 */
export function EntryList({ items, hrefBase }: EntryListProps) {
	return (
		<ul className={styles.root}>
			{items.map((item) => (
				<li key={item.slug} className={styles.item}>
					<Link href={`${hrefBase}/${item.slug}`} className={styles.link}>
						<Text variant="h3" className={styles.title}>
							{item.title}
						</Text>
					</Link>
					{(item.author || item.date) && (
						<p className={styles.meta}>
							{item.author}
							{item.author && item.date && (
								<span className={styles.metaSeparator} aria-hidden="true">
									·
								</span>
							)}
							{item.date && (
								<time dateTime={new Date(item.date).toISOString()}>
									{new Date(item.date).getFullYear()}
								</time>
							)}
						</p>
					)}
					{item.abstract && <p className={styles.abstract}>{item.abstract}</p>}
				</li>
			))}
		</ul>
	);
}
