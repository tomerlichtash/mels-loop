import { test, expect } from "@playwright/test";
import { sanitizeContent } from "./utils/test-utils";

test.describe("Markdown Test Utils", () => {
	test("it should remove bold", () => {
		const content = "Some *markdown*";
		expect(sanitizeContent(content)).toEqual("Some markdown");
	});

	test("it should remove italics", () => {
		const content = "Some _markdown_";
		expect(sanitizeContent(content)).toEqual("Some markdown");
	});

	test("it should remove blockquote", () => {
		const content = "> Some markdown";
		expect(sanitizeContent(content)).toEqual("Some markdown");
	});

	test("it should remove links and keep link anchor", () => {
		const content = "[Some markdown](http://exmaple.com)";
		expect(sanitizeContent(content)).toEqual("Some markdown");
	});

	test("it should remove comments", () => {
		const content = "Some markdown\n<!-- some somment -->";
		expect(sanitizeContent(content)).toEqual("Some markdown");
	});

	test.describe("Lists", () => {
		test("it should remove ordered list", () => {
			const content = "\n1. First Item\n2. Second Item\n3. Third Item";
			expect(sanitizeContent(content)).toEqual(
				"First ItemSecond ItemThird Item"
			);
		});

		test("it should remove unordered list with dash bullet", () => {
			const content = "\n- First Item\n- Second Item\n- Third Item";
			expect(sanitizeContent(content)).toEqual(
				"First ItemSecond ItemThird Item"
			);
		});

		test("it should remove unordered list with astriek bullet", () => {
			const content = "\n* First Item\n* Second Item\n* Third Item";
			expect(sanitizeContent(content)).toEqual(
				"First Item Second Item Third Item"
			);
		});
	});

	test.fixme("it should not remove a single astriek", () => {
		const content = "Some markdown * has a single astriek";
		expect(sanitizeContent(content), "astriek should not be sanitized").toEqual(
			"Some markdown * has a single astriek"
		);
	});
});
