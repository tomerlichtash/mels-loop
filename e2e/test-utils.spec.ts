import { test, expect } from "@playwright/test";
import { getMarkdownLinks } from "./utils/terms";
import {
	baseDir,
	getFrontMatter,
	getLocalePath,
	stripMarkdown,
} from "./utils/test-utils";
import { ASTRIEK_MOCK, EMPTY_STRING } from "./utils/patterns";
const whitespace = "    ";

test("getMarkdownLinks", () => {
	const mdMock =
		"some text with [link](delim1/someValue) and [another link](delim2/anotherValue) of other type";
	const delim1val = getMarkdownLinks(mdMock, "delim1");
	const delim2val = getMarkdownLinks(mdMock, "delim2");
	expect(delim1val, "it should return values for delim type").toEqual([
		"someValue",
	]);
	expect(delim2val, "it should return values for delim type").toEqual([
		"anotherValue",
	]);
});

test("getFrontMatter", () => {
	const { data, content } = getFrontMatter("codex/index", "en");
	expect(data.title, "it should return frontmatter").toEqual(
		"The Story of Mel"
	);
	expect(content.length, "it should return content").toBeGreaterThan(0);
});

test.describe("getLocalePath", () => {
	test("Default Path", () => {
		const path = getLocalePath("en", "somePath");
		expect(path, "it should return default locale path").toEqual(
			`${baseDir}/somePath`
		);
	});

	test("Localed Path", () => {
		const path = getLocalePath("someLocale", "somePath");
		expect(path, "should return path with locale ID").toEqual(
			`${baseDir}/someLocale/somePath`
		);
	});
});

test.describe("stripMarkdown", () => {
	test.describe("Bold", () => {
		test("it should remove bold", () => {
			const content = "Some *markdown*";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});

		test("it should remove double astriek", () => {
			const content = "Some **markdown**";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});

		test("it should convert single astrieks to literals", () => {
			const content = "Some markdown * can have a single astriek";
			expect(
				stripMarkdown(content),
				"it should replace mid-astrick with mock"
			).toEqual(`Some markdown ${ASTRIEK_MOCK} can have a single astriek`);
		});
	});

	test.describe("Italics", () => {
		test("it should remove italics", () => {
			const content = "Some _markdown_";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});

		test.fixme("it should not remove underscores", () => {
			const content = "Some __markdown__";
			expect(stripMarkdown(content)).toEqual("Some __markdown__");
		});
	});

	test.describe("Paragraphs", () => {
		test("it should join paragraphs", () => {
			const content = "par1\npar2\npar3";
			expect(stripMarkdown(content)).toEqual("par1par2par3");
		});

		test("it should join spaced paragraphs", () => {
			const content = "par1\n\npar2\n\npar3";
			expect(stripMarkdown(content)).toEqual("par1par2par3");
		});
	});

	test.describe("Lists", () => {
		test.fixme("it should remove ordered list in first line", () => {
			const content = "1. First Item\n2. Second Item\n3. Third Item";
			expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
		});

		test("it should remove ordered list in a new line", () => {
			const content = "\n1. First Item\n2. Second Item\n3. Third Item";
			expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
		});

		test("it should remove unordered list with dash bullet", () => {
			const content = "\n- First Item\n- Second Item\n- Third Item";
			expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
		});

		test("it should remove unordered list with astriek bullet", () => {
			const content = "\n* First Item\n* Second Item\n* Third Item";
			expect(stripMarkdown(content)).toEqual("First ItemSecond ItemThird Item");
		});
	});

	test.describe("Whitespace", () => {
		test("it should trim spaces for single lines", () => {
			const content = [
				EMPTY_STRING,
				"Some",
				"markdown",
				EMPTY_STRING,
				"and",
				EMPTY_STRING,
				"some",
				"more",
				EMPTY_STRING,
			].join(whitespace);
			expect(stripMarkdown(content)).toEqual(
				[
					"Some",
					"markdown",
					EMPTY_STRING,
					"and",
					EMPTY_STRING,
					"some",
					"more",
				].join(whitespace)
			);
		});

		test("it should trim spaces for paragraphs", () => {
			const content = [
				EMPTY_STRING,
				"\n",
				"Some",
				"markdown",
				EMPTY_STRING,
				"and",
				EMPTY_STRING,
				"some",
				"more",
				EMPTY_STRING,
				"\n",
			].join(whitespace);
			expect(stripMarkdown(content)).toEqual(
				[
					"Some",
					"markdown",
					EMPTY_STRING,
					"and",
					EMPTY_STRING,
					"some",
					"more",
				].join(whitespace)
			);
		});
	});

	test.describe("Code Block", () => {
		test.fixme("it should remove code blocks", () => {
			const content = "```Some code block```";
			expect(stripMarkdown(content)).toEqual("Some code block");
		});

		test.fixme("it should remove code blocks with languages prefix", () => {
			const content = "```js\nSome code block\n```";
			expect(stripMarkdown(content)).toEqual("Some code block");
		});
	});

	test.describe("Blockquote", () => {
		test("it should remove blockquote", () => {
			const content = "> Some markdown";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});

		test.fixme("it should remove multiline blockquote", () => {
			const content = "> Some markdown\n> dada";
			expect(stripMarkdown(content)).toEqual("Some markdowndada");
		});
	});

	test.describe("Links", () => {
		test("it should remove links and keep link anchor", () => {
			const content = "[Some markdown](http://exmaple.com)";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});
	});

	test.describe("Comments", () => {
		test("it should remove comments", () => {
			const content = "Some markdown\n<!-- some somment -->";
			expect(stripMarkdown(content)).toEqual("Some markdown");
		});
	});
});
