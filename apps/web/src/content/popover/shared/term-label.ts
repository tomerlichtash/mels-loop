import { isValidElement, type ReactNode } from 'react';

/** `real-programmer` -> `Real Programmer`. */
export function titleCase(slug: string): string {
	return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * The rendered text of a node tree.
 *
 * Popover triggers receive their label as children rather than a string, so
 * `typeof label === 'string'` is never true and any code relying on it falls
 * through to whatever default it had.
 */
export function nodeText(node: ReactNode): string {
	if (typeof node === 'string') return node;
	if (typeof node === 'number') return String(node);
	if (Array.isArray(node)) return node.map(nodeText).join('');
	if (isValidElement<{ children?: ReactNode }>(node)) {
		return nodeText(node.props.children);
	}
	return '';
}

/**
 * The display name for a glossary term.
 *
 * English takes the slug, which is the canonical singular in its dictionary
 * form: the prose that links to a term is inflected to fit its sentence, so
 * following "…a `compiler` for this" would otherwise title the entry
 * `compiler`, lowercase and mid-sentence. Hebrew has no such source — the slug
 * is always English — so it takes the prose and shows the canonical English
 * underneath.
 */
export function termLabel(term: string, prose: string, locale: string): string {
	if (locale === 'he' && prose) return prose;
	return titleCase(term) || prose || term;
}
