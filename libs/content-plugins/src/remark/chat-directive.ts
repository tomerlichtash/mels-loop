import type { Paragraph, PhrasingContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { DirectiveNode } from './types';

/**
 * Transforms `:::chat` container directives into a chat-style layout.
 *
 * Each line inside the directive should follow the format:
 *   Name: Message text
 *
 * Usage in markdown:
 *
 *   :::chat
 *   Bud: Hello.
 *   Voice: YOU KILLED MABEL!!
 *   Bud: Excuse me?
 *   Voice: YOU KILLED MABEL!!
 *   :::
 *
 * Produces:
 *   <div data-type="chat">
 *     <div data-chat-message>
 *       <span data-chat-sender>Bud</span>
 *       <span data-chat-text>Hello.</span>
 *     </div>
 *     ...
 *   </div>
 */
export function remarkChatDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any, index, parent) => {
			const directive = node as DirectiveNode;
			if (directive.name !== 'chat') return;
			if (typeof index !== 'number' || !parent) return;

			// Flatten all paragraph text, preserving newlines
			const chunks: string[] = [];
			for (const child of directive.children) {
				if (child.type !== 'paragraph') continue;
				const para = child as Paragraph;
				chunks.push(flattenInlines(para.children));
			}
			const fullText = chunks.join('\n');

			// Parse "Name: Message" lines
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const messages: any[] = [];
			for (const line of fullText.split('\n')) {
				const trimmed = line.trim();
				if (!trimmed) continue;
				const colonIdx = trimmed.indexOf(':');
				if (colonIdx < 1) continue;
				const sender = trimmed.slice(0, colonIdx).trim();
				const text = trimmed.slice(colonIdx + 1).trim();
				messages.push({
					type: 'element',
					data: {
						hName: 'div',
						hProperties: { 'data-chat-message': '' },
					},
					children: [
						{
							type: 'element',
							data: {
								hName: 'span',
								hProperties: { 'data-chat-sender': '' },
							},
							children: [{ type: 'text', value: sender }],
						},
						{
							type: 'element',
							data: {
								hName: 'span',
								hProperties: { 'data-chat-text': '' },
							},
							children: [{ type: 'text', value: text }],
						},
					],
				});
			}

			directive.data = {
				hName: 'div',
				hProperties: { 'data-type': 'chat' },
			};
			directive.children = messages;
		});
	};
}

function flattenInlines(children: PhrasingContent[]): string {
	let buf = '';
	for (const child of children) {
		if (child.type === 'text') {
			buf += child.value;
		}
	}
	return buf;
}
