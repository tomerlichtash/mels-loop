import { it, describe, expect } from "vitest";
import { validateRequest } from "../src/pages/api/sendgrid";

describe("validateRequest", () => {
	it("should allow normal content", () => {
		const res = validateRequest({
			fullname: "Ed Nather",
			email: "nather@astro.as.utexas.edu",
			message: "Some message",
		});
		expect(res.fullname).toEqual("Ed Nather");
		expect(res.email).toEqual("nather@astro.as.utexas.edu");
		expect(res.message).toEqual("Some message");
	});

	it("should allow maximum length of 100 chars to fullname", () => {
		const invalid = Array(300).fill("X").join("");

		const res = validateRequest({
			fullname: invalid,
			email: "nather@astro.as.utexas.edu",
			message: "Some message",
		});

		expect(res.fullname.length).toEqual(100);
	});

	it("should allow maximum length of 256 chars to email address", () => {
		const invalid = Array(300).fill("X").join("");

		const res = validateRequest({
			fullname: "Ed Nather",
			email: invalid,
			message: "Some message",
		});

		expect(res.email.length).toEqual(256);
	});

	it("should allow maximum length of 4096 chars to message body", () => {
		const invalid = Array(5000).fill("X").join("");

		const res = validateRequest({
			fullname: "Ed Nather",
			email: "nather@astro.as.utexas.edu",
			message: invalid,
		});

		expect(res.message.length).toEqual(4096);
	});
});
