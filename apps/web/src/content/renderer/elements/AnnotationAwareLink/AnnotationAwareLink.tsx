'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { AnnotationPopover } from '../../../popover/views/AnnotationPopover/AnnotationPopover';
import { GlossaryPopover } from '../../../popover/views/GlossaryPopover/GlossaryPopover';
import { SourcePopover } from '../../../popover/views/SourcePopover/SourcePopover';
import styles from './AnnotationAwareLink.module.css';

interface AnnotationAwareLinkProps {
	href?: string;
	children?: ReactNode;
	'data-link-type'?: string;
	'data-link-target'?: string;
	'data-sequence'?: string;
	[key: string]: unknown;
}

export function AnnotationAwareLink({
	href,
	children,
	'data-link-type': linkType,
	'data-link-target': linkTarget,
	'data-sequence': sequence,
	...props
}: AnnotationAwareLinkProps) {
	if (linkType === 'annotation' && linkTarget && sequence) {
		return <AnnotationPopover sequence={sequence} target={linkTarget} />;
	}

	if (linkType === 'glossary' && linkTarget) {
		return (
			<GlossaryPopover term={linkTarget} label={children}>
				{children}
			</GlossaryPopover>
		);
	}

	if (linkType === 'source' && linkTarget) {
		return <SourcePopover id={linkTarget} label={children} />;
	}

	if (!href) {
		return <span {...props}>{children}</span>;
	}

	const isExternal = href.startsWith('http://') || href.startsWith('https://');

	if (isExternal) {
		return (
			<a
				href={href}
				className={styles.link}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={styles.link} {...props}>
			{children}
		</Link>
	);
}
