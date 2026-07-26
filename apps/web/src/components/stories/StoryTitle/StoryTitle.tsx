'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from '../StoryHeader/StoryHeader.module.css';

interface StoryIdentityLinkProps {
	href: string;
	children: ReactNode;
}

/**
 * Wraps the story header's identity block — avatar, title, subtitle — in a
 * link back to the story's full text, except when already there.
 *
 * The link lives here rather than around the title alone so the avatar and
 * subtitle are part of the same target. It has to be a client component
 * because deciding whether to link at all depends on the active route
 * segment.
 */
export function StoryIdentityLink({ href, children }: StoryIdentityLinkProps) {
	const segment = useSelectedLayoutSegment();

	if (segment === null) {
		return <div className={styles.identity}>{children}</div>;
	}

	return (
		<Link href={href} className={styles.identity}>
			{children}
		</Link>
	);
}
