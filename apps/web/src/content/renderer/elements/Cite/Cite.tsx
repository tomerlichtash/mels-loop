'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, type ReactNode } from 'react';

import { nodeText } from '../../../popover/shared/term-label';
import styles from './Cite.module.css';

/**
 * Citations that point into the story's full text: "Line 193", "Lines 54-60",
 * "Lines 175-177, 194-201", and their Hebrew equivalents.
 *
 * The label is required, not optional. Matching bare digits would misread
 * citations that merely contain a number — "Anthony Cuozzo's email to Mel
 * Kaye, 2012" is an email, not line 2012, and linking it would send the reader
 * to a line that may not exist.
 */
const LINE_CITATION = /^\s*(lines?|שורות?)\b/i;

/** A single line number or a range of them: "193", "54-60", "175–177". */
const LINE_REFERENCE = /(\d+(?:\s*[-–—]\s*\d+)?)/g;

interface CiteProps {
	children?: ReactNode;
	[key: string]: unknown;
}

/**
 * A quotation's attribution.
 *
 * Where it names lines of the story, each reference becomes its own link to
 * the anchor the codex renders for that line — so "Lines 175-177, 194-201"
 * offers two destinations rather than one, because it describes two separate
 * passages and a reader following the argument may want either.
 *
 * The story slug comes from the path rather than from context: every page that
 * can hold a citation lives under /stories/<slug>/, and reading it here avoids
 * threading a prop through the renderer's whole component map for one element.
 */
export function Cite({ children, ...props }: CiteProps) {
	const pathname = usePathname();

	const segments = pathname.split('/').filter(Boolean);
	const slug = segments[0] === 'stories' ? segments[1] : undefined;
	const text = nodeText(children);

	if (!slug || !LINE_CITATION.test(text)) {
		return (
			<cite className={styles.root} {...props}>
				{children}
			</cite>
		);
	}

	/* Split keeps the separators, so the label, commas and spacing between the
	 * references survive and only the references themselves become links. */
	const parts = text.split(LINE_REFERENCE);

	return (
		<cite className={styles.root} {...props}>
			{parts.map((part, i) => {
				const line = part.match(/\d+/)?.[0];
				if (!line || !/^\s*\d/.test(part))
					return <Fragment key={i}>{part}</Fragment>;
				return (
					<Link
						key={i}
						href={`/stories/${slug}#line-${line}`}
						className={styles.link}
					>
						{part}
					</Link>
				);
			})}
		</cite>
	);
}
