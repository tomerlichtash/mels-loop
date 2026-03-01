import type { Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Sets hProperties on an mdast Link node (bridged to hast attributes).
 */
export function setLinkHProperties(
	node: Link,
	props: Record<string, string>,
): void {
	const data: Record<string, unknown> =
		(node.data as Record<string, unknown>) ||
		((node.data = {}) as unknown as Record<string, unknown>);
	const hProperties =
		(data.hProperties as Record<string, unknown>) ||
		((data.hProperties = {}) as Record<string, unknown>);
	Object.assign(hProperties, props);
}

/**
 * Creates a remark plugin that detects links matching a URL pattern
 * and tags them with data-link-type and data-link-target attributes.
 */
export function createLinkDetector(pattern: RegExp, linkType: string) {
	return () => (tree: Root) => {
		visit(tree, 'link', (node: Link) => {
			if (!pattern.test(node.url)) return;
			const target = node.url.replace(pattern, '');
			setLinkHProperties(node, {
				'data-link-type': linkType,
				'data-link-target': target,
			});
		});
	};
}

/**
 * Splits text nodes on newlines, inserting <br /> html nodes between lines.
 * Non-text children are preserved as-is.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function splitTextNewlines(children: any[]): any[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result: any[] = [];
	for (const child of children) {
		if (child.type === 'text') {
			const lines = child.value.split('\n');
			lines.forEach((line: string, i: number) => {
				if (i > 0) {
					result.push({ type: 'html', value: '<br />' });
				}
				if (line) {
					result.push({ type: 'text', value: line });
				}
			});
		} else {
			result.push(child);
		}
	}
	return result;
}
