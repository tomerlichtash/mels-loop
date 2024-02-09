import { it, describe, expect } from 'vitest';
import { getMarkdownLinks } from '../e2e/utils/terms';
import {
	baseDir,
	getFrontMatter,
	getLocalePath,
	stripMarkdown,
	validateStringTranslation,
} from '../e2e/utils/test-utils';
import { ASTRIEK_MOCK, EMPTY_STRING } from '../e2e/utils/patterns';
const whitespace = '    ';

it('getMarkdownLinks', () => {
	const mdMock =
		'some text with [link](delim1/someValue) and [another link](delim2/anotherValue) of other type';
	const delim1val = getMarkdownLinks(mdMock, 'delim1');
	const delim2val = getMarkdownLinks(mdMock, 'delim2');
	expect(delim1val, 'should return values for delim type').toEqual([
		'someValue',
	]);
	expect(delim2val, 'should return values for delim type').toEqual([
		'anotherValue',
	]);
});

it('getFrontMatter', () => {
	const { data, content } = getFrontMatter(
		'docs/the-story-of-mel',
		'codex/index',
		'en'
	);
	expect(data.title, 'should return frontmatter').toEqual('The Story of Mel');
	expect(content.length, 'should return content').toBeGreaterThan(0);
});

describe('getLocalePath', () => {
	it('Default Path', () => {
		const path = getLocalePath('en', 'somePath');
		expect(path, 'should return default locale path').toEqual(
			`${baseDir}/somePath`
		);
	});

	it('Localed Path', () => {
		const path = getLocalePath('someLocale', 'somePath');
		expect(path, 'should return path with locale ID').toEqual(
			`${baseDir}/someLocale/somePath`
		);
	});
});

describe('stripMarkdown', () => {
	describe('Bold', () => {
		it('should remove bold', () => {
			const content = 'Some *markdown*';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});

		it('should remove double astriek', () => {
			const content = 'Some **markdown**';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});

		it('should convert single astriek to literals', () => {
			const content = 'Some markdown * can have a single astriek';
			expect(
				stripMarkdown(content),
				'should replace mid-astrick with mock'
			).toEqual(`Some markdown ${ASTRIEK_MOCK} can have a single astriek`);
		});

		it('should replace multiple instances of single astriek in a line', () => {
			const content = `After porting (e.g. "150* - bets $1.50"). Permissible affirmative answers are: yes*, ok*, si*, ja*, oui*.`;
			expect(stripMarkdown(content)).toEqual(
				`After porting (e.g. "150${ASTRIEK_MOCK} - bets $1.50"). Permissible affirmative answers are: yes${ASTRIEK_MOCK}, ok${ASTRIEK_MOCK}, si${ASTRIEK_MOCK}, ja${ASTRIEK_MOCK}, oui${ASTRIEK_MOCK}.`
			);
		});
	});

	describe('Italics', () => {
		it('should remove italics', () => {
			const content = 'Some _markdown_';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});

		// it("should not remove non-italic underscores", () => {
		// 	const content = "Some __underscores__ should not be removed";
		// 	expect(stripMarkdown(content)).toEqual(
		// 		"Some __underscores__ should not be removed"
		// 	);
		// });
	});

	describe('Paragraphs', () => {
		it('should join paragraphs', () => {
			const content = 'par1\npar2\npar3';
			expect(stripMarkdown(content)).toEqual('par1par2par3');
		});

		it('should join spaced paragraphs', () => {
			const content = 'par1\n\npar2\n\npar3';
			expect(stripMarkdown(content)).toEqual('par1par2par3');
		});
	});

	describe('Lists', () => {
		// test.fixme("should remove ordered list in first line", () => {
		// 	const content = "1. First Item\n2. Second Item\n3. Third Item";
		// 	expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
		// });

		it('should remove ordered list in a new line', () => {
			const content = '\n1. First Item\n2. Second Item\n3. Third Item';
			expect(stripMarkdown(content)).toEqual('First ItemSecond ItemThird Item');
		});

		it('should remove unordered list with dash bullet', () => {
			const content = '\n- First Item\n- Second Item\n- Third Item';
			expect(stripMarkdown(content)).toEqual('First ItemSecond ItemThird Item');
		});

		it('should remove unordered list with astriek bullet', () => {
			const content = '\n* First Item\n* Second Item\n* Third Item';
			expect(stripMarkdown(content)).toEqual('First ItemSecond ItemThird Item');
		});
	});

	describe('Whitespace', () => {
		it('should trim spaces for single lines', () => {
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

		it('should trim spaces for paragraphs', () => {
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
		it('should remove inline code blocks', () => {
			const content = '`Some code block`';
			expect(stripMarkdown(content)).toEqual('Some code block');
		});

		it('should remove code blocks with languages prefix', () => {
			const content = '\n```js\nSome code block\n```';
			expect(stripMarkdown(content)).toEqual('Some code block');
		});
	});

	describe('Blockquote', () => {
		it('should remove blockquote', () => {
			const content = '> Some markdown';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});

		// test.fixme("should remove multiline blockquote", () => {
		// 	const content = "> Some markdown\n> dada";
		// 	expect(stripMarkdown(content)).toEqual("Some markdowndada");
		// });
	});

	describe('Links', () => {
		it('should remove links and keep link anchor', () => {
			const content = '[Some markdown](http://exmaple.com)';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});
	});

	describe('Comments', () => {
		it('should remove comments', () => {
			const content = 'Some markdown\n<!-- some somment -->';
			expect(stripMarkdown(content)).toEqual('Some markdown');
		});
	});
});

it('it should validate string was translated properly', () => {
	expect(
		validateStringTranslation('%somestr%'),
		'missing translations not allowed'
	).toBeFalsy();
	expect(
		validateStringTranslation('%%'),
		'empty translations not allowed'
	).toBeFalsy();
	expect(
		validateStringTranslation('some%str%'),
		'should be valid'
	).toBeTruthy();
	expect(
		validateStringTranslation('%some%str'),
		'should be valid'
	).toBeTruthy();
	expect(validateStringTranslation('some%str'), 'should be valid').toBeTruthy();
	expect(
		validateStringTranslation('some%%str'),
		'should be valid'
	).toBeTruthy();
});
