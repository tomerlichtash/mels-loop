import { getFrontMatter, isValidTerm } from "./test-utils";

const fs = require("fs");

export const getAnnotationsData = (locale: string) => {
	const annotations = fs.readdirSync("./public/content/annotations", {
		withFileTypes: false,
	});

	return annotations
		.map((term: string) => {
			if (!isValidTerm(term)) {
				return;
			}

			const { content } = getFrontMatter(`annotations/${term}/index`, locale);

			return {
				// type: "annotation",
				key: term,
				content,
			};
		})
		.filter(Boolean);
};

export const getGlossaryData = (locale: string) => {
	const glossary = fs.readdirSync("./public/content/glossary", {
		withFileTypes: false,
	});

	return glossary
		.map((term: string) => {
			if (!isValidTerm(term)) {
				return;
			}

			const { data, content } = getFrontMatter(
				`glossary/${term}/index`,
				locale
			);

			return {
				// type: "glossary",
				key: term,
				term_key: data.glossary_key,
				content,
			};
		})
		.filter(Boolean);
};
