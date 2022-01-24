import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as mdParser from "simple-markdown";
import {
	IFolderContent,
	ILocaleMap,
	IMLParsedNode,
	IParsedPageData,
	PageSortField,
} from "../interfaces/models";
import { contentUtils } from "./content-utils";

const getIndexFileName = (locale: string): string => `index.${locale}.md`;

let rootDir: string;

export function setRootDir(root: string): void {
	rootDir = path.join(root, "content/");
}

export function getRootDir(): string {
	return rootDir;
}

setRootDir(process.cwd());

const consoleMsg = (msg: string, color: number) =>
	`\x1b[${color}m${msg}\x1b[0m`;

export interface ILoadContentOptions {
	/**
	 * The content path, relative to the content folder
	 */
	readonly relativePath: string;
	/**
	 * If true, iterate over children folders
	 */
	readonly type: "children" | "folder";
	readonly locale: string;
	readonly loadContent?: boolean;
}

export function loadContentFolder(
	options: ILoadContentOptions
): IFolderContent {
	const contentDir = path.join(getRootDir(), options.relativePath);
	// Get file names under /posts
	const contentNames = fs.readdirSync(contentDir);
	console.log(
		`\n${consoleMsg(
			"collect",
			41
		)} - Sorted content in "${contentDir}" for locale "${options.locale}" (${
			contentNames.length
		} dir entries)`
	);

	const ret = new FolderContent();

	contentNames.forEach((name) => {
		console.log(
			`${consoleMsg("process", 44)} - Processing content ID "${name}"`
		);
		const filename = getIndexFileName(options.locale);
		let fullPath: string;
		if (options.type === "folder") {
			if (filename !== name) {
				return;
			}
			fullPath = path.join(contentDir, name);
		} else {
			// read children
			// Read markdown file as string
			const childPath = path.join(contentDir, name);
			const stat = fs.lstatSync(childPath);
			if (!stat.isDirectory()) {
				return;
			}

			fullPath = path.join(contentDir, name, filename);
			if (!fs.existsSync(fullPath)) {
				console.warn(`${consoleMsg("Path not found", 45)} - "${fullPath}"`);
				// return error without disclosing OS path
				return ret.pages.push(
					new ParsedPageData({
						error: `${fullPath.split(/\/|\\/).slice(-3).join("/")} not found`,
					})
				);
			}
			ret.ids.push({ params: { id: name }, locale: options.locale });
		}
		if (options.loadContent === false) {
			return;
		}
		try {
			const fileContents = fs.readFileSync(fullPath, "utf8");
			console.log(`${consoleMsg("parse", 45)} - Parsed "${fullPath}"`);

			// Use gray-matter to parse the post metadata section
			const { data: matterData, content } = matter(fileContents);
			const mdParse = mdParser.defaultBlockParse;
			// parse markdown and process
			const tree = contentUtils.processParseTree(mdParse(content));

			// Combine the data with the id
			ret.pages.push(
				new ParsedPageData({
					id: name,
					title: matterData.title || "",
					date: parseDate(matterData.date as string),
					moto: matterData.moto || "",
					credits: matterData.credits || "",
					content,
					parsed: tree,
				})
			);
		} catch (e) {
			console.error(`Error processing ${fullPath}\n`, e);
			ret.pages.push(new ParsedPageData({ error: String(e) }));
		}
	});
	// filter out empty items

	return ret;
	// Sort posts by date
}

function parseDate(dateString: string | null | undefined): Date {
	if (dateString) {
		try {
			const t = Date.parse(dateString);
			return new Date(t);
		} catch (e) {
			console.error(`Error parsing date ${dateString}`);
		}
	}
	return new Date();
}

class ParsedPageData implements IParsedPageData {
	constructor(data: Partial<IParsedPageData> | string | null) {
		if (typeof data === "string") {
			Object.assign(this, JSON.parse(data));
		} else if (data) {
			Object.assign(this, data);
		}
	}

	public toString() {
		return JSON.stringify(this);
	}
	public id = "";
	public date: Date = null;
	public title = "";
	public moto = "";
	public author = "";
	public credits = "";
	public content = "";
	public parsed: IMLParsedNode[] = [];
	public error?: string = "";
}

class FolderContent implements IFolderContent {
	public pages: IParsedPageData[] = [];

	public ids: ILocaleMap[] = [];
	public paths: string[];
	sortOn(field: PageSortField): IParsedPageData[] {
		if (!this.pages) {
			return [];
		}
		const key = String(field);
		return this.pages.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
	}
}
