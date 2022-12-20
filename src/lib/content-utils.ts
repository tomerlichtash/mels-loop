import {
	DynamicContentTypes,
	IDynamicContentRecord,
} from "../interfaces/dynamic-content";
import {
	ASTNODE_TYPES,
	IMLParsedNode,
	IPageMetaData,
	MLNODE_TYPES,
	NODE_DISPLAY_TYPES,
	ParsedNode,
} from "../interfaces/models";
import {
	IContentParseOptions,
	INodeProcessorContext,
	MLNodeProcessorFunction,
	MLParseModes,
} from "../interfaces/parser";
import { CaseInsensitiveMap } from "./case-insensitive-collections";
import { mlUtils } from "./ml-utils";
import { Languages } from "../locales";
import { _translate } from "../locales/translate";

/**
 * Functions for processing parsed markdown nodes and maybe more
 */
export interface IContentUtils {
	/**
	 * Convert a markdown parse tree (tree of AST nodes) to a ML parse tree (tree of IMLParsedNode)
	 * @param nodes
	 * @param mode Various parse options
	 */
	processParseTree(
		nodes: ParsedNode[],
		metaData: IPageMetaData,
		mode: IContentParseOptions
	): IMLParsedNode[];

	/**
	 * Strips xml comments from the string
	 * @param source
	 */
	stripComments(source: string): string;

	/**
	 * Creates a content mapping function (maps node => node) only for the provided types
	 * @param filter
	 * @param types
	 */
	createNodeMappingFilter(
		filter: MLNodeProcessorFunction,
		...types: Array<MLNODE_TYPES>
	): MLNodeProcessorFunction;

	/**
	 * Marks links as popovers for the links that match the provided dynamic content types.
	 *
	 * If not types are provided, glossary and annotations are assumed
	 * @param types
	 */
	createPopoverLinksMappingFilter(
		...types: DynamicContentTypes[]
	): MLNodeProcessorFunction;

	/**
	 * Extract content type and id from a url, with a default content type
	 * @param url
	 * @param defaultType
	 */
	urlToContentData(
		url: string,
		defaultType?: DynamicContentTypes
	): IDynamicContentRecord;
}

type ParsedNodeProcessor = (
	node: ParsedNode,
	context: MLParseContext
) => IMLParsedNode;

interface IFigureInfo {
	readonly index: number;
	readonly realIndex: number;
	readonly id: string;
}

const INDEX_RE = /%index%/i;

const VALID_PARSE_MODES: Set<MLParseModes> = new Set<MLParseModes>([
	MLParseModes.NORMAL, MLParseModes.VERSE
])

const AST2MLTypeMap: Map<ASTNODE_TYPES, MLNODE_TYPES> = new Map<
	ASTNODE_TYPES,
	MLNODE_TYPES
>([
	[ASTNODE_TYPES.PARAGRAPH, MLNODE_TYPES.PARAGRAPH],
	[ASTNODE_TYPES.LINK, MLNODE_TYPES.LINK],
	[ASTNODE_TYPES.IMAGE, MLNODE_TYPES.IMAGE],
	[ASTNODE_TYPES.TEXT, MLNODE_TYPES.TEXT],
	[ASTNODE_TYPES.STRONG, MLNODE_TYPES.STRONG],
	[ASTNODE_TYPES.EM, MLNODE_TYPES.EM],
	[ASTNODE_TYPES.LIST, MLNODE_TYPES.LIST],
	[ASTNODE_TYPES.LIST_ITEM, MLNODE_TYPES.LIST_ITEM],
	[ASTNODE_TYPES.CODE, MLNODE_TYPES.CODE],
	[ASTNODE_TYPES.INLINECODE, MLNODE_TYPES.CODE],
	[ASTNODE_TYPES.CODEBLOCK, MLNODE_TYPES.CODEBLOCK],
	[ASTNODE_TYPES.BLOCK_QUOTE, MLNODE_TYPES.BLOCKQUOTE],
]);

const INLINE_AST_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.TEXT,
	ASTNODE_TYPES.LINK,
	ASTNODE_TYPES.EM,
	ASTNODE_TYPES.INLINECODE,
	ASTNODE_TYPES.STRONG,
	ASTNODE_TYPES.IMAGE,
	ASTNODE_TYPES.INS,
	ASTNODE_TYPES.DEL,
	ASTNODE_TYPES.SUB,
	ASTNODE_TYPES.SUP,
]);

const INLINE_MLNODE_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>([
	MLNODE_TYPES.TEXT,
	MLNODE_TYPES.LINK,
	MLNODE_TYPES.EM,
	MLNODE_TYPES.CODE,
	MLNODE_TYPES.STRONG,
	MLNODE_TYPES.IMAGE,
	MLNODE_TYPES.INS,
	MLNODE_TYPES.DEL,
	MLNODE_TYPES.SUB,
	MLNODE_TYPES.SUP,
	MLNODE_TYPES.CITE,
	MLNODE_TYPES.LINE,
]);

/**
 * Elements that contain only text
 */
const TEXT_NODE_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>([
	MLNODE_TYPES.TEXT,
	MLNODE_TYPES.CODE,
]);

/**
 * Elements that should contain text directly, without an enclosing paragraph
 */
const TEXT_CONTAINER_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.HEADING,
]);

const IGNORED_AST_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.NEWLINE,
]);

const NO_PARAGRAPH_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>([
	MLNODE_TYPES.BLOCKQUOTE,
]);

const HTML_VALIDATION_MAP = {
	TR: {
		valid: ["TD", "TH"],
	},
	TABLE: {
		valid: ["TBODY", "TR"],
	},
};

/**
 * Node types in which we enforce verse mode
 */
const VERSE_MODE_AST_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.CODEBLOCK,
]);

/**
 * Node types in which we enforce normal (non-verse) parse mode
 */
const NORMAL_MODE_AST_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.HEADING,
]);

/**
 * Node types that should be promoted to a figure if their only content is an image
 */
const FIGURE_CONTAINER_TYPES: Map<MLNODE_TYPES, boolean> = new Map<
	MLNODE_TYPES,
	boolean
>([
	[MLNODE_TYPES.LINE, true],
	[MLNODE_TYPES.PARAGRAPH, true],
]);

function toValue<T>(val: T, defaultValue: T | null): T | null {
	return val === undefined ? defaultValue : val;
}

const MLTYPE_TO_LINK_TEXT_MAP = new Map<MLNODE_TYPES, string>([
	[MLNODE_TYPES.FIGURE, "[[FIGURE_ABBR]] %index%"],
]);

function collectText(content: string | ParsedNode): string {
	if (!content) {
		return "";
	}
	if (typeof content === "string") {
		return content;
	}
	if (content.type === ASTNODE_TYPES.TEXT) {
		return content.content;
	}
	const children = findArrayPart(content);
	if (children) {
		return children.map((child) => collectText(child)).join("");
	}
	return "";
}

function collectMLNodeText(node: IMLParsedNode): string {
	if (!node) {
		return "";
	}
	if (typeof node === "string") {
		return node;
	}
	if (node.type === MLNODE_TYPES.TEXT) {
		return node.text;
	}
	if (node.children) {
		return node.children.map((child) => collectMLNodeText(child)).join("");
	}
	return "";
}

function nodeTypeToMLType(
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
function extractParseMode(
	node: ParsedNode,
	context: MLParseContext
): MLParseModes {
	if (node.attributes) {
		const attr = node.attributes.get("data-parse-mode");
		if (attr && VALID_PARSE_MODES.has(attr as MLParseModes)) {
			return attr as MLParseModes;
		}
	}
	const type = node.type === ASTNODE_TYPES.HTML ?
		node.tag : node.type;
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
function removeNullChildren(node: IMLParsedNode): IMLParsedNode {
	if (!node?.children) {
		return node;
	}
	const validNodes = node.children.filter(Boolean);
	node.children.length = 0;
	node.children.push(...validNodes);
	return node;
}

function translateString(str: string, locale: string): string {
	if (!str) {
		return "";
	}
	return str.replace(/\[\[(.+?)\]\]/g, function (m, key: string) {
		return _translate(locale, Languages)(key);
	});
}

const ANNOTATION_RE = /annotations?\//i;
const GLOSSARY_RE = /glossary\//i;

const urlToContentType = (
	url: string,
	defaultType: DynamicContentTypes
): DynamicContentTypes => {
	if (!url) {
		return defaultType || DynamicContentTypes.None;
	}
	if (ANNOTATION_RE.test(url)) {
		return DynamicContentTypes.Annotation;
	}
	if (GLOSSARY_RE.test(url) || url[0] === "#") {
		return DynamicContentTypes.Glossary;
	}
	return defaultType || DynamicContentTypes.None;
};

const urlToContentId = (url: string) => {
	if (!url) {
		return "";
	}
	const parts = url.split("/");
	const id = parts[parts.length - 1];
	return (id && id.replace("#", "")) || "";
};

const findArrayPart = (node: ParsedNode): Array<ParsedNode> | null => {
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

const validateHTMLNode = (node: ParsedNode): ParsedNode => {
	const tag: string = ((node.tag as string) || "").toUpperCase();
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

const sanitizeHTML = (node: ParsedNode): ParsedNode => {
	if (node.type === ASTNODE_TYPES.HTML) {
		validateHTMLNode(node);
	}

	const children = findArrayPart(node);
	children && children.forEach((child) => sanitizeHTML(child));

	return node;
};

class ContentUtils implements IContentUtils {
	private readonly nodeProcessorMap: { [name: string]: ParsedNodeProcessor };

	constructor() {
		this.nodeProcessorMap = {
			list: this.processListNode.bind(this),
			def: this.processLinkDefinition.bind(this),
		};
	}

	public createPopoverLinksMappingFilter(
		...types: DynamicContentTypes[]
	): MLNodeProcessorFunction {
		if (!types || !types.length) {
			types = [DynamicContentTypes.Annotation, DynamicContentTypes.Glossary];
		}
		const linkProcessor: MLNodeProcessorFunction = (node, context) => {
			const linkData = contentUtils.urlToContentData(node.target);
			if (!types.includes(linkData.type)) {
				return node;
			}
			const nodeData: Partial<IMLParsedNode> = {
				displayType: NODE_DISPLAY_TYPES.POPOVER,
				linkType: linkData.type,
				occurrenceIndex:
					context.getEnumerator(`${node.line}_${node.target}`) + 1,
				sequence: context.getEnumerator(linkData.type) + 1,
			};
			return { ...node, ...nodeData };
		};
		return this.createNodeMappingFilter(linkProcessor, MLNODE_TYPES.LINK);
	}

	public urlToContentData(
		url: string,
		defaultType?: DynamicContentTypes
	): IDynamicContentRecord {
		const contentData = {
			type: urlToContentType(url, defaultType),
			id: urlToContentId(url),
			isRelative: false,
		};
		if (contentData.type !== DynamicContentTypes.None) {
			contentData.isRelative = url[0] !== "/";
		}
		return contentData;
	}

	public createNodeMappingFilter(
		filter: MLNodeProcessorFunction,
		...types: Array<MLNODE_TYPES>
	): MLNodeProcessorFunction {
		if (!types || !types.length) {
			return (n) => n;
		}
		const typeMap = mlUtils.stringArrayToMap(types);
		return (node: IMLParsedNode, context: INodeProcessorContext) => {
			if (!node || !(node.type in typeMap)) {
				return null;
			}
			return filter(node, context);
		};
	}

	/**
	 * Strips HTML comments from the source string
	 * @param source
	 * @returns stripped string
	 */
	public stripComments(source: string): string {
		return (source || "").replace(/<!---?\s.*\s-?-->/g, "");
	}

	public processParseTree(
		nodes: ParsedNode[],
		metaData: IPageMetaData,
		mode: IContentParseOptions
	): IMLParsedNode[] {
		if (!nodes || !nodes.length) {
			return [];
		}
		const parseContext = new MLParseContext(mode, metaData);
		const result = nodes
			.map((node) => this.processOneASTNode(node, parseContext))
			.filter(Boolean);
		result.forEach((r) => this.updateLinksInNode(r, parseContext));
		this.promoteInlines(result, parseContext);
		result.forEach((r) => this.tryProcessFigure(r, parseContext));
		const nodesIdMap = new CaseInsensitiveMap<IMLParsedNode>();
		result.forEach((r) => this.processElementIds(r, parseContext, nodesIdMap));
		result.forEach((r) => this.processIdLinks(r, parseContext, nodesIdMap));
		return this.applyNodeProcessors(result, parseContext);
	}

	private isTextContainer(nodeOrType: ParsedNode | ASTNODE_TYPES): boolean {
		const type: ASTNODE_TYPES =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return TEXT_CONTAINER_TYPES.has(type);
	}

	private isInlineParsedNode(node: ParsedNode): boolean {
		return INLINE_AST_TYPES.has(node?.type);
	}

	private isInlineMLNode(node: IMLParsedNode): boolean {
		return INLINE_MLNODE_TYPES.has(node?.type);
	}

	private isIgnoredASTNode(node: ParsedNode): boolean {
		return IGNORED_AST_TYPES.has(node?.type);
	}

	private processOneASTNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (this.isIgnoredASTNode(node)) {
			return null;
		}
		node = sanitizeHTML(node);
		if (Array.isArray(node.items || node.content)) {
			return this.parsedNodeToMLNode(
				this.processTextChildren(node, context),
				context
			);
		} else {
			const processor = this.nodeProcessorMap[node.type];
			if (processor) {
				return processor(node, context);
			}
			return {
				type: nodeTypeToMLType(node.type, context),
				key: context.indexer.nextKey(),
				line: context.indexer.nextLine(),
				text: String(node.content),
			};
		}
	}

	private parsedNodeToMLNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (this.isIgnoredASTNode(node)) {
			return null;
		}
		const isHTML = node.type === ASTNODE_TYPES.HTML,
			mlType: MLNODE_TYPES = isHTML
				? node.tag?.toLowerCase()
				: nodeTypeToMLType(node.type, context);
		if (!mlType) {
			console.error(`Bad node data ${node.type}`);
			return null;
		}
		if (TEXT_NODE_TYPES.has(mlType)) {
			return {
				type: mlType,
				key: context.indexer.nextKey(),
				line: context.indexer.currentLine(),
				text: collectText(node.content as string), // actually it can be a node
			};
		}

		const processor = this.nodeProcessorMap[node.type];
		if (processor) {
			return processor(node, context);
		}
		const parseMode = extractParseMode(node, context);
		const newContext =
			parseMode !== context.mode.parseMode
				? context.clone({ parseMode })
				: context;
		const resultNode: IMLParsedNode = {
			type: mlType,
			line: context.indexer.currentLine(),
			key: context.indexer.nextKey(),
			children: [] as Array<IMLParsedNode>,
			ordered: toValue(node.ordered, false),
			target: toValue(node.target, null),
			level: toValue(node.level, null),
			text: typeof node.content === "string" ? node.content : null,
			attributes:
				(isHTML && node.attributes && Object.fromEntries(node.attributes)) ||
				null,
		};
		const children = findArrayPart(node);
		if (!Array.isArray(children)) {
			return resultNode;
		}
		let currentLine: IMLParsedNode =
			parseMode === MLParseModes.VERSE ? null : resultNode;
		const isInlineContainer =
			this.isInlineParsedNode(node) || this.isTextContainer(node);

		for (let i = 0, len = children.length; i < len; ++i) {
			const child = children[i];
			if (this.isInlineParsedNode(child)) {
				if (isInlineContainer) {
					resultNode.children.push(this.parsedNodeToMLNode(child, newContext));
					continue;
				}
				if (!currentLine) {
					currentLine = {
						key: context.indexer.nextKey(),
						line: context.indexer.nextLine(),
						children: [],
						type: MLNODE_TYPES.LINE,
					};
					resultNode.children.push(currentLine);
				}
				currentLine.children.push(this.parsedNodeToMLNode(child, newContext));
			} else {
				if (currentLine !== resultNode) {
					removeNullChildren(currentLine);
					currentLine = null;
				}
				if (!this.isIgnoredASTNode(child)) {
					resultNode.children.push(this.parsedNodeToMLNode(child, newContext));
				}
			}
		}
		return removeNullChildren(resultNode);
	}

	private processListNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		const resultNode: IMLParsedNode = {
			type: nodeTypeToMLType(node.type, context),
			ordered: Boolean(node.ordered),
			key: context.indexer.nextKey(),
			line: -1,
			children: [],
		};
		const items = node.items || node.content;
		if (!Array.isArray(items)) {
			return resultNode;
		}
		items.forEach((child: ParsedNode) => {
			if (Array.isArray(child)) {
				const processed = this.parsedNodeToMLNode(
					{
						items: child,
						type: ASTNODE_TYPES.LIST_ITEM,
					},
					context
				);
				if (processed) {
					resultNode.children.push(processed);
				}
			}
		});
		return resultNode;
	}

	/**
	 * Store the link definition, return null (will be filtered out of the result)
	 * @param node
	 * @param context
	 * @returns
	 */
	private processLinkDefinition(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		const def = (node.def || "").toLowerCase();
		context.linkDefs[def] = {
			key: "",
			type: MLNODE_TYPES.LINK,
			line: 0,
			target: node.target,
			text: node.content || node.title || node.def || node.target,
		};

		return null;
	}

	private processTextChildren(
		node: ParsedNode,
		context: MLParseContext
	): ParsedNode {
		if (!node) {
			return node;
		}
		const children = findArrayPart(node);
		if (!children) {
			return node;
		}
		const parseMode = extractParseMode(node, context);
		const newContext: MLParseContext =
			parseMode !== context.mode.parseMode
				? context.clone({ parseMode })
				: context;
		const processText =
			parseMode === MLParseModes.VERSE
				? (texts: string[]) => this.breakTextToLines(texts)
				: (texts: string[]) => this.mergeTextElements(texts);

		const texts: string[] = [];
		const newChildren: ParsedNode[] = [];

		for (let i = 0, len = children.length; i < len; ++i) {
			const child: ParsedNode = children[i];
			if (child.type === ASTNODE_TYPES.TEXT) {
				texts.push(child.content as string);
			} else {
				if (texts.length) {
					newChildren.push(...processText(texts));
					texts.length = 0;
				}
				newChildren.push(this.processTextChildren(child, newContext));
			}
		}
		if (texts.length) {
			newChildren.push(...processText(texts));
		}
		children.length = 0;
		children.push(...newChildren);

		return node;
	}

	private processElementIds(
		node: IMLParsedNode,
		context: MLParseContext,
		map: Map<string, IMLParsedNode>
	): void {
		const id = node.attributes?.id;
		if (id) {
			Object.assign(node, { elementId: `${node.type}-${id}` });
			if (map.has(id)) {
				console.warn(`Document contains more than one element with id ${id}, 
previous: ${map.get(id).type} current ${node.type}`);
			}
			map.set(id, node);
		}
		(node.children || []).forEach((n) =>
			this.processElementIds(n, context, map)
		);
	}

	/**
	 * Finds links to page anchors (`#XXX`). For each link, check if we have a node
	 * With this element id. If so and if the node doesn't already have text, set
	 * the link text to a display name generated from a template specific to the target
	 * node type (e.g., if the link is to a figure, we'll get something like `"Fig. 3"`)
	 * @param node 
	 * @param context 
	 * @param map 
	 */
	private processIdLinks(
		node: IMLParsedNode,
		context: MLParseContext,
		map: Map<string, IMLParsedNode>
	) {
		if (node.type === MLNODE_TYPES.LINK && node.target) {
			const match = node.target.match(/^#(.+)$/);
			if (match) {
				const target = map.get(match[1]);
				if (target) {
					Object.assign(node, { target: `#${target.elementId}` });
					this.processAnchorLinkText(node, target, context);
				}
			}
		} else {
			(node.children || []).forEach((n) =>
				this.processIdLinks(n, context, map)
			);
		}
	}

	private processAnchorLinkText(
		node: IMLParsedNode,
		target: IMLParsedNode,
		context: MLParseContext
	) {
		const current = collectMLNodeText(node);
		if (current) {
			return;
		}
		const tmpl = MLTYPE_TO_LINK_TEXT_MAP.get(target.type);
		const text = tmpl
			? translateString(
					tmpl.replace(INDEX_RE, String(target.sequence)),
					context.mode.locale
			  )
			: String(target.sequence);
		node.children.length = 0;
		node.children.push({
			type: MLNODE_TYPES.TEXT,
			text: text,
			key: context.indexer.nextKey(),
			line: 0,
		});
	}

	/**
	 * Apply the optional node processors in the `context.mode` field, to the nodes in the provided
	 * array and to their subtrees. Example processors can be found in createPopoverLinksMappingFilter
	 * @param nodes
	 * @param context
	 * @returns
	 */
	private applyNodeProcessors(
		nodes: IMLParsedNode[],
		context: MLParseContext
	): IMLParsedNode[] {
		const mode = context.mode;
		if (!mode.nodeProcessors || !mode.nodeProcessors.length) {
			return nodes;
		}
		const processors = mode.nodeProcessors.slice();
		const processor: MLNodeProcessorFunction = (node, context) => {
			for (let p of processors) {
				node = p(node, context) || node;
			}
			return node;
		};
		const processorContext = new NodeProcessorContext(context);
		return nodes.map((node) =>
			this.applyProcessorsToNode(node, processorContext, processor)
		);
	}

	/**
	 *
	 * @param node
	 * @param context Parse context
	 * @param processor Guaranteed to return a valid node, if one was passed
	 * @returns
	 */
	private applyProcessorsToNode(
		node: IMLParsedNode,
		context: INodeProcessorContext,
		processor: MLNodeProcessorFunction
	): IMLParsedNode {
		if (!node) {
			return null;
		}
		node = processor(node, context);

		(node.children || []).forEach((n, ind, arr) => {
			arr[ind] = this.applyProcessorsToNode(n, context, processor);
		});
		return node;
	}

	private promoteFiguresInNode(
		node: IMLParsedNode,
		context: MLParseContext
	): void {
		const children = node.children;
		if (!Array.isArray(children) || children.length < 1) {
			return;
		}
		// don't recurse under figures
		if (node.type === MLNODE_TYPES.FIGURE) {
			return;
		}
		if (FIGURE_CONTAINER_TYPES.has(node.type)) {
			if (children.length === 1 && children[0].type === MLNODE_TYPES.IMAGE) {
				Object.assign(node, children[0], { type: MLNODE_TYPES.FIGURE });
				return;
			}
		}
		for (const child of children) {
			if (!this.isInlineMLNode(child)) {
				this.promoteFiguresInNode(child, context);
			}
		}
	}

	/**
	 * If the node is a figure, validate it, update its caption etc.
	 * @param node
	 * @param context
	 */
	private tryProcessFigure(node: IMLParsedNode, context: MLParseContext): void {
		if (node.type === MLNODE_TYPES.FIGURE) {
			this.processOneFigure(node, context);
		} else {
			const children = node.children;
			if (Array.isArray(children)) {
				children.forEach((child) => this.tryProcessFigure(child, context));
			}
		}
	}

	/**
	 * No validation, node is guaranteed figure
	 * Sets the figure node's `sequence` field to the current figure index
	 * @param node
	 * @param context
	 */
	private processOneFigure(
		node: IMLParsedNode,
		context: MLParseContext
	): IFigureInfo {
		const config = context.metaData.figures;
		const attributes = node.attributes || {},
			customCaption = attributes.caption,
			tmpl = customCaption || config.template;
		// 0. Find a caption child
		const captionNodes = node.children?.filter(
				(c) => c.type === MLNODE_TYPES.FIGCAPTION
			),
			nCaptions = captionNodes?.length;
		// 2. If more than one, throw
		if (nCaptions > 1) {
			throw new Error("Figure node contains more than one caption");
		}

		// 1. If there's a caption attribute
		// 1.1 ...and a caption child, throw
		if (nCaptions === 1 && customCaption) {
			throw new Error(
				`Figure contains both a caption child and a caption attribute "${customCaption}"`
			);
		}

		// generate if no caption child and either a custom caption has been set or auto captions is on
		const generateCaption = nCaptions === 0 && (customCaption || config.auto);
		let captionNode: IMLParsedNode;
		if (generateCaption) {
			captionNode = {
				type: MLNODE_TYPES.FIGCAPTION,
				key: context.indexer.nextKey(),
				text: tmpl,
				line: context.indexer.currentLine(),
			};
			node.children.push(captionNode);
		} else {
			captionNode = nCaptions === 1 && captionNodes[0];
		}
		const figIndex = context.indexer.nextIndex("figure");
		Object.assign(node, { sequence: figIndex + context.metaData.figures.base });
		this.processCaptionNode(captionNode, context);
		// 1.2 otherwise Create a caption child and append to node1
		return {
			id: node.attributes?.id,
			index: figIndex + config.base,
			realIndex: figIndex,
		};
	}

	/**
	 * The "figure" index in the context indexer is assumed to be the current
	 * @param node
	 * @param context
	 * @returns
	 */
	private processCaptionNode(
		node: IMLParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (!node) {
			return node;
		}
		if (node.text) {
			const ind =
				context.indexer.currentIndex("figure") + context.metaData.figures.base;
			const newText = translateString(
				node.text.replace(INDEX_RE, ind.toString()),
				context.mode.locale
			);
			Object.assign(node, { text: newText });
		} else if (node.children?.length) {
			node.children.forEach((child) => this.processCaptionNode(child, context));
		}
		return node;
	}

	/**
	 * For each node, find elements that should directly contain inlines but actually have nested text containers. Promote
	 * the inline elements to the top level of such elements
	 * @example <blockquote><p><strong>text</strong>more</p></blockquote> => <blockquote><strong>text</strong>more</blockquote>
	 * @param nodes
	 * @param context
	 */
	private promoteInlines(
		nodes: IMLParsedNode[],
		context: MLParseContext
	): void {
		nodes.forEach((node) => this.promoteInlinesInNode(node, context));
	}

	private promoteInlinesInNode(
		node: IMLParsedNode,
		context: MLParseContext
	): void {
		const children = node.children;
		if (!Array.isArray(children) || children.length < 1) {
			return;
		}
		if (NO_PARAGRAPH_TYPES.has(node.type)) {
			this.promoteParagraphContent(node, context);
		} else {
			for (const child of children) {
				if (!this.isInlineMLNode(child)) {
					this.promoteInlinesInNode(child, context);
				}
			}
		}
	}

	/**
	 * Given: the node is in NO_PARAGRAPH_TYPES and has children
	 * @param node
	 * @param context
	 */
	private promoteParagraphContent(
		node: IMLParsedNode,
		context: MLParseContext
	): void {
		void context; // prevent warning, maintain general function signature
		const children = node.children;
		const newChildren: IMLParsedNode[] = this.collectInlines(node);
		children.length = 0;
		children.push(...newChildren);
	}

	private collectInlines(node: IMLParsedNode): IMLParsedNode[] {
		const inlines: IMLParsedNode[] = [];
		for (const child of node.children) {
			if (this.isInlineMLNode(child)) {
				inlines.push(child);
			} else {
				inlines.push(...this.collectInlines(child));
			}
		}
		return inlines;
	}

	/**
	 * replace [XXX] text runs that match a XXX def, with links based on the defs
	 * collected in the creation of the nodeProcessorMap
	 * @param node
	 * @param context
	 */
	private updateLinksInNode(
		node: IMLParsedNode,
		context: MLParseContext
	): void {
		const children = node.children;
		if (!Array.isArray(children) || children.length < 1) {
			return;
		}
		const processed: IMLParsedNode[] = [];
		for (const child of children) {
			if (child.type === MLNODE_TYPES.TEXT) {
				const postLink = this.replaceLinkDefs(child, context);
				if (Array.isArray(postLink)) {
					processed.push(...postLink);
				} else {
					processed.push(child);
				}
			} else {
				processed.push(child);
				this.updateLinksInNode(child, context);
			}
		}
		node.children.length = 0;
		node.children.push(...processed);
	}

	/**
	 * Finds links with no target, which have a matching linkdef, and replaces them with the full link
	 * @param node
	 * @param context
	 * @returns
	 */
	private replaceLinkDefs(
		node: IMLParsedNode,
		context: MLParseContext
	): IMLParsedNode | IMLParsedNode[] {
		const parts: IMLParsedNode[] = [];
		const linkRE = /\[([^\]]+)\]/g;
		const text = node.text;

		if (!text) {
			return node;
		}
		let index = 0;
		let link: IMLParsedNode;
		const matches = text.matchAll(linkRE);

		for (let next = matches.next(); next && next.value; next = matches.next()) {
			const match = next.value;
			const name = match[1];
			if ((link = context.linkDefs[name.toLowerCase()])) {
				if (index < match.index) {
					parts.push({
						type: MLNODE_TYPES.TEXT,
						key: context.indexer.nextKey(),
						line: node.line,
						text: text.substring(index, Number(match.index)),
					});
				}
				parts.push({
					type: MLNODE_TYPES.LINK,
					target: link.target,
					text: name,
					key: context.indexer.nextKey(),
					line: node.line,
				});
			}
			index += (match.index as number) + (match[0] as string).length;
		}
		if (parts.length > 0 && index < text.length - 1) {
			parts.push({
				key: context.indexer.nextKey(),
				line: node.line,
				text: text.substring(index, text.length),
				type: MLNODE_TYPES.TEXT,
			});
		}

		return parts.length > 0 ? parts : node;
	}

	/**
	 * Removes newline characters from the combined text of all the provided nodes
	 * @param strings
	 * @returns
	 */
	private mergeTextElements(strings: Array<string>): ParsedNode[] {
		const text = strings
			.join("") // to string
			.replace(/\r/g, "") // remove windows CR
			.replace(/\n/g, " "); // remove LF
		return [
			{
				content: text,
				type: ASTNODE_TYPES.TEXT,
			},
		];
	}

	/**
	 * Merges the input strings, splits by newline and creates matching "text" nodes
	 * @param strings
	 * @param indexer
	 * @param liner
	 * @returns
	 */
	private breakTextToLines(strings: Array<string>): ParsedNode[] {
		return strings
			.join("") // to string
			.replace(/\r/g, "") // remove windows CR
			.split("\n") // split to lines
			.reduce((acc, line, index): ParsedNode[] => {
				if (index > 0) {
					// insert newlines between each two text lines, so not on the first time
					acc.push({
						type: ASTNODE_TYPES.NEWLINE,
					});
				}
				acc.push({
					content: line,
					type: ASTNODE_TYPES.TEXT,
				});
				return acc;
			}, []);
	}
}

class NodeIndexer {
	// static - insure multiple pages get different keys
	private static keyIndex = 0;
	private readonly indices: Map<string, number> = new Map<string, number>();

	public nextKey(): string {
		return `ast-${NodeIndexer.keyIndex++}`;
	}

	public nextLine(): number {
		return this.nextIndex("line");
	}

	public nextIndex(key: string): number {
		if (!this.indices.has(key)) {
			this.indices.set(key, -1);
		}
		const ind = this.indices.get(key) + 1;
		this.indices.set(key, ind);
		return ind;
	}

	public currentIndex(key: string): number {
		return this.indices.has(key) ? this.indices.get(key) : 0;
	}

	public currentLine(): number {
		return this.currentIndex("line");
	}
}

class MLParseContext {
	private _linkDefs: { [key: string]: IMLParsedNode } = {};
	private _indexer: NodeIndexer = new NodeIndexer();
	private readonly _metaData: IPageMetaData;
	private readonly _mode: IContentParseOptions;

	constructor(
		mode: IContentParseOptions,
		metaData: IPageMetaData
	) {
		const parseMode = mode.parseMode || metaData.parse_mode;
		this._mode = {
			...mode,
			parseMode: VALID_PARSE_MODES.has(parseMode)?
				parseMode: MLParseModes.NORMAL
		}
		this._metaData = mlUtils.clonePlainObject(metaData);
	}


	public get mode(): IContentParseOptions {
		return this._mode;
	}

	public clone(mode: Partial<IContentParseOptions>): MLParseContext {
		const newMode: IContentParseOptions = Object.assign(
			Object.assign({}, this.mode),
			mode
		);
		const ret = new MLParseContext(newMode, this._metaData);
		ret._indexer = this.indexer;
		ret._linkDefs = this._linkDefs;
		return ret;
	}

	public get metaData(): IPageMetaData {
		return this._metaData;
	}

	public get linkDefs(): { [key: string]: IMLParsedNode } {
		return this._linkDefs;
	}
	public get indexer(): NodeIndexer {
		return this._indexer;
	}
}

class NodeProcessorContext implements INodeProcessorContext {
	constructor(private readonly context: MLParseContext) {}

	public get mode(): IContentParseOptions {
		return this.context.mode;
	}

	private readonly _numberMap: Map<string, number> = new Map<string, number>();

	public setNodeText(node: IMLParsedNode, text: string): IMLParsedNode {
		if (!node) {
			return null;
		}
		if (node.type === MLNODE_TYPES.TEXT) {
			return Object.assign(node, { text });
		}
		return Object.assign(node, {
			children: [
				{
					text,
					key: this.context.indexer.nextKey(),
					line: node.line || -1,
					type: MLNODE_TYPES.TEXT,
				},
			],
		});
	}

	public getEnumerator(type: string): number {
		if (!type) {
			return 0;
		}
		if (!this._numberMap.has(type)) {
			this._numberMap.set(type, -1);
		}
		const current = this._numberMap.get(type) + 1;
		this._numberMap.set(type, current);
		return current;
	}
}

export const contentUtils: IContentUtils = new ContentUtils();
