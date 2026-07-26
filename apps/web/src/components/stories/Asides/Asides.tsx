'use client';

import type {
	ResolvedContentsEntry,
	SourceType,
} from '@mels-loop/content-loaders/types';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SOURCE_TYPE_ICONS } from '../../../content/sources/source-types';
import styles from './Asides.module.css';

interface Row {
	href: string;
	title: string;
	/** Aside-specific line, authored in the contents rather than the article. */
	subtitle?: string;
	author?: string;
}

/**
 * A short editor's pick of sources, closing with a way through to the rest.
 *
 * The full set runs to dozens and lives in its own tab; what belongs beside the
 * prose is a handful worth opening. Rendered as another group in this list
 * rather than as a component of its own, so it inherits the same alignment,
 * hover and active mark as everything above it.
 */
interface SourcesGroup {
	label: string;
	rows: (Row & { type: SourceType })[];
	moreHref: string;
	moreLabel: string;
}

interface AsidesProps {
	contents: ResolvedContentsEntry[];
	sources?: SourcesGroup;
}

interface Group {
	key: string;
	/** Absent for the main text, which names itself. */
	label?: string;
	rows: Row[];
}

/**
 * Flattens the contents tree into the groups the aside shows.
 *
 * Deliberately not a faithful rendering of that tree. The tree describes how
 * the story is filed; this describes what a reader wants beside the prose,
 * which is the main text and the articles written around it. Parts marked
 * `aside: false` are reference material that already has its own tab, and
 * repeating them here says nothing about how they relate to the story.
 */
function toGroups(contents: ResolvedContentsEntry[]): Group[] {
	const groups: Group[] = [];

	for (const entry of contents) {
		if (entry.type !== 'part') {
			groups.push({
				key: entry.ref,
				rows: [{ href: entry.href, title: entry.title }],
			});
			continue;
		}

		if (entry.aside === false) continue;

		/* A collapsed part is a single page wearing the part's title — the main
		 * text itself. It leads, with no group label above it. */
		if (entry.collapse && entry.href) {
			groups.push({
				key: entry.ref,
				rows: [{ href: entry.href, title: entry.title, author: entry.author }],
			});
			continue;
		}

		const rows = entry.children
			.filter((child) => child.type !== 'part')
			.map((child) => ({
				href: child.href,
				title: child.title,
				subtitle: child.type === 'page' ? child.subtitle : undefined,
				author: child.type === 'page' ? child.author : undefined,
			}));

		if (rows.length > 0) {
			groups.push({ key: entry.ref, label: entry.title, rows });
		}
	}

	return groups;
}

/**
 * The story's aside: the main text, and the articles written around it.
 *
 * This was a timeline — a vertical rule with dots down the side. The metaphor
 * claimed a sequence these entries do not have: an article about Mel Kaye's CV
 * does not come after the story in time, it sits alongside it. The rail also
 * broke the one placement that matters on a phone, stacked beneath the prose,
 * where a line descending from the text reads as the text continuing rather
 * than as a list of related reading.
 *
 * Every row aligns on the same text edge whatever its depth, and the current
 * page is marked by a rule in the gutter rather than a filled, padded box — so
 * nothing shifts as the reader moves between pages.
 */
export function Asides({ contents, sources }: AsidesProps) {
	const pathname = usePathname();
	const groups = toGroups(contents);

	if (groups.length === 0 && !sources) return null;

	return (
		<nav className={styles.root}>
			{groups.map((group) => (
				<div key={group.key} className={styles.group}>
					{group.label && <p className={styles.groupLabel}>{group.label}</p>}
					<ul className={styles.list}>
						{group.rows.map((row) => {
							const isActive = pathname.endsWith(row.href);
							return (
								<li key={row.href}>
									<Link
										href={row.href}
										className={cn(styles.link, isActive && styles.linkActive)}
										aria-current={isActive ? 'page' : undefined}
									>
										<span className={styles.title}>{row.title}</span>
										{row.subtitle && (
											<span className={styles.subtitle}>{row.subtitle}</span>
										)}
										{row.author && (
											<span className={styles.author}>{row.author}</span>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			))}

			{sources && sources.rows.length > 0 && (
				<div className={styles.group}>
					<p className={styles.groupLabel}>{sources.label}</p>
					<ul className={styles.list}>
						{sources.rows.map((row) => {
							const Icon = SOURCE_TYPE_ICONS[row.type];
							return (
								<li key={row.href}>
									<Link href={row.href} className={styles.link}>
										<span className={styles.title}>
											<Icon className={styles.typeIcon} aria-hidden="true" />
											{row.title}
										</span>
										{row.subtitle && (
											<span className={styles.subtitle}>{row.subtitle}</span>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
					<Link href={sources.moreHref} className={styles.more}>
						{sources.moreLabel}
					</Link>
				</div>
			)}
		</nav>
	);
}
