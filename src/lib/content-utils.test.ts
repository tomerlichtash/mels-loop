import {} from "ts-jest";
import { contentUtils } from "./content-utils";

describe("Content Utils Tests", () => {
	it("empty input should generate empty output", () => {
		expect(contentUtils.processParseTree(null).length).toBe(0);
	});
});
