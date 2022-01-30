import {
	IMLParsedNode,
	MLParsedNodeType,
	ParsedNode,
} from "../interfaces/models";

/**
 * Functions for processing parsed markdown nodes and maybe more
 */
export interface IContentUtils {
	/**
	 * Convert a markdown parse tree to a MK parse tree, in which text runs are separated into lines
	 * @param arg0
	 */
	processParseTree(nodes: ParsedNode[]): IMLParsedNode[];
}

type ParsedNodeProcessor = (node: ParsedNode, context: MLParseContext) => IMLParsedNode;

const TypeMap: { [key: string]: MLParsedNodeType } = {
	paragraph: "paragraph",
	line: "line",
	link: "link",
	image: "image",
	text: "text",
	strong: "strong",
	em: "em",
	emph: "em",
	list: "list",
	"list-item": "list-item",
	codeBlock: "code",
	unknown: "unknown",
};

const INLINE_TYPES = {
	text: 1,
	link: 1,
	em: 1,
	strong: 1,
	image: 1,
	ins: 1,
	del: 1,
	sup: 1,
	sub: 1,
};

/**
 * Elements that should contain text directly, without an enclosing paragraph
 */
const TEXT_CONTAINER_TYPES = {
	heading: 1,
}

const IGNORED_TYPES = {
	newline: true,
};

const NO_PARAGRAPH_TYPES = {
	"blockquote": 1
}

function nodeTypeToMLType(nodeName: string): MLParsedNodeType {
	if (!nodeName) {
		return "unknown";
	}
	return (TypeMap[nodeName] || nodeName).toLowerCase() as MLParsedNodeType;
}

class ContentUtils implements IContentUtils {

	private readonly nodeProcessorMap: { [name: string]: ParsedNodeProcessor };

	constructor() {
		this.nodeProcessorMap = {
			"list": this.processListNode.bind(this),
			"def": this.processLinkDefinition.bind(this)
		}
	}

	public processParseTree(nodes: ParsedNode[]): IMLParsedNode[] {
		if (!nodes || !nodes.length) {
			return [];
		}
		const parseContext = new MLParseContext();
		const result = nodes
			.map((node) => this.processOneASTNode(node, parseContext))
			.filter(Boolean);
		this.updateLinks(result, parseContext);
		this.promoteInlines(result, parseContext);
		return result;
	}

	private isTextContainer(nodeOrType: ParsedNode | string): boolean {
		const type: string =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return type in TEXT_CONTAINER_TYPES;
	}

	private isInline(nodeOrType: ParsedNode | string): boolean {
		const type: string =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return type in INLINE_TYPES;
	}

	private isIgnored(nodeOrType: ParsedNode | string): boolean {
		const type: string =
			typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return type in IGNORED_TYPES;
	}

	private processOneASTNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		if (this.isIgnored(node)) {
			return null;
		}
		if (Array.isArray(node.items || node.content)) {
			return this.parsedNodeToMLNode(this.processTextChildren(node), context);
		} else {
			const processor = this.nodeProcessorMap[node.type];
			if (processor) {
				return processor(node, context);
			}
			return {
				type: nodeTypeToMLType(node.type),
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
		if (node.type === "text") {
			return {
				type: "text",
				key: context.indexer.nextKey(),
				line: context.indexer.currentLine(),
				text: node.content,
			};
		}

		const processor = this.nodeProcessorMap[node.type];
		if (processor) {
			return processor(node, context);
		}

		const resultNode: IMLParsedNode = {
			type: nodeTypeToMLType(node.type),
			line: context.indexer.currentLine(),
			key: context.indexer.nextKey(),
			children: [] as Array<IMLParsedNode>,
			ordered: node.ordered,
			target: node.target,
			level: node.level,
		};
		const children = this.findArrayPart(node);
		if (!Array.isArray(children)) {
			return resultNode;
		}
		let currentLine: IMLParsedNode = null;
		const isInlineContainer = this.isInline(node) || this.isTextContainer(node);

		for (let i = 0, len = children.length; i < len; ++i) {
			const child = children[i];
			const type = child.type;
			if (this.isInline(type)) {
				if (isInlineContainer) {
					resultNode.children.push(this.parsedNodeToMLNode(child, context));
					continue;
				}
				if (!currentLine) {
					currentLine = {
						key: context.indexer.nextKey(),
						line: context.indexer.nextLine(),
						children: [],
						type: "line",
					};
					resultNode.children.push(currentLine);
				}
				currentLine.children.push(this.parsedNodeToMLNode(child, context));
			} else {
				currentLine = null;
				if (!this.isIgnored(type)) {
					resultNode.children.push(this.parsedNodeToMLNode(child, context));
				}
			}
		}
		return resultNode;
	}

	private processListNode(
		node: ParsedNode,
		context: MLParseContext
	): IMLParsedNode {
		const resultNode: IMLParsedNode = {
			type: nodeTypeToMLType(node.type),
			ordered: node.ordered,
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
						type: "list-item",
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
	private processLinkDefinition(node: ParsedNode, context: MLParseContext): IMLParsedNode {
		const def = (node.def || "").toLowerCase();
		context.linkDefs[def] = {
			key: "",
			type: "link",
			line: 0,
			target: node.target,
			text: node.content || node.title || node.def || node.target
		};

		return null;
	}

	private processTextChildren(node: ParsedNode): ParsedNode {
		if (!node) {
			return node;
		}
		const children = this.findArrayPart(node);
		if (!children) {
			return node;
		}
		const texts: string[] = [];
		const newChildren: ParsedNode[] = [];

		for (let i = 0, len = children.length; i < len; ++i) {
			const child: ParsedNode = children[i];
			if (child.type === "text") {
				texts.push(child.content as string);
			} else {
				if (texts.length) {
					newChildren.push(...this.processTextRuns(texts));
					texts.length = 0;
				}
				newChildren.push(this.processTextChildren(child));
			}
		}
		if (texts.length) {
			newChildren.push(...this.processTextRuns(texts));
		}
		children.length = 0;
		children.push(...newChildren);

		return node;
	}

	/**
	 * For each node, find elements that should directly contain inlines but actually have nested text containers. Promote
	 * the inline elements to the top level of such elements
	 * @param nodes 
	 * @param context 
	 */
	private promoteInlines(nodes: IMLParsedNode[], context: MLParseContext): void {
		nodes.forEach(node => this.promoteInlinesInNode(node, context));
	}

	private promoteInlinesInNode(node: IMLParsedNode, context: MLParseContext): void {
		const children = node.children;
		if (!Array.isArray(children) || children.length < 1) {
			return;
		}
		if (node.type in NO_PARAGRAPH_TYPES) {
			this.promoteParagraphContent(node, context);
		}
		else {
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
	private promoteParagraphContent(node: IMLParsedNode, context: MLParseContext): void {
		const children = node.children;
		const newChildren: IMLParsedNode[] = this.collectInlines(node);
		children.length = 0;
		children.push(...newChildren);
	}

	private collectInlines(node: IMLParsedNode): IMLParsedNode[] {
		const inlines: IMLParsedNode[] = [];
		for (const child of node.children) {
			if (this.isInline(child)) {
				inlines.push(child);
			}
			else {
				inlines.push(...this.collectInlines(child));
			}
		}
		return inlines;
	}
	/**
 * replace [XXX] text runs that match a XXX def, with links based on the def
 * @param nodes 
 * @param context 
 */
	private updateLinks(nodes: IMLParsedNode[], context: MLParseContext): void {
		nodes.forEach(node => this.updateLinksInNode(node, context));
	}

	private updateLinksInNode(node: IMLParsedNode, context: MLParseContext): void {
		const children = node.children;
		if (!Array.isArray(children) || children.length < 1) {
			return;
		}
		const processed: IMLParsedNode[] = [];
		for (const child of children) {
			if (child.type === "text") {
				const postLink = this.replaceLinkDefs(child, context);
				if (Array.isArray(postLink)) {
					processed.push(...postLink);
				}
				else {
					processed.push(child);
				}
			}
			else {
				processed.push(child);
				this.updateLinksInNode(child, context);
			}
		}
		node.children.length = 0;
		node.children.push(...processed);
	}

	private replaceLinkDefs(node: IMLParsedNode, context: MLParseContext): IMLParsedNode | IMLParsedNode[] {
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
						type: "text",
						key: context.indexer.nextKey(),
						line: node.line,
						text: text.substring(index, Number(match.index))
					})
				}
				parts.push({
					type: "link",
					target: link.target,
					text: name,
					key: context.indexer.nextKey(),
					line: node.line
				})
			}
			index += (match.index as number) + (match[0] as string).length;
		}
		if (parts.length > 0 && index < text.length - 1) {
			parts.push({
				key: context.indexer.nextKey(),
				line: node.line,
				text: text.substring(index, text.length),
				type: "text"
			})
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
	 * Merges the input strings, splits by newline and creates matching "text" nodes
	 * @param strings
	 * @param indexer
	 * @param liner
	 * @returns
	 */
	private processTextRuns(strings: Array<string>): IMLParsedNode[] {
		return strings
			.join("") // to string
			.replace(/\r/g, "") // remove windows CR
			.split("\n") // split to lines
			.filter(Boolean)
			.reduce((acc, line, index): ParsedNode[] => {
				if (index > 0) {
					acc.push({
						type: "newline",
					});
				}
				acc.push({
					content: line,
					type: "text",
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
	public readonly linkDefs: { [key: string]: IMLParsedNode } = {};
	public readonly indexer: NodeIndexer = new NodeIndexer();
}

export const contentUtils: IContentUtils = new ContentUtils();
