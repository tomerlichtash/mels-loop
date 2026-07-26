import type { PluginSpec } from '@mels-loop/content-pipeline/markdown';
import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkChatDirective } from '../../src/remark/chat-directive';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkChatDirective', () => {
	const plugins: PluginSpec[] = [[remarkDirective], [remarkChatDirective]];

	it('converts :::chat to a chat container', async () => {
		const md = ':::chat\nBud: Hello.\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const divs = findElements(hast, 'div');
		const chat = divs.find((el) => el.properties?.['dataType'] === 'chat');
		expect(chat).toBeDefined();
	});

	it('creates message elements with sender and text', async () => {
		const md = ':::chat\nBud: Hello.\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const senders = findElements(hast, 'span').filter(
			(el) => 'dataChatSender' in (el.properties ?? {}),
		);
		const texts = findElements(hast, 'span').filter(
			(el) => 'dataChatText' in (el.properties ?? {}),
		);
		expect(senders).toHaveLength(1);
		expect(texts).toHaveLength(1);
		expect(textContent(senders[0])).toBe('Bud');
		expect(textContent(texts[0])).toBe('Hello.');
	});

	it('handles multiple messages', async () => {
		const md =
			':::chat\nBud: Hello.\nVoice: YOU KILLED MABEL!!\nBud: Excuse me?\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const messages = findElements(hast, 'div').filter(
			(el) => 'dataChatMessage' in (el.properties ?? {}),
		);
		expect(messages).toHaveLength(3);
	});

	it('ignores non-chat directives', async () => {
		const md = ':::blockquote\nSome text\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const chat = findElements(hast, 'div').find(
			(el) => el.properties?.['dataType'] === 'chat',
		);
		expect(chat).toBeUndefined();
	});

	it('skips lines without colon separator', async () => {
		const md = ':::chat\nBud: Hello.\nno colon here\nVoice: Hi.\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const messages = findElements(hast, 'div').filter(
			(el) => 'dataChatMessage' in (el.properties ?? {}),
		);
		expect(messages).toHaveLength(2);
	});

	it('skips empty lines', async () => {
		const md = ':::chat\nBud: Hello.\n\nVoice: Hi.\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const messages = findElements(hast, 'div').filter(
			(el) => 'dataChatMessage' in (el.properties ?? {}),
		);
		expect(messages).toHaveLength(2);
	});

	it('skips lines where colon is at position 0', async () => {
		const md = ':::chat\n:no sender\nBud: Hi.\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const messages = findElements(hast, 'div').filter(
			(el) => 'dataChatMessage' in (el.properties ?? {}),
		);
		expect(messages).toHaveLength(1);
	});

	it('handles chat with only empty/invalid lines (no messages)', async () => {
		const md = ':::chat\n\n\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const chat = findElements(hast, 'div').find(
			(el) => el.properties?.['dataType'] === 'chat',
		);
		expect(chat).toBeDefined();
		const messages = findElements(hast, 'div').filter(
			(el) => 'dataChatMessage' in (el.properties ?? {}),
		);
		expect(messages).toHaveLength(0);
	});
});
