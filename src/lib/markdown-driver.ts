import fs, { Dirent } from "fs";
import path from "path";
import matter from "gray-matter";
import * as mdParser from "simple-markdown";
import {
	IFigureConfiguration,
	IFolderContent,
	ILocaleMap,
	IMLParsedNode,
	IPageMetaData,
	IParsedPageData,
	PageSortField,
	ParsedNode,
} from "../interfaces/models";
import { contentUtils } from "./content-utils";
import { Logger } from "tslog";
// import chalk from "chalk";
import {
	IContentParseOptions,
	LoadContentModes,
	LoadFolderModes,
	MLParseModes,
} from "../interfaces/parser";

import getConfig from "next/config";
import { mlUtils } from "./ml-utils";
const { serverRuntimeConfig } = getConfig();

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

const CONTENT_PATH = "public/content/";

const getIndexFileName = (locale: string): string => `index.${locale}.md`;

let rootDir: string;

function setContentRootDir(root: string): void {
	rootDir = path.join(root, CONTENT_PATH);
}

function getContentRootDir(root?: string): string {
	return root ? path.join(root, CONTENT_PATH) : rootDir;
}

/**
 * Save setting for build time
 */
setContentRootDir(String(serverRuntimeConfig.PROJECT_ROOT));

export interface ILoadContentOptions {
	/**
	 * Defaults to FOLDER
	 */
	readonly loadMode: LoadFolderModes;
	/**
	 * The content path, relative to the content folder
	 */
	readonly relativePath: string;
	/**
	 * If true, iterate over children folders
	 */
	readonly locale: string;
	readonly mode?: Partial<IContentParseOptions>;

	/**
	 * If not empty, use this as the top level folder in which the content folder can be found
	 */
	readonly rootFolder?: string;
}

/**
 * Options for unspecified parse properties
 */
const DEFAULT_PARSE_OPTIONS: IContentParseOptions = {
	contentMode: LoadContentModes.FULL,
	parseMode: MLParseModes.NORMAL,
	nodeProcessors: undefined,
};

export function loadContentFolder(
	options: ILoadContentOptions
): IFolderContent {
	const mode: IContentParseOptions = {
		...DEFAULT_PARSE_OPTIONS,
		...options.mode
	};
	const contentDir = path.join(
		getContentRootDir(options.rootFolder),
		options.relativePath
	);

	if (!fs.existsSync(contentDir)) {
		const paths = [
			path.resolve("./public/content"),
			path.resolve("/public"),
			process.cwd(),
		];
		const diags = paths
			.map((p) => [p, String(fs.existsSync(p))].join(" ->"))
			.join("\n");
		throw new Error(
			`Cannot read files in ${options.rootFolder} (mapped to ${contentDir}),\ntry ${diags}`
		);
	}

	// Get file names under /posts
	const contentNames: Dirent[] = fs.readdirSync(contentDir, {
		withFileTypes: true,
	});
	const folderContentData = new FolderContent();

	// log.info(
	// 	`${chalk.blueBright(
	// 		"collect"
	// 	)} - sorted content in "${contentDir}" for locale "${options.locale}"`
	// );

	const targetFileName = getIndexFileName(options.locale);

	contentNames.forEach((rec: Dirent) => {
		const name = rec.name;
		// log.info(`${chalk.magenta("process")} - content ID "${name}"`);

		let fullPath: string;

		if (options.loadMode === LoadFolderModes.FOLDER) {
			if (targetFileName !== name) {
				return;
			}
			fullPath = path.join(contentDir, name);
		} else {
			if (!rec.isDirectory()) {
				return;
			}

			fullPath = path.join(contentDir, name, targetFileName);

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

		if (mode.contentMode === LoadContentModes.NONE) {
			return;
		}

		try {
			const fileContents = fs.readFileSync(fullPath, "utf8");
			// log.info(`${chalk.green("parse")} - parsed "${fullPath}"`);

			// Use gray-matter to parse the post metadata section
			const { data: matterData, content } = matter(fileContents);
			const metaData = new PageMetaData(matterData);
			const parsedPageData = new ParsedPageData({
				metaData,
				id: name,
				path: `${options.relativePath}/${name}`, // don't use path.join, it's os specific
			});
			folderContentData.pages.push(parsedPageData);
			if (mode.contentMode === LoadContentModes.FULL) {
				// parse markdown and process
				const mdParse = createHtmlMDParser(); //mdParser.defaultBlockParse;
				const tree = contentUtils.processParseTree(
					mdParse(contentUtils.stripComments(content)) as ParsedNode[],
					metaData,
					mode
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
		mlUtils.safeMerge(this, data);
		if (this.date && typeof this.date === "string") {
			this.date = mlUtils.parseDate(this.date);
		}
	}
	public glossary_key = "";
	public date: Date = null;
	public title = "";
	public abstract = "";
	public moto = "";
	public author = "";
	public credits = "";
	public source_url = "";
	public source_name = "";
	public source_author = "";
	public figures: IFigureConfiguration = {
		auto: true,
		base: 1,
		template: "Fig. %index%"
	}
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

// matches basic html strings <tag [attributes]>...</tag> including newlines
// not perfect, in case an attribute value contains /, 
// but the performance would degrade significantly with the alternative

/**
 * Creates an simple-markdown parser that supports simple html and 
 * HTML nodes include the type HTML and a tag field with the HTML tag
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createHtmlMDParser = () => {
	const HTML_RE = /^\s*<([a-z]+)([^>]+)*>([\s\S]*?)<\/\1>/i;
	const HTML_SELFCLOSE_RE = /^\s*<([a-z]+)([^/>]+)*\/>/i;
	const rules = {
		...mdParser.defaultRules,
		// Triple slash comments
		comment: {
			match: function (source: string) {
				return /^\s*\/\/\/([^\n\r]*)/.exec(source);
			},

			parse: function (capture: RegExpExecArray /*, recurseParse, state */) {
				return {
					content: capture[1]
				};
			},
			order: 0
		},
		// html parser
		HTML: {
			match: function (source: string /*, state, lookbehind */) {
				const res = HTML_RE.exec(source)
					|| HTML_SELFCLOSE_RE.exec(source);

				return res;
			},

			parse: function (capture: RegExpExecArray,
				recurseParse: (content: string, state: object) => Array<object>,
				state: object) {
				return {
					tag: capture[1],
					attributes: parseAttributes(capture[2]),
					content: (capture[3] && recurseParse(capture[3], state)) || undefined
				};
			},
			order: 0
		},
		// html parser
		//HTML_SELFCLOSE: {
		//	match: function (source: string /*, state, lookbehind */) {
		//		const res = HTML_SELFCLOSE_RE.exec(source)
		//		//|| HTML_SELFCLOSE_RE.exec(source);

		//		return res;
		//	},

		//	parse: function (capture: RegExpExecArray,
		//		recurseParse: (content: string, state: object) => Array<object>,
		//		state: object) {
		//		return {
		//			type: "HTML",
		//			tag: capture[1],
		//			attributes: parseAttributes(capture[2])
		//		};
		//	},
		//	order: 0
		//}
	};
	return mdParser.parserFor(rules);

}

/**
 * Parses an HTML attribute string
 * Supports only double quotes for attribute value
 * @param attrStr 
 * @returns 
 */
const parseAttributes = (attrStr: string): Map<string, string> => {
	const attrMap = new Map<string, string>;
	if (!attrStr) {
		return attrMap;
	}
	const re = /\s*([a-z][a-z0-9\-_.]+)="([^"]*)"/ig;
	let match: RegExpExecArray;
	while ((match = re.exec(attrStr)) != null) {
		attrMap.set(match[1], match[2]);
	}
	return attrMap;
}