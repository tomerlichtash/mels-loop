import {
	ASTNODE_TYPES,
	IMLParsedNode,
	MLNODE_TYPES,
	ParsedNode,
} from 'types/models';
import { MLParseModes } from 'types/parser';
import {
	AST2MLTypeMap,
	HTML_VALIDATION_MAP,
	NORMAL_MODE_AST_TYPES,
	VALID_PARSE_MODES,
	VERSE_MODE_AST_TYPES,
} from './astTypes';
import { translate } from 'context/locale/translate';
import { getDictionary } from 'context/locale/helpers';
import { LocaleId } from 'types/locale';
import { languages } from 'locale/index';
import { DynamicContentTypes } from 'lib/types';
import { customMarkdownTags } from 'lib/consts';
import { MLParseContext } from './parserContext';

export function toValue<T>(val: T, defaultValue: T | null): T | null {
	return val === undefined ? defaultValue : val;
}

export const MLTYPE_TO_LINK_TEXT_MAP = new Map<MLNODE_TYPES, string>([
	[MLNODE_TYPES.FIGURE, `[[${customMarkdownTags.figureAbbr}]] %index%`],
]);

export function collectText(content: string | ParsedNode): string {
	if (!content) {
		return '';
	}
	if (typeof content === 'string') {
		return content;
	}
	if (content.type === ASTNODE_TYPES.TEXT) {
		return content.content;
	}
	const children = findArrayPart(content);
	if (children) {
		return children.map((child) => collectText(child)).join('');
	}
	return '';
}

export function collectMLNodeText(node: IMLParsedNode): string {
	if (!node) {
		return '';
	}
	if (typeof node === 'string') {
		return node;
	}
	if (node.type === MLNODE_TYPES.TEXT) {
		return node.text;
	}
	if (node.children) {
		return node.children.map((child) => collectMLNodeText(child)).join('');
	}
	return '';
}

export function nodeTypeToMLType(
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
export function extractParseMode(
	node: ParsedNode,
	context: MLParseContext
): MLParseModes {
	if (node.attributes) {
		const attr = node.attributes.get('data-parse-mode');
		if (attr && VALID_PARSE_MODES.has(attr as MLParseModes)) {
			return attr as MLParseModes;
		}
	}
	const type = node.type === ASTNODE_TYPES.HTML ? node.tag : node.type;
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
export function removeNullChildren(node: IMLParsedNode): IMLParsedNode {
	if (!node?.children) {
		return node;
	}
	const validNodes = node.children.filter(Boolean);
	node.children.length = 0;
	node.children.push(...validNodes);
	return node;
}

export function translateString(str: string, locale: LocaleId): string {
	if (!str) {
		return '';
	}
	return str.replace(/\[\[(.+?)\]\]/g, function (m, key: string) {
		return translate(locale, getDictionary(languages))(key);
	});
}

const ANNOTATION_RE = /annotations?\//i;
const GLOSSARY_RE = /glossary\//i;

export const urlToContentType = (
	url: string,
	defaultType: DynamicContentTypes
): DynamicContentTypes => {
	if (!url) {
		return defaultType || DynamicContentTypes.None;
	}
	if (ANNOTATION_RE.test(url)) {
		return DynamicContentTypes.Annotation;
	}
	if (GLOSSARY_RE.test(url)) {
		return DynamicContentTypes.Glossary;
	}
	return defaultType || DynamicContentTypes.None;
};

export const urlToContentId = (url: string) => {
	if (!url) {
		return '';
	}
	const parts = url.split('/');
	const id = parts[parts.length - 1];
	return (id && id.replace('#', '')) || '';
};

export const findArrayPart = (node: ParsedNode): Array<ParsedNode> | null => {
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
};

export const validateHTMLNode = (node: ParsedNode): ParsedNode => {
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
};

export const sanitizeHTML = (node: ParsedNode): ParsedNode => {
	if (node.type === ASTNODE_TYPES.HTML) {
		validateHTMLNode(node);
	}

	const children = findArrayPart(node);
	children && children.forEach((child) => sanitizeHTML(child));

	return node;
};
