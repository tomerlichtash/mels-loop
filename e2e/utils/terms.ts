import { getFrontMatter, isValidTerm } from "./test-utils";

const fs = require("fs");

export const getAnnotationsData = () => {
	const annotations = fs.readdirSync("./public/content/annotations", {
		withFileTypes: false,
	});

	return annotations
		.map((term: string) => {
			if (!isValidTerm(term)) {
				return;
			}
			return {
				type: "annotation",
				key: term,
			};
		})
		.filter(Boolean);
};

export const getGlossaryData = () => {
	const glossary = fs.readdirSync("./public/content/glossary", {
		withFileTypes: false,
	});

	return glossary
		.map((term: string) => {
			if (!isValidTerm(term)) {
				return;
			}

			const data = getFrontMatter(`glossary/${term}/index`, "en");

			return {
				type: "glossary",
				key: term,
				term_key: data.glossary_key,
			};
		})
		.filter(Boolean);
};
