import { CaseInsensitiveMap } from '../caseInsensitiveCollections';
import { NodeProcessorContext } from '../nodeProcessorContext';
import { MLParseContext } from '../parserContext';
import { ASTNODE_TYPES, MLNODE_TYPES } from 'types/nodes';
import type { IMLParsedNode, ParsedNode, IPageMetaData } from 'types/models';
import type {
	IContentParseOptions,
	INodeProcessorContext,
	MLNodeProcessorFunction,
} from 'types/parser';
import { MLParseModes } from 'types/parser/modes';
import {
	MLTYPE_TO_LINK_TEXT_MAP,
	// FIGURE_CONTAINER_TYPES,
	IGNORED_AST_TYPES,
	INLINE_AST_TYPES,
	INLINE_MLNODE_TYPES,
	NO_PARAGRAPH_TYPES,
	TEXT_CONTAINER_TYPES,
	TEXT_NODE_TYPES,
} from './nodeTypes';
import { IFigureInfo, ParsedNodeProcessor } from './types';
import { mdUtils } from './markdownUtils';

const INDEX_REGEXP = /%index%/i;

interface IMarkdownParser {
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
}

class MarkdownParser implements IMarkdownParser {
	private readonly nodeProcessorMap: { [name: string]: ParsedNodeProcessor };

	constructor() {
		this.nodeProcessorMap = {
			list: this.processListNode.bind(this),
			def: this.processLinkDefinition.bind(this),
		};
	}

	public processParseTree(
		nodes: ParsedNode[],
		metaData: IPageMetaData,
		mode: IContentParseOptions
	): IMLParsedNode[] {
		if (!nodes?.length) {
			return [];
		}

		const ctx = new MLParseContext(mode, metaData);
		const ids = new CaseInsensitiveMap<IMLParsedNode>();

		const result = nodes
			.map((node) => this.processOneASTNode(node, ctx))
			.filter(Boolean);

		result.forEach((res) => this.updateLinksInNode(res, ctx));
		result.forEach((res) => this.promoteInlinesInNode(res, ctx)); // this.promoteInlines(result, ctx);
		result.forEach((res) => this.tryProcessFigure(res, ctx));
		result.forEach((res) => this.processElementIds(res, ctx, ids));
		result.forEach((res) => this.processIdLinks(res, ctx, ids));

		return this.applyNodeProcessors(result, ctx);
	}

	private processListNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		const resultNode: IMLParsedNode = {
			type: mdUtils.nodeTypeToMLType(node.type, context),
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
		const def = (node.def || '').toLowerCase();

		context.linkDefs[def] = {
			key: '',
			type: MLNODE_TYPES.LINK,
			line: 0,
			target: node.target,
			text: node.content || node.title || node.def || node.target,
		};

		return null;
	}

	private processOneASTNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (this.isIgnoredASTNode(node)) {
			return null;
		}

		node = mdUtils.sanitizeHTML(node);

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
				type: mdUtils.nodeTypeToMLType(node.type, context),
				key: context.indexer.nextKey(),
				line: context.indexer.nextLine(),
				text: String(node.content),
			};
		}
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
				console.warn(`
				Document contains more than one element with id ${id}, previous: ${
					map.get(id).type
				} current ${node.type}`);
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
		const current = mdUtils.collectMLNodeText(node);

		if (current) {
			return;
		}

		const tmpl = MLTYPE_TO_LINK_TEXT_MAP.get(target.type);

		const text = tmpl
			? mdUtils.translateString(
					tmpl.replace(INDEX_REGEXP, String(target.sequence))
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
	// promoteParagraphContent
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
				: mdUtils.nodeTypeToMLType(node.type, context);

		if (!mlType) {
			console.error(`Bad node data ${node.type}`);
			return null;
		}

		if (TEXT_NODE_TYPES.has(mlType)) {
			return {
				type: mlType,
				key: context.indexer.nextKey(),
				line: context.indexer.currentLine(),
				text: mdUtils.collectText(node.content as string), // actually it can be a node
			};
		}

		const processor = this.nodeProcessorMap[node.type];

		if (processor) {
			return processor(node, context);
		}

		const parseMode = mdUtils.extractParseMode(node, context);

		const newContext =
			parseMode !== context.mode.parseMode
				? context.clone({ parseMode })
				: context;

		const resultNode: IMLParsedNode = {
			type: mlType,
			line: context.indexer.currentLine(),
			key: context.indexer.nextKey(),
			children: [] as Array<IMLParsedNode>,
			ordered: mdUtils.toValue(node.ordered, false),
			target: mdUtils.toValue(node.target, null),
			level: mdUtils.toValue(node.level, null),
			text: typeof node.content === 'string' ? node.content : null,
			attributes:
				(isHTML && node.attributes && Object.fromEntries(node.attributes)) ||
				null,
		};

		const children = mdUtils.findArrayPart(node);

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
					mdUtils.removeNullChildren(currentLine);
					currentLine = null;
				}

				if (!this.isIgnoredASTNode(child)) {
					resultNode.children.push(this.parsedNodeToMLNode(child, newContext));
				}
			}
		}

		return mdUtils.removeNullChildren(resultNode);
	}

	/**********************************************************
	 * NODE PROCESSORS
	 **********************************************************/

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

	/**********************************************************
	 * PROCESS FIGURE
	 *********************************************************/

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
			throw new Error('Figure node contains more than one caption');
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

		const figIndex = context.indexer.nextIndex('figure');
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
				context.indexer.currentIndex('figure') + context.metaData.figures.base;

			const newText = mdUtils.translateString(
				node.text.replace(INDEX_REGEXP, ind.toString())
			);

			Object.assign(node, { text: newText });
		} else if (node.children?.length) {
			node.children.forEach((child) => this.processCaptionNode(child, context));
		}

		return node;
	}

	/**********************************************************
	 * PROCESS LINKS
	 *********************************************************/

	// processParseTree
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

	/**********************************************************
	 * PROCESS TEXT CHILDREN
	 *********************************************************/
	private processTextChildren(
		node: ParsedNode,
		context: MLParseContext
	): ParsedNode {
		if (!node) {
			return node;
		}

		const children = mdUtils.findArrayPart(node);

		if (!children) {
			return node;
		}

		const parseMode = mdUtils.extractParseMode(node, context);

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

	// processTextChildren
	/**
	 * Removes newline characters from the combined text of all the provided nodes
	 * @param strings
	 * @returns
	 */
	private mergeTextElements(strings: Array<string>): ParsedNode[] {
		const text = strings
			.join('') // to string
			.replace(/\r/g, '') // remove windows CR
			.replace(/\n/g, ' '); // remove LF

		return [
			{
				content: text,
				type: ASTNODE_TYPES.TEXT,
			},
		];
	}

	// processTextChildren
	/**
	 * Merges the input strings, splits by newline and creates matching "text" nodes
	 * @param strings
	 * @param indexer
	 * @param liner
	 * @returns
	 */
	private breakTextToLines(strings: Array<string>): ParsedNode[] {
		return strings
			.join('') // to string
			.replace(/\r/g, '') // remove windows CR
			.split('\n') // split to lines
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

	/*******************************************
	 * NODE TYPE MATCHERS
	 ******************************************/
	private isTextContainer(nodeOrType: ParsedNode | ASTNODE_TYPES): boolean {
		const type: ASTNODE_TYPES =
			typeof nodeOrType === 'string' ? nodeOrType : nodeOrType.type;
		return TEXT_CONTAINER_TYPES.has(type);
	}

	// parsedNodeToMLNode
	private isInlineParsedNode(node: ParsedNode): boolean {
		return INLINE_AST_TYPES.has(node?.type);
	}

	private isInlineMLNode(node: IMLParsedNode): boolean {
		return INLINE_MLNODE_TYPES.has(node?.type);
	}

	private isIgnoredASTNode(node: ParsedNode): boolean {
		return IGNORED_AST_TYPES.has(node?.type);
	}
}

export const markdownParser: IMarkdownParser = new MarkdownParser();

// private promoteFiguresInNode(
// 	node: IMLParsedNode,
// 	context: MLParseContext
// ): void {
// 	const children = node.children;

// 	if (!Array.isArray(children) || children.length < 1) {
// 		return;
// 	}

// 	// don't recurse under figures
// 	if (node.type === MLNODE_TYPES.FIGURE) {
// 		return;
// 	}

// 	if (FIGURE_CONTAINER_TYPES.has(node.type)) {
// 		if (children.length === 1 && children[0].type === MLNODE_TYPES.IMAGE) {
// 			Object.assign(node, children[0], { type: MLNODE_TYPES.FIGURE });
// 			return;
// 		}
// 	}

// 	for (const child of children) {
// 		if (!this.isInlineMLNode(child)) {
// 			this.promoteFiguresInNode(child, context);
// 		}
// 	}
// }

/**
	 * For each node, find elements that should directly contain inlines but actually have nested text containers.
	 * Promote the inline elements to the top level of such elements.
	 * @example <blockquote><p><strong>text</strong>more</p></blockquote> => <blockquote><strong>text</strong>more</blockquote>
	 * @param nodes
	 * @param context
	private promoteInlines(
		nodes: IMLParsedNode[],
		context: MLParseContext
	): void {
		nodes.forEach((node) => this.promoteInlinesInNode(node, context));
	}
	 */
