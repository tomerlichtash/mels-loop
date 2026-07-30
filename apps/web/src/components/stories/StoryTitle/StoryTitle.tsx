'use client';

import cn from 'classnames';
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
 * because deciding whether to link at all depends on the active route segment.
 *
 * Always a Link, even on the story's own page. It used to render a plain div
 * there, and swapping the element type between div and anchor made React tear
 * down and rebuild everything inside on every navigation across that boundary
 * — including the avatar, whose load state reset and flashed its loader each
 * time. A self-link marked aria-current is the ordinary way to say "you are
 * here" without changing what the element is.
 */
export function StoryIdentityLink({ href, children }: StoryIdentityLinkProps) {
	const segment = useSelectedLayoutSegment();
	const isCurrent = segment === null;

	return (
		<Link
			href={href}
			className={cn(styles.identity, isCurrent && styles.identityCurrent)}
			aria-current={isCurrent ? 'page' : undefined}
		>
			{children}
		</Link>
	);
}
