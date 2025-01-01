import { describe, expect, test } from '@jest/globals';
import { getMarkdownLinks } from '../../e2e/utils/termsTestUtils';
import {
	baseDir,
	getFrontMatter,
	stripMarkdown,
} from '../../e2e/utils/mdTestUtils';
import { ASTRIEK_MOCK, EMPTY_STRING } from '../../e2e/utils/patterns';
import { getLocalePath } from '../../e2e/utils/localeTestUtils';
const whitespace = '    ';

describe('E2E Test Utils', () => {
	test('getMarkdownLinks', () => {
		const mdMock =
			'some text with [link](delim1/someValue) and [another link](delim2/anotherValue) of other type';
		const delim1val = getMarkdownLinks(mdMock, 'delim1');
		const delim2val = getMarkdownLinks(mdMock, 'delim2');

		// should return values for delim type
		expect(delim1val).toEqual(['someValue']);
		expect(delim2val).toEqual(['anotherValue']);
	});

	describe('FrontMatter', () => {
		test('getFrontMatter', () => {
			const { data, content } = getFrontMatter(
				'docs/the-story-of-mel',
				'codex/index',
				'en'
			);
			// should return frontmatter
			expect(data.title).toEqual('The Story of Mel');
			// should return content
			expect(content.length).toBeGreaterThan(0);
		});
	});

	describe('getLocalePath', () => {
		test('Default Path', () => {
			const path = getLocalePath('en', 'somePath');
			// should return default locale path
			expect(path).toEqual(`${baseDir}/somePath`);
		});

		test('Localed Path', () => {
			const path = getLocalePath('someLocale', 'somePath');
			// should return path with locale ID
			expect(path).toEqual(`${baseDir}/someLocale/somePath`);
		});
	});

	describe('stripMarkdown', () => {
		describe('Bold', () => {
			test('should remove bold', () => {
				const content = 'Some *markdown*';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});

			test('should remove double astriek', () => {
				const content = 'Some **markdown**';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});

			test('should convert single astriek to literals', () => {
				const content = 'Some markdown * can have a single astriek';
				// should replace mid-astrick with mock
				expect(stripMarkdown(content)).toEqual(
					`Some markdown ${ASTRIEK_MOCK} can have a single astriek`
				);
			});

			test('should replace multiple instances of single astriek in a line', () => {
				const content = `After porting (e.g. "150* - bets $1.50"). Permissible affirmative answers are: yes*, ok*, si*, ja*, oui*.`;
				expect(stripMarkdown(content)).toEqual(
					`After porting (e.g. "150${ASTRIEK_MOCK} - bets $1.50"). Permissible affirmative answers are: yes${ASTRIEK_MOCK}, ok${ASTRIEK_MOCK}, si${ASTRIEK_MOCK}, ja${ASTRIEK_MOCK}, oui${ASTRIEK_MOCK}.`
				);
			});
		});

		describe('Italics', () => {
			test('should remove italics', () => {
				const content = 'Some _markdown_';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});

			// test("should not remove non-italic underscores", () => {
			// 	const content = "Some __underscores__ should not be removed";
			// 	expect(stripMarkdown(content)).toEqual(
			// 		"Some __underscores__ should not be removed"
			// 	);
			// });
		});

		describe('Paragraphs', () => {
			test('should join paragraphs', () => {
				const content = 'par1\npar2\npar3';
				expect(stripMarkdown(content)).toEqual('par1par2par3');
			});

			test('should join spaced paragraphs', () => {
				const content = 'par1\n\npar2\n\npar3';
				expect(stripMarkdown(content)).toEqual('par1par2par3');
			});
		});

		describe('Lists', () => {
			// test.fixme("should remove ordered list in first line", () => {
			// 	const content = "1. First Item\n2. Second Item\n3. Third Item";
			// 	expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
			// });

			test('should remove ordered list in a new line', () => {
				const content = '\n1. First Item\n2. Second Item\n3. Third Item';
				expect(stripMarkdown(content)).toEqual(
					'First ItemSecond ItemThird Item'
				);
			});

			test('should remove unordered list with dash bullet', () => {
				const content = '\n- First Item\n- Second Item\n- Third Item';
				expect(stripMarkdown(content)).toEqual(
					'First ItemSecond ItemThird Item'
				);
			});

			test('should remove unordered list with astriek bullet', () => {
				const content = '\n* First Item\n* Second Item\n* Third Item';
				expect(stripMarkdown(content)).toEqual(
					'First ItemSecond ItemThird Item'
				);
			});
		});

		describe('Whitespace', () => {
			test('should trim spaces for single lines', () => {
				const content = [
					EMPTY_STRING,
					'Some',
					'markdown',
					EMPTY_STRING,
					'and',
					EMPTY_STRING,
					'some',
					'more',
					EMPTY_STRING,
				].join(whitespace);
				expect(stripMarkdown(content)).toEqual(
					[
						'Some',
						'markdown',
						EMPTY_STRING,
						'and',
						EMPTY_STRING,
						'some',
						'more',
					].join(whitespace)
				);
			});

			test('should trim spaces for paragraphs', () => {
				const content = [
					EMPTY_STRING,
					'\n',
					'Some',
					'markdown',
					EMPTY_STRING,
					'and',
					EMPTY_STRING,
					'some',
					'more',
					EMPTY_STRING,
					'\n',
				].join(whitespace);
				expect(stripMarkdown(content)).toEqual(
					[
						'Some',
						'markdown',
						EMPTY_STRING,
						'and',
						EMPTY_STRING,
						'some',
						'more',
					].join(whitespace)
				);
			});
		});

		describe('Code Block', () => {
			test('should remove inline code blocks', () => {
				const content = '`Some code block`';
				expect(stripMarkdown(content)).toEqual('Some code block');
			});

			test('should remove code blocks with languages prefix', () => {
				const content = '\n```js\nSome code block\n```';
				expect(stripMarkdown(content)).toEqual('Some code block');
			});
		});

		describe('Blockquote', () => {
			test('should remove blockquote', () => {
				const content = '> Some markdown';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});

			// test.fixme("should remove multiline blockquote", () => {
			// 	const content = "> Some markdown\n> dada";
			// 	expect(stripMarkdown(content)).toEqual("Some markdowndada");
			// });
		});

		describe('Links', () => {
			test('should remove links and keep link anchor', () => {
				const content = '[Some markdown](http://exmaple.com)';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});
		});

		describe('Comments', () => {
			test('should remove comments', () => {
				const content = 'Some markdown\n<!-- some somment -->';
				expect(stripMarkdown(content)).toEqual('Some markdown');
			});
		});
	});
});
