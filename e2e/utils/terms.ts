import { getFrontMatter } from "./test-utils";
import type { ITermTestData } from "./types";
import { GET_MD_LINKS } from "./validators";

const fs = require("fs");

const invalidTerms = ["index.en.md", "index.he.md", ".DS_Store"];

export const isValidTerm = (term: string) => invalidTerms.indexOf(term) === -1;

export const getTermSelector = ({ type, key }: ITermTestData) =>
	`[data-test-annotation-type="${type}"][data-test-target="${key}"]`;

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

export const getCodexAnnotationTerms = () => {
	const { content } = getFrontMatter("codex/index", "en");
	const matches = content.match(GET_MD_LINKS);
	let glossary = [];
	let annotations = [];
	let sample = "";
	matches.map((term: string) => {
		if (term.indexOf("[^](annotations/") === 0) {
			sample = term.replace("[^](annotations/", "").replace(")", "");
			if (annotations.indexOf(sample) === -1) {
				annotations.push(sample);
			}
		} else {
			sample = term.split("](glossary/")[1].replace(")", "");
			if (glossary.indexOf(sample) === -1) {
				glossary.push(sample);
			}
		}
	});
	return { annotations, glossary };
};

export const getMarkdownLinks = (
	path: string,
	delim: string,
	locale: string
) => {
	const { content } = getFrontMatter(path, locale);
	const matches = content.match(GET_MD_LINKS);
	const _delim = `](${delim}/`;
	let pool = [];
	let sample = "";
	matches.map((term: string) => {
		if (term.indexOf(_delim) > -1) {
			sample = term.split(_delim)[1].replace(_delim, "").replace(")", "");
			if (pool.indexOf(sample) === -1) {
				pool.push(sample);
			}
		}
	});
	return pool;
};
