import type { ResolvedContentsEntry } from '@mels-loop/content-loaders/types';
import { Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import styles from './StoryTableOfContents.module.css';

interface StoryTableOfContentsProps {
	contents: ResolvedContentsEntry[];
}

export function StoryTableOfContents({ contents }: StoryTableOfContentsProps) {
	return (
		<nav className={styles.root}>
			{contents.map((entry) => {
				if (entry.type === 'part') {
					if (entry.collapse && entry.href) {
						return (
							<div key={entry.ref} className={styles.section}>
								<div className={styles.sectionHeader}>
									<Link href={entry.href} className={styles.itemLink}>
										<Text variant="subtitle2">{entry.title}</Text>
									</Link>
									{entry.author && (
										<Text variant="caption" color="muted">
											{entry.author}
										</Text>
									)}
								</div>
							</div>
						);
					}
					return (
						<div key={entry.ref} className={styles.section}>
							<div className={styles.sectionHeader}>
								<Text variant="subtitle2">{entry.title}</Text>
								{entry.author && (
									<Text variant="caption" color="muted">
										{entry.author}
									</Text>
								)}
							</div>
							{entry.children.length > 0 && (
								<ul className={styles.list}>
									{entry.children.map((child) => {
										if (
											child.type === 'page' ||
											child.type === 'source' ||
											child.type === 'generated'
										) {
											return (
												<li key={child.ref} className={styles.item}>
													<Link href={child.href} className={styles.itemLink}>
														{child.title}
													</Link>
													{child.type === 'page' && child.author && (
														<Text variant="caption" color="muted">
															{child.author}
														</Text>
													)}
												</li>
											);
										}
										return null;
									})}
								</ul>
							)}
						</div>
					);
				}
				if (
					entry.type === 'page' ||
					entry.type === 'source' ||
					entry.type === 'generated'
				) {
					return (
						<div key={entry.ref} className={styles.item}>
							<Link href={entry.href} className={styles.itemLink}>
								{entry.title}
							</Link>
						</div>
					);
				}
				return null;
			})}
		</nav>
	);
}
