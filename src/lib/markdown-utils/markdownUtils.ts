import { MLParseContext } from 'lib/parserContext';
import { VALID_PARSE_MODES } from 'lib/parseModes';
import * as mdParser from 'simple-markdown';
import { ASTNODE_TYPES, MLNODE_TYPES } from 'types/nodes';
import {
	AST2MLTypeMap,
	HTML_VALIDATION_MAP,
	NORMAL_MODE_AST_TYPES,
	VERSE_MODE_AST_TYPES,
} from './nodeTypes';
import { MLParseModes } from 'types/parser/modes';
import type { IMLParsedNode, ParsedNode } from 'types/models';
import { _translate } from "lib/locale/translate";
import { Languages } from "lib/locale"
import { LocaleId } from '../../types';

export interface IMarkdownUtils {
	/**
	 * Strips xml comments from the string
	 * @param source
	 */
	stripComments(source: string): string;
	getIndexFileName(locale: string): string;
	toValue<T>(val: T, defaultValue: T | null): T | null;
	collectText(content: string | ParsedNode): string;
	collectMLNodeText(node: IMLParsedNode): string;
	nodeTypeToMLType(
		nodeName: ASTNODE_TYPES,
		context: MLParseContext
	): MLNODE_TYPES;
	extractParseMode(node: ParsedNode, context: MLParseContext): MLParseModes;
	removeNullChildren(node: IMLParsedNode): IMLParsedNode;
	findArrayPart(node: ParsedNode): Array<ParsedNode> | null;
	collectMLNodeText(node: IMLParsedNode): string;
	translateString(str: string, locale: LocaleId): string;
	sanitizeHTML(node: ParsedNode): ParsedNode;
	createHtmlMDParser(): mdParser.Parser;
}

const TRANSLATED_STRING_REGEXP = /\[\[(.+?)\]\]/g;

/**
 * Parses an HTML attribute string
 * Supports only double quotes for attribute value
 * @param attrStr
 * @returns
 */
const parseAttributes = (attrStr: string): Map<string, string> => {
	const attrMap = new Map<string, string>();
	if (!attrStr) {
		return attrMap;
	}
	const re = /\s*([a-z][a-z0-9\-_.]+)="([^"]*)"/gi;
	let match: RegExpExecArray;
	while ((match = re.exec(attrStr)) != null) {
		attrMap.set(match[1], match[2]);
	}
	return attrMap;
};

class MarkdownUtils implements IMarkdownUtils {
	public getIndexFileName(locale: string): string {
		return `index.${locale}.md`;
	}

	public toValue<T>(val: T, defaultValue: T | null): T | null {
		return val === undefined ? defaultValue : val;
	}

	/**
	 * Strips HTML comments from the source string
	 * @param source
	 * @returns stripped string
	 */
	public stripComments(source: string): string {
		return (source || '').replace(/<!---?\s.*\s-?-->/g, '');
	}

	public collectText(content: string | ParsedNode): string {
		if (!content) {
			return '';
		}

		if (typeof content === 'string') {
			return content;
		}

		if (content.type as string === ASTNODE_TYPES.TEXT as string) {
			return content.content;
		}

		const children = this.findArrayPart(content);

		if (children) {
			return children.map((child) => this.collectText(child)).join('');
		}

		return '';
	}

	public collectMLNodeText(node: IMLParsedNode): string {
		if (!node) {
			return '';
		}

		if (typeof node === 'string') {
			return node;
		}

		if (node.type as string === MLNODE_TYPES.TEXT as string) {
			return node.text;
		}

		if (node.children) {
			return node.children
				.map((child) => this.collectMLNodeText(child))
				.join('');
		}

		return '';
	}

	public nodeTypeToMLType(
		nodeName: ASTNODE_TYPES,
		context: MLParseContext
	): MLNODE_TYPES {
		void context;
		if (!nodeName) {
			return MLNODE_TYPES.UNKNOWN;
		}

		return (
			AST2MLTypeMap.get(nodeName) || nodeName
		).toLowerCase() as MLNODE_TYPES;
	}

	/**
	 * Returns the parse mode set in the node's attributes, otherwise if there's a mapping
	 * for the node's type, its value, otherwise the mode set in the provided context.
	 * @param node
	 * @param context
	 * @returns
	 */
	public extractParseMode(
		node: ParsedNode,
		context: MLParseContext
	): MLParseModes {
		if (node.attributes) {
			const attr = node.attributes.get('data-parse-mode');
			if (attr && VALID_PARSE_MODES.has(attr as MLParseModes)) {
				return attr as MLParseModes;
			}
		}
		const type = node.type as string === ASTNODE_TYPES.HTML as string ? node.tag : node.type;
		if (VERSE_MODE_AST_TYPES.has(type as ASTNODE_TYPES)) {
			return MLParseModes.VERSE;
		}
		if (NORMAL_MODE_AST_TYPES.has(type as ASTNODE_TYPES)) {
			return MLParseModes.NORMAL;
		}

		return context.mode.parseMode;
	}

	/**
	 * @param node
	 */
	public removeNullChildren(node: IMLParsedNode): IMLParsedNode {
		if (!node?.children) {
			return node;
		}
		const validNodes = node.children.filter(Boolean);
		node.children.length = 0;
		node.children.push(...validNodes);
		return node;
	}
	public translateString(str: string, locale: string): string {
		if (!str) {
			return '';
		}
		return str.replace(TRANSLATED_STRING_REGEXP, function (m, key: string) {
			return _translate(locale, Languages)(key);
		});
	}
	


	public findArrayPart(node: ParsedNode): Array<ParsedNode> | null {
		if (Array.isArray(node.items)) {
			return node.items;
		}

		if (Array.isArray(node.content)) {
			return node.content;
		}

		if (Array.isArray(node)) {
			return node;
		}

		return null;
	}

	public sanitizeHTML(node: ParsedNode): ParsedNode {
		if (node.type as string === ASTNODE_TYPES.HTML as string) {
			this.validateHTMLNode(node);
		}

		const children = this.findArrayPart(node);
		children && children.forEach((child) => this.sanitizeHTML(child));

		return node;
	}

	public createHtmlMDParser() {
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
						content: capture[1],
					};
				},
				order: 0,
			},
			// html parser
			HTML: {
				match: function (source: string /*, state, lookbehind */) {
					const res = HTML_RE.exec(source) || HTML_SELFCLOSE_RE.exec(source);

					return res;
				},

				parse: function (
					capture: RegExpExecArray,
					recurseParse: (content: string, state: object) => Array<object>,
					state: object
				) {
					return {
						tag: capture[1],
						attributes: parseAttributes(capture[2]),
						content:
							(capture[3] && recurseParse(capture[3], state)) || undefined,
					};
				},
				order: 0,
			},
		};

		return mdParser.parserFor(rules);
	}

	private validateHTMLNode(node: ParsedNode): ParsedNode {
		const tag: string = ((node.tag as string) || '').toUpperCase();
		const children: Array<ParsedNode> = node.content;
		const rec = Array.isArray(children) && HTML_VALIDATION_MAP[tag];

		if (rec && rec.valid) {
			const filtered = children.filter((child) => {
				return rec.valid.includes((child.tag || child.type).toUpperCase());
			});

			if (filtered.length !== children.length) {
				node.content.length = 0;
				node.content.push(...filtered);
			}
		}

		return node;
	}
}

export const mdUtils: IMarkdownUtils = new MarkdownUtils();
