'use client';

import type { ResolvedContentsEntry } from '@mels-loop/content-loaders/types';
import {
	Text,
	TimelineItem,
	TimelineNav,
	TimelineSection,
} from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Asides.module.css';

interface AsidesProps {
	contents: ResolvedContentsEntry[];
}

function EntryLink({
	href,
	title,
	author,
	pathname,
}: {
	href: string;
	title: string;
	author?: string;
	pathname: string;
}) {
	const isActive = pathname.endsWith(href);
	return (
		<TimelineItem active={isActive}>
			<Link
				href={href}
				className={[styles.link, isActive ? styles.active : '']
					.filter(Boolean)
					.join(' ')}
				aria-current={isActive ? 'page' : undefined}
			>
				{title}
				{author && (
					<Text variant="caption" color="muted">
						{author}
					</Text>
				)}
			</Link>
		</TimelineItem>
	);
}

export function Asides({ contents }: AsidesProps) {
	const pathname = usePathname();

	if (contents.length === 0) return null;

	return (
		<TimelineNav>
			{contents.map((entry) => {
				if (entry.type === 'part') {
					if (entry.collapse && entry.href) {
						return (
							<TimelineSection key={entry.ref}>
								<EntryLink
									href={entry.href}
									title={entry.title}
									author={entry.author}
									pathname={pathname}
								/>
							</TimelineSection>
						);
					}
					return (
						<TimelineSection key={entry.ref} label={entry.title}>
							{entry.children.map((child) => {
								if (
									child.type === 'page' ||
									child.type === 'source' ||
									child.type === 'generated'
								) {
									return (
										<EntryLink
											key={child.ref}
											href={child.href}
											title={child.title}
											author={child.type === 'page' ? child.author : undefined}
											pathname={pathname}
										/>
									);
								}
								return null;
							})}
						</TimelineSection>
					);
				}
				if (
					entry.type === 'page' ||
					entry.type === 'source' ||
					entry.type === 'generated'
				) {
					return (
						<TimelineSection key={entry.ref}>
							<EntryLink
								href={entry.href}
								title={entry.title}
								pathname={pathname}
							/>
						</TimelineSection>
					);
				}
				return null;
			})}
		</TimelineNav>
	);
}
