import { } from "ts-jest"
import { contentUtils } from "./content-utils";

describe("Content Utils Tests", () => {
	test('empty input should generate empty output', () => {
		expect(contentUtils.processParseTree(null).length).toBe(0);
	});
})