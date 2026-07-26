import type { BlockContent, DefinitionContent } from 'mdast';

/**
 * Shared interface for remark-directive nodes.
 * Used by blockquote, cols, figure, and table directive plugins.
 */
export interface DirectiveNode {
	type: 'containerDirective' | 'leafDirective';
	name: string;
	attributes?: Record<string, string | null | undefined> | null;
	children: (BlockContent | DefinitionContent)[];
	data?: {
		hName?: string;
		hProperties?: Record<string, unknown>;
		[key: string]: unknown;
	};
}
