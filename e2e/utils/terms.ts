import fs from 'fs';

import { getFrontMatter } from './test-utils';
import { EMPTY_STRING, MD_LINK } from './patterns';

export const invalidTerms = ['index.en.md', 'index.he.md', '.DS_Store'];

export const isValidTerm = (term: string) => invalidTerms.indexOf(term) === -1;

export const getTermSelector = ({ type, key }) =>
	`[data-testid="${type}_${key}"]`;

export interface IAnnotationData {
	key: string;
	content: string;
}
export const getAnnotationsData = (
	locale: string,
	docId: string
): IAnnotationData[] => {
	const annotations = fs.readdirSync(`./public/content/${docId}/annotations`, {
		withFileTypes: false,
	}) as string[];

	return annotations
		.map((term) => {
			if (!isValidTerm(term)) {
				return;
			}
			const { content } = getFrontMatter(
				docId,
				`annotations/${term}/index`,
				locale
			);
			return {
				key: term,
				content,
			};
		})
		.filter(Boolean);
};

export const getGlossaryData = (locale: string) => {
	const glossary = fs.readdirSync('./public/content/glossary', {
		withFileTypes: false,
	}) as string[];

	return glossary
		.map((term) => {
			if (!isValidTerm(term)) {
				return;
			}
			const { data, content } = getFrontMatter(
				'',
				`glossary/${term}/index`,
				locale
			);
			return {
				key: term,
				term_key: data.glossary_key,
				content,
			};
		})
		.filter(Boolean);
};

export const getMarkdownLinks = (content: string, delim: string) => {
	const matches = content.match(MD_LINK);
	const _delim = `](${delim}/`;
	let pool = [];
	let sample = '';
	matches.map((term: string) => {
		if (term.indexOf(_delim) > -1) {
			sample = term
				.split(_delim)[1]
				.replace(_delim, EMPTY_STRING)
				.replace(')', EMPTY_STRING);
			if (pool.indexOf(sample) === -1) {
				pool.push(sample);
			}
		}
	});
	return pool;
};
