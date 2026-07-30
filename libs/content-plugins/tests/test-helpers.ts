import {
	type PluginSpec,
	processMarkdown,
} from '@mels-loop/content-pipeline/markdown';
import type { Element, Root as HastRoot } from 'hast';

/** Run markdown through the pipeline with the given plugins and return the HAST tree. */
export async function applyPlugins(
	markdown: string,
	options: {
		remarkPlugins?: PluginSpec[];
		rehypePlugins?: PluginSpec[];
	} = {},
): Promise<HastRoot> {
	return processMarkdown(markdown, options);
}

/** Find all HAST elements matching a tag name, recursively. */
export function findElements(
	node: HastRoot | Element,
	tagName: string,
): Element[] {
	const results: Element[] = [];

	const children = 'children' in node ? node.children : [];
	for (const child of children) {
		if (child.type === 'element') {
			if (child.tagName === tagName) {
				results.push(child);
			}
			results.push(...findElements(child, tagName));
		}
	}

	return results;
}

/** Extract text content from a HAST element tree. */
export function textContent(node: HastRoot | Element): string {
	const parts: string[] = [];
	for (const child of node.children) {
		if (child.type === 'text') {
			parts.push(child.value);
		} else if (child.type === 'element') {
			parts.push(textContent(child));
		}
	}
	return parts.join('');
}
