import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

import * as mdParser from "simple-markdown"
import { IMLParsedNode, IParsedPageData } from '../interfaces/models';
import { contentUtils } from './content-utils';

const { defaultLocale } = require('../../i18n.json');

const getIndexFileName = (locale: string): string =>
	defaultLocale === locale ? 'index.md' : `index.${locale}.md`;

export function initContentDir(contentId: string) {
	return path.join(process.cwd(), `content/${contentId}`);
}

export function getSortedContentData(contentDir: string, locale: string): IParsedPageData[] {
	// Get file names under /posts
	const contentIds = fs.readdirSync(contentDir);
	console.log(`getting softed content in ${contentDir} for locale ${locale}, found ${contentIds.length} dir entries`)

	const allContentData: IParsedPageData[] = contentIds
		.map((id) => {
			console.log(`Processing content id ${id}`)
			// Read markdown file as string
			const filename = getIndexFileName(locale);
			const fullPath = path.join(contentDir, id, filename);

			if (!fs.existsSync(fullPath)) {
				console.warn(`${fullPath} not found`)
				// return error without disclosing OS path
				return new ParsedPageData({ error: `${fullPath.split(/\/|\\/).slice(-3).join('/')} not found`});
			}

			try {

				const fileContents = fs.readFileSync(fullPath, 'utf8');
				console.log(`Parsing ${fullPath}`)

				// Use gray-matter to parse the post metadata section
				const { data: matterData, content } = matter(fileContents);
				const mdParse = mdParser.defaultBlockParse;
				// parse markdown and process
				const tree = contentUtils.processParseTree(mdParse(content));


				// Combine the data with the id
				return new ParsedPageData({
					id,
					title: matterData.title || "",
					date: parseDate(matterData.date),
					content,
					parsed: tree
				});
			}
			catch(e) {
				console.error(`Error processing ${fullPath}\n${e}`);
				return new ParsedPageData({ error: String(e) })
			}
		})
		// filter out empty items
		.filter(Boolean);
	// Sort posts by date
	return allContentData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllContentIds(contentDir: string, locales: string[]) {
	let paths: { params: { id: string }; locale: string }[] = [];

	const contentIds = fs.readdirSync(contentDir);

	for (let id of contentIds) {
		for (let locale of locales) {
			const fullpath = path.join(contentDir, id, getIndexFileName(locale));
			if (!fs.existsSync(fullpath)) {
				continue;
			}

			paths.push({ params: { id }, locale });
		}
	}

	return paths;
}

export async function getContentData(
	contentDir: string,
	id: string,
	locale: string,
) {
	const fullPath = path.join(contentDir, id, getIndexFileName(locale));
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...(matterResult.data as { date: string; title: string }),
	};
}

function parseDate(dateString: string | null | undefined): Date {
	if (dateString) {
		try {
			const t = Date.parse(dateString);
			return new Date(t);
		}
		catch(e) {
			console.error(`Error parsing date ${dateString}`);
		}
	}
	return new Date();
}


class ParsedPageData implements IParsedPageData {
	constructor(data: Partial<IParsedPageData> | string | null) {
		if (typeof data === "string") {
			Object.assign(this, JSON.parse(data));
		}
		else if (data) {
			Object.assign(this, data);
		}
	}

	public toString() {
		return JSON.stringify(this);
	}
	public id: string = "";
	public date: Date = null;
	public title: string = "";
	public content: string = "";
	public parsed: IMLParsedNode[] = []
	public error?: string = "";

}