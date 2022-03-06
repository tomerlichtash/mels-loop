import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as mdParser from "simple-markdown";
import {
	IFolderContent,
	ILocaleMap,
	IMLParsedNode,
	IPageMetaData,
	IParsedPageData,
	MLParseModes,
	PageSortField,
	ParsedNode,
} from "../interfaces/models";
import { contentUtils } from "./content-utils";
import { LoadFolderModes } from "./next-utils";
import { Logger } from "tslog";
import chalk from "chalk";

const log: Logger = new Logger({
	// name: "logger",
	// instanceName: "MarkdownDriver",
	displayLogLevel: false,
	displayDateTime: false,
	displayRequestId: false,
	displayInstanceName: false,
	displayFunctionName: false,
	displayFilePath: "hidden",
	// printLogMessageInNewLine: true,
	// dateTimePattern: "hour:minute:second",
	// displayTypes: true,
	// colorizePrettyLogs: true,
	// exposeErrorCodeFrame: true,
	// exposeStack: true,
	// setCallerAsLoggerName: true,
});

const getIndexFileName = (locale: string): string => `index.${locale}.md`;

let rootDir: string;

export function setRootDir(root: string): void {
	rootDir = path.join(root, "content/");
}

export function getRootDir(): string {
	return rootDir;
}

setRootDir(process.cwd());

export enum LoadContentModes {
	NONE = "none",
	METADATA = "metadata",
	FULL = "full",
}

export interface ILoadContentOptions {
	/**
	 * The content path, relative to the content folder
	 */
	readonly relativePath: string;
	/**
	 * If true, iterate over children folders
	 */
	readonly loadMode: LoadFolderModes;
	readonly locale: string;
	readonly contentMode: LoadContentModes;
	readonly parseMode: MLParseModes;
}

export function loadContentFolder(
	options: ILoadContentOptions
): IFolderContent {
	const contentDir = path.join(getRootDir(), options.relativePath);

	// Get file names under /posts
	const contentNames = fs.readdirSync(contentDir);
	const folderContentData = new FolderContent();

	log.info(
		`${chalk.blueBright(
			"collect"
		)} - sorted content in "${contentDir}" for locale "${options.locale}"`
	);

	contentNames.forEach((name) => {
		log.info(`${chalk.magenta("process")} - content ID "${name}"`);

		const filename = getIndexFileName(options.locale);
		let fullPath: string;

		if (options.loadMode === LoadFolderModes.FOLDER) {
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
				log.warn(`error - Path not found: "${fullPath}"`);
				// return error without disclosing OS path
				return folderContentData.pages.push(
					new ParsedPageData({
						error: `${fullPath.split(/\/|\\/).slice(-3).join("/")} not found`,
					})
				);
			}
			folderContentData.ids.push({
				params: { id: name },
				locale: options.locale,
			});
		}

		if (options.contentMode === LoadContentModes.NONE) {
			return;
		}

		try {
			const fileContents = fs.readFileSync(fullPath, "utf8");
			log.info(`${chalk.green("parse")} - parsed "${fullPath}"`);

			// Use gray-matter to parse the post metadata section
			const { data: matterData, content } = matter(fileContents);
			const metaData = new PageMetaData(matterData);
			const parsedPageData = new ParsedPageData({
				metaData,
				id: name,
				path: `${options.relativePath}/${name}`, // don't use path.join, it's os specific
			});
			folderContentData.pages.push(parsedPageData);
			if (options.contentMode === LoadContentModes.FULL) {
				// parse markdown and process
				const mdParse = mdParser.defaultBlockParse;
				const tree = contentUtils.processParseTree(
					mdParse(contentUtils.stripComments(content)) as ParsedNode[],
					options.parseMode
				);

				// Combine the data with the id
				parsedPageData.parsed = tree;
			}
		} catch (e) {
			log.error(`Error processing ${fullPath}`, e);
			folderContentData.pages.push(new ParsedPageData({ error: String(e) }));
		}
	});
	// filter out empty items

	return folderContentData;
	// Sort posts by date
}

function parseDate(dateString: string | null | undefined): Date {
	if (dateString) {
		try {
			const t = Date.parse(dateString);
			return new Date(t);
		} catch (e) {
			log.error(`Error parsing date ${dateString}`);
		}
	}
	return new Date();
}

class ParsedPageData implements IParsedPageData {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	constructor(data: any) {
		Object.keys(this).forEach((key) => {
			if (data[key] !== undefined) {
				this[key] = data[key];
			}
		});
	}

	public metaData: IPageMetaData = null;
	public id = "";
	public path = "";
	//public content = "";
	public parsed: IMLParsedNode[] = [];
	public error?: string = "";
}

class PageMetaData implements IPageMetaData {
	constructor(data: Partial<IParsedPageData> | string) {
		const realData = typeof data === "string" ? JSON.parse(data) : data;
		Object.keys(this).forEach((key) => {
			if (realData[key] !== undefined) {
				this[key] = realData[key];
			}
		});
		if (this.date && typeof this.date === "string") {
			this.date = parseDate(this.date);
		}
	}
	public glossary_key = "";
	public glossary_term = "";
	public date: Date = null;
	public title = "";
	public moto = "";
	public author = "";
	public credits = "";
	public source_url = "";
	public source_name = "";
	public source_author = "";
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
