'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { useAnnotations } from '../../providers/PopoverProvider';
import { nodeText, termLabel } from '../term-label';
import styles from './InternalLink.module.css';

interface InternalLinkProps {
	href?: string;
	children?: ReactNode;
	'data-link-type'?: string;
	'data-link-target'?: string;
	'data-sequence'?: string;
	[key: string]: unknown;
}

export function InternalLink({
	href,
	children,
	'data-link-type': linkType,
	'data-link-target': linkTarget,
	'data-sequence': sequence,
	...props
}: InternalLinkProps) {
	const { pushNav } = useAnnotations();
	const { locale } = useTranslation();

	if (linkType === 'glossary' && linkTarget) {
		/*
		 * The canonical term, not the words in the sentence. The prose is
		 * inflected to fit — a link reading "…a compiler for this" pushed
		 * `compiler` onto the trail, lowercase and mid-sentence, and that string
		 * then titled the whole entry.
		 */
		const label = termLabel(linkTarget, nodeText(children), locale);
		return (
			<button
				type="button"
				className={styles.trigger}
				onClick={() => pushNav({ type: 'glossary', key: linkTarget, label })}
			>
				{children}
			</button>
		);
	}

	if (linkType === 'annotation' && linkTarget && sequence) {
		return (
			<button
				type="button"
				className={styles.trigger}
				onClick={() =>
					pushNav({
						type: 'annotation',
						key: linkTarget,
						label: `[${sequence}]`,
					})
				}
			>
				{children}
			</button>
		);
	}

	if (!href) {
		return <span {...props}>{children}</span>;
	}

	const isExternal = href.startsWith('http://') || href.startsWith('https://');

	if (isExternal) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
}
