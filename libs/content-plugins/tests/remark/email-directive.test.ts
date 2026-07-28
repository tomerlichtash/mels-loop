import type { PluginSpec } from '@mels-loop/content-pipeline/markdown';
import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkEmailDirective } from '../../src/remark/email-directive';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkEmailDirective', () => {
	const plugins: PluginSpec[] = [[remarkDirective], [remarkEmailDirective]];

	describe('email-header', () => {
		it('converts :::email-header to a definition list', async () => {
			const md = ':::email-header\nFrom: Alice\nTo: Bob\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dls = findElements(hast, 'dl');
			expect(dls).toHaveLength(1);
			expect(dls[0].properties?.['dataType']).toBe('email-header');
		});

		it('parses key-value fields into dt/dd pairs', async () => {
			const md = ':::email-header\nFrom: Alice\nTo: Bob\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dts = findElements(hast, 'dt');
			const dds = findElements(hast, 'dd');
			expect(dts).toHaveLength(2);
			expect(dds).toHaveLength(2);
			expect(textContent(dts[0])).toBe('From:');
			expect(textContent(dds[0])).toBe('Alice');
			expect(textContent(dts[1])).toBe('To:');
			expect(textContent(dds[1])).toBe('Bob');
		});

		it('keeps a colon inside a value — a time must not split the field', async () => {
			const md =
				':::email-header\nFrom: Alice\nDate: Tue, Apr 17, 2012 at 10:59 AM\nTo: Bob\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dts = findElements(hast, 'dt');
			const dds = findElements(hast, 'dd');
			expect(dts.map(textContent)).toEqual(['From:', 'Date:', 'To:']);
			expect(textContent(dds[1])).toBe('Tue, Apr 17, 2012 at 10:59 AM');
		});

		it('handles Re: field correctly', async () => {
			const md = ':::email-header\nRe: Always Mount a Scratch Monkey\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dts = findElements(hast, 'dt');
			const dds = findElements(hast, 'dd');
			expect(textContent(dts[0])).toBe('Re:');
			expect(textContent(dds[0])).toBe('Always Mount a Scratch Monkey');
		});

		it('handles empty header (no fields)', async () => {
			const md = ':::email-header\n\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dls = findElements(hast, 'dl');
			expect(dls).toHaveLength(1);
			const dts = findElements(hast, 'dt');
			expect(dts).toHaveLength(0);
		});

		it('handles multiple fields on separate lines', async () => {
			const md =
				':::email-header\nDate: Wed, 3 Sep 1986\nFrom: Art Evans\nTo: Risks\nRe: Scratch Monkey\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const dts = findElements(hast, 'dt');
			expect(dts).toHaveLength(4);
			expect(textContent(dts[0])).toBe('Date:');
			expect(textContent(dts[3])).toBe('Re:');
		});
	});

	describe('email-body', () => {
		it('converts :::email-body to a styled container', async () => {
			const md = ':::email-body\nSome email content.\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const divs = findElements(hast, 'div');
			const body = divs.find(
				(el) => el.properties?.['dataType'] === 'email-body',
			);
			expect(body).toBeDefined();
		});

		it('preserves paragraph content inside email-body', async () => {
			const md = ':::email-body\nFirst paragraph.\n\nSecond paragraph.\n:::';
			const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
			const body = findElements(hast, 'div').find(
				(el) => el.properties?.['dataType'] === 'email-body',
			);
			const paragraphs = findElements(body!, 'p');
			expect(paragraphs.length).toBeGreaterThanOrEqual(2);
		});
	});

	it('recovers email addresses from autolinked mailto: URLs', async () => {
		// remark parses <user@example.com> as a link with mailto: prefix
		const md = ':::email-header\nFrom: user@example.com\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const dds = findElements(hast, 'dd');
		expect(dds.length).toBeGreaterThanOrEqual(1);
		// The email address should appear without mailto: prefix
		expect(textContent(dds[0])).toContain('user@example.com');
	});

	it('ignores unrelated directives', async () => {
		const md = ':::blockquote\nSome text\n:::';
		const hast = await applyPlugins(md, { remarkPlugins: [...plugins] });
		const dls = findElements(hast, 'dl');
		expect(dls).toHaveLength(0);
	});
});
