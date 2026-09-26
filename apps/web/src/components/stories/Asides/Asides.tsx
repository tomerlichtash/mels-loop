'use client';

import type { ResolvedContentsEntry } from '@mels-loop/content-loaders/types';
import { Avatar } from '@mels-loop/ui/primitives';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Asides.module.css';

export interface AsideRow {
	href: string;
	title: string;
	/** Aside-specific line, authored in the contents rather than the article. */
	subtitle?: string;
	author?: string;
}

export interface StoryPerson {
	href: string;
	name: string;
	/** The story-scoped alias ("The Big Boss") or the localized role. */
	subtitle?: string;
	avatarUrl?: string;
}

interface PeopleGroup {
	label: string;
	people: StoryPerson[];
}

interface AsidesProps {
	contents: ResolvedContentsEntry[];
	people?: PeopleGroup;
}

interface Group {
	key: string;
	label: string;
	rows: AsideRow[];
}

/**
 * One labelled aside group — the list itself, importable on its own so other
 * rails (a person's record, say) show articles exactly as the story sidebar
 * does: same label, gutter, gaps, hover and active mark.
 */
export function AsideList({
	label,
	rows,
}: {
	label: string;
	rows: AsideRow[];
}) {
	const pathname = usePathname();

	return (
		<div className={styles.group}>
			<p className={styles.groupLabel}>{label}</p>
			<ul className={styles.list}>
				{rows.map((row) => {
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
	);
}

/**
 * Flattens the contents tree into the groups the aside shows.
 *
 * Deliberately not a faithful rendering of that tree. The tree describes how
 * the story is filed; this describes what a reader wants beside the prose,
 * which is the articles written around it. The main text is not repeated here
 * — it owns the first tab — and parts marked `aside: false` are reference
 * material that already has its own tab.
 */
function toGroups(contents: ResolvedContentsEntry[]): Group[] {
	const groups: Group[] = [];

	for (const entry of contents) {
		if (entry.type !== 'part' || entry.aside === false || entry.collapse) {
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
 * The story's aside: its people, and the articles written around it.
 *
 * One list component on purpose — the people rows and the article rows share
 * the same group label, gutter, gaps and hover, so the sidebar reads as one
 * ledger rather than a stack of differently-styled widgets. Every row aligns
 * on the same text edge, and the current page is marked by a rule in the
 * gutter rather than a filled, padded box — so nothing shifts as the reader
 * moves between pages.
 */
export function Asides({ contents, people }: AsidesProps) {
	const groups = toGroups(contents);

	if (groups.length === 0 && !people) return null;

	return (
		<nav className={styles.root}>
			{groups.map((group) => (
				<AsideList key={group.key} label={group.label} rows={group.rows} />
			))}

			{people && people.people.length > 0 && (
				<div className={styles.group}>
					<p className={styles.groupLabel}>{people.label}</p>
					<ul className={styles.list}>
						{people.people.map((person) => (
							<li key={person.href}>
								<Link
									href={person.href}
									className={cn(styles.link, styles.personLink)}
								>
									<Avatar
										size="sm"
										alt=""
										fallback={person.name
											.split(' ')
											.map((part) => part[0])
											.slice(0, 2)
											.join('')}
										image={
											person.avatarUrl ? (
												<Image
													src={person.avatarUrl}
													alt=""
													width={64}
													height={64}
													className={styles.avatarImage}
												/>
											) : undefined
										}
									/>
									<span className={styles.personText}>
										<span className={styles.title}>{person.name}</span>
										{person.subtitle && (
											<span className={styles.author}>{person.subtitle}</span>
										)}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
}
