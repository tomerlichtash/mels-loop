import type { Paragraph, PhrasingContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { DirectiveNode } from './types';

/**
 * Email directives for presenting email-style content.
 *
 * `:::email-header` — Transforms into a definition list (`<dl>`) for
 * email metadata (Date, From, To, Subject, etc.).
 *
 *   :::email-header
 *   Date: Wednesday, 3 September 1986  16:46-EDT
 *   From: Art Evans \<Evans@TL-20B.ARPA\>
 *   To: Risks@CSL.SRI.COM
 *   Re: Always Mount a Scratch Monkey
 *   :::
 *
 * `:::email-body` — Wraps content in a styled container for email body text.
 *
 *   :::email-body
 *   In another forum that I follow...
 *   :::
 */
export function remarkEmailDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any, index, parent) => {
			const directive = node as DirectiveNode;
			if (typeof index !== 'number' || !parent) return;

			if (directive.name === 'email-header') {
				transformEmailHeader(directive);
			} else if (directive.name === 'email-body') {
				directive.data = {
					hName: 'div',
					hProperties: { 'data-type': 'email-body' },
				};
			}
		});
	};
}

/**
 * Flatten all inline children of a paragraph into a single string,
 * recovering autolink URLs that remark parses from <addr> syntax.
 */
function flattenInlines(children: PhrasingContent[]): string {
	let buf = '';
	for (const inline of children) {
		if (inline.type === 'text') {
			buf += inline.value;
		} else if (inline.type === 'link') {
			const url = inline.url.replace(/^mailto:/, '');
			buf += url;
		}
	}
	return buf;
}

function transformEmailHeader(directive: DirectiveNode) {
	// Collect full text from paragraph children
	const chunks: string[] = [];
	for (const child of directive.children) {
		if (child.type !== 'paragraph') continue;
		const para = child as Paragraph;
		chunks.push(flattenInlines(para.children));
	}
	const fullText = chunks.join('\n');

	// Split into fields. A new field starts when a line begins with
	// a word followed by a colon (e.g. "Date:", "From:", "Re:").
	// This handles cases where newlines are stripped by the parser.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dlChildren: any[] = [];
	const fieldPattern = /(?:^|\n)(\w[\w\s-]*?):\s*/g;
	let match: RegExpExecArray | null;
	let lastKey: string | null = null;
	let lastValueStart = 0;

	while ((match = fieldPattern.exec(fullText)) !== null) {
		if (lastKey !== null) {
			const value = fullText.slice(lastValueStart, match.index).trim();
			pushField(dlChildren, lastKey, value);
		}
		lastKey = match[1].trim();
		lastValueStart = match.index + match[0].length;
	}

	// Push the last field
	if (lastKey !== null) {
		const value = fullText.slice(lastValueStart).trim();
		pushField(dlChildren, lastKey, value);
	}

	directive.data = {
		hName: 'dl',
		hProperties: { 'data-type': 'email-header' },
	};
	directive.children = dlChildren;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pushField(dlChildren: any[], key: string, value: string) {
	dlChildren.push({
		type: 'element',
		data: { hName: 'dt' },
		children: [{ type: 'text', value: `${key}:` }],
	});
	dlChildren.push({
		type: 'element',
		data: { hName: 'dd' },
		children: [{ type: 'text', value }],
	});
}
