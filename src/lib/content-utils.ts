import {
	DynamicContentTypes,
	IDynamicContentRecord,
} from "../interfaces/dynamic-content";
import {
	ASTNODE_TYPES,
	IMLParsedNode,
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
import { mlUtils } from "./ml-utils";

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

type MLNodeTypeMap = Map<MLNODE_TYPES, boolean>;

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

const INLINE_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
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

/**
 * Elements that contain only text
 */
 const TEXT_NODE_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>([
	MLNODE_TYPES.TEXT, MLNODE_TYPES.CODE,
]);

/**
 * Elements that should contain text directly, without an enclosing paragraph
 */
const TEXT_CONTAINER_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>([
	ASTNODE_TYPES.HEADING,
]);

const IGNORED_TYPES: Set<ASTNODE_TYPES> = new Set<ASTNODE_TYPES>(
	[ASTNODE_TYPES.NEWLINE]);

const NO_PARAGRAPH_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>(
	[MLNODE_TYPES.BLOCKQUOTE]
);

/**
 * Node types that should be promoted to a figure if their only content is an image
 */
const FIGURE_CONTAINER_TYPES: MLNodeTypeMap = new Map<MLNODE_TYPES, boolean>([
	[MLNODE_TYPES.LINE, true],
	[MLNODE_TYPES.PARAGRAPH, true],
]);

function nodeTypeToMLType(
	nodeName: ASTNODE_TYPES,
	context: MLParseContext
): MLNODE_TYPES {
	void context;
	if (!nodeName) {
		return MLNODE_TYPES.UNKNOWN;
	}
	return (AST2MLTypeMap.get(nodeName) || 
		nodeName)
		.toLowerCase() as MLNODE_TYPES;
}

function extractParseMode(node: ParsedNode, context: MLParseContext): MLParseModes {
	if (node.attributes) {
		const attr = node.attributes.get("data-parse-mode");
		if (attr && /^verse$/.test(attr)) {
			return MLParseModes.VERSE;
		}
	}
	if (node.type === ASTNODE_TYPES.CODEBLOCK) {
		return MLParseModes.VERSE;
	}
	return context.mode.parseMode;
}

/**
 * @param node 
 * @param newChildren 
 */
function removeNullChildren(node: IMLParsedNode): IMLParsedNode {
	if (!(node?.children)) {
		return node;
	}
	const validNodes = node.children.filter(Boolean);
	node.children.length = 0;
	node.children.push(...validNodes);
	return node;
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

class ContentUtils implements IContentUtils {
	private readonly nodeProcessorMap: { [name: string]: ParsedNodeProcessor };

	constructor() {
		this.nodeProcessorMap = {
			list: this.processListNode.bind(this),
			def: this.processLinkDefinition.bind(this),
			HTML: this.processHtmlNode.bind(this)
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
		};
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
		mode: IContentParseOptions
	): IMLParsedNode[] {
		if (!nodes || !nodes.length) {
			return [];
		}
		const parseContext = new MLParseContext(mode);

		const result = nodes
			.map((node) => this.processOneASTNode(node, parseContext))
			.filter(Boolean);
		this.updateLinks(result, parseContext);
		this.promoteInlines(result, parseContext);
		this.promoteFigures(result, parseContext);
		return this.applyNodeProcessors(result, parseContext);
	}

	private isTextContainer(nodeOrType: ParsedNode | ASTNODE_TYPES): boolean {
		const type: ASTNODE_TYPES =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return TEXT_CONTAINER_TYPES.has(type);
	}

	private isInline(nodeOrType: ParsedNode | string): boolean {
		const type: string =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return INLINE_TYPES.has(type as ASTNODE_TYPES); // hack, we rely on the identity between inline types in both enumerations
	}

	private isIgnored(nodeOrType: ParsedNode | string): boolean {
		const type: string =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return IGNORED_TYPES.has(type as ASTNODE_TYPES);
	}

	private processOneASTNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (this.isIgnored(node)) {
			return null;
		}
		
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
		if (this.isIgnored(node)) {
			return null;
		}
		const mlType = nodeTypeToMLType(node.type, context);
		if (TEXT_NODE_TYPES.has(mlType)) {
			return {
				type: mlType,
				key: context.indexer.nextKey(),
				line: context.indexer.currentLine(),
				text: node.content,
			};
		}

		const processor = this.nodeProcessorMap[node.type];
		if (processor) {
			return processor(node, context);
		}
		const parseMode = extractParseMode(node, context);
		const newContext = parseMode !== context.mode.parseMode ?
			context.clone({ parseMode }) : context;
		const resultNode: IMLParsedNode = {
			type: mlType,
			line: context.indexer.currentLine(),
			key: context.indexer.nextKey(),
			children: [] as Array<IMLParsedNode>,
			ordered: node.ordered,
			target: node.target,
			level: node.level,
			text: typeof node.content === "string" ? node.content: undefined,
		};
		const children = this.findArrayPart(node);
		if (!Array.isArray(children)) {
			return resultNode;
		}
		let currentLine: IMLParsedNode = parseMode === MLParseModes.VERSE ? null : resultNode;
		const isInlineContainer = this.isInline(node) || this.isTextContainer(node);

		for (let i = 0, len = children.length; i < len; ++i) {
			const child = children[i];
			const type = child.type;
			if (this.isInline(type)) {
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
					removeNullChildren(currentLine)
					currentLine = null;
				}
				if (!this.isIgnored(type)) {
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

	private processHtmlNode(node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		const items =this.findArrayPart(node) || [];
		const parseMode = extractParseMode(node, context);
		const newContext: MLParseContext = 
			parseMode !== context.mode.parseMode ? 
				context.clone({ parseMode })
				: context;
		const resultNode: IMLParsedNode = {
			type: node.tag.toLowerCase(),
			key: context.indexer.nextKey(),
			line: -1,
			children: items.map(item => this.parsedNodeToMLNode(item, newContext)).filter(Boolean)
		};
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
		context: MLParseContext,
	): ParsedNode {
		if (!node) {
			return node;
		}
		const children = this.findArrayPart(node);
		if (!children) {
			return node;
		}
		const parseMode = extractParseMode(node, context);
		const newContext: MLParseContext = 
			parseMode !== context.mode.parseMode ? 
				context.clone({ parseMode })
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

	private promoteFigures(
		nodes: IMLParsedNode[],
		context: MLParseContext
	): void {
		nodes.forEach((node) => this.promoteFiguresInNode(node, context));
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
		if (FIGURE_CONTAINER_TYPES.has(node.type)) {
			if (children.length === 1 && children[0].type === MLNODE_TYPES.IMAGE) {
				Object.assign(node, children[0], { type: MLNODE_TYPES.FIGURE });
				return;
			}
		}
		for (const child of children) {
			if (!this.isInline(child.type)) {
				this.promoteFiguresInNode(child, context);
			}
		}
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
				if (!this.isInline(child.type)) {
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
			if (this.isInline(child.type)) {
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
	 * @param nodes
	 * @param context
	 */
	private updateLinks(nodes: IMLParsedNode[], context: MLParseContext): void {
		nodes.forEach((node) => this.updateLinksInNode(node, context));
	}

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

	private findArrayPart(node: ParsedNode): Array<ParsedNode> {
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
	private lineIndex = 0;
	public nextKey(): string {
		return `ast-${NodeIndexer.keyIndex++}`;
	}

	public nextLine(): number {
		return this.lineIndex++;
	}

	public currentLine(): number {
		return this.lineIndex;
	}
}

class MLParseContext {
	private _linkDefs: { [key: string]: IMLParsedNode } = {};
	private _indexer: NodeIndexer = new NodeIndexer();

	constructor(public readonly mode: IContentParseOptions) {}
	public clone(mode: Partial<IContentParseOptions>): MLParseContext {
		const newMode: IContentParseOptions = Object.assign(
			Object.assign({}, this.mode), mode);
		const ret = new MLParseContext(newMode);
		ret._indexer = this.indexer;
		ret._linkDefs = this._linkDefs;
		return ret;
	}

	public get linkDefs(): { [key: string]: IMLParsedNode } {
		return this._linkDefs;
	}
	public get indexer(): NodeIndexer {
		return this._indexer;
	};
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
