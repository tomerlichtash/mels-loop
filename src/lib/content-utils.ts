import { IMLParsedNode, MLParsedNodeType, ParsedNode } from "../interfaces/models";

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
	codeBlock: "codeBlock",
	unknown: "unknown"
};


const inlineTypes = {
	"text": 1,
	"link": 1,
	"em": 1,
	"strong": 1,
	"image": 1,
	ins: 1,
	del: 1,
	sup: 1,
	sub: 1
}

const ignoredTypes = {
	"newline": true
}

function nodeTypeToMLType(nodeName: string): MLParsedNodeType {
	return TypeMap[nodeName] || (nodeName as MLParsedNodeType)
}

class ContentUtils implements IContentUtils {

	public processParseTree(nodes: ParsedNode[]): IMLParsedNode[] {
		const indexer = new NodeIndexer();
		return nodes.map(node => this.processOneASTNode(node, indexer)).filter(Boolean);
	}


	private isInline(nodeOrType: ParsedNode | string): boolean {
		const type: string = typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return type in inlineTypes;
	}

	private isIgnored(nodeOrType: ParsedNode | string): boolean {
		const type: string = typeof nodeOrType === "string" ? nodeOrType : nodeOrType.type;
		return type in ignoredTypes;
	}


	private processOneASTNode(node: ParsedNode, indexer: NodeIndexer): IMLParsedNode {
		if (this.isIgnored(node)) {
			return null;
		}
		if (Array.isArray(node.items || node.content)) {
			return this.parsedNodeToMLNode(this.processTextChildren(node), indexer);
		}
		else {
			return {
				type: nodeTypeToMLType(node.type),
				key: indexer.nextKey(),
				line: indexer.nextLine(),
				text: String(node.content)
			}
		}
	}


	private parsedNodeToMLNode(node: ParsedNode, indexer: NodeIndexer): IMLParsedNode {
		if (this.isIgnored(node)) {
			return null;
		}
		if (node.type === "text") {
			return {
				type: "text",
				key: indexer.nextKey(),
				line: indexer.currentLine(),
				text: node.content
			}
		}

		if (node.type === "list") {
			return this.processListNode(node, indexer);
		}

		const ret: IMLParsedNode = {
			type: nodeTypeToMLType(node.type),
			line: indexer.currentLine(),
			key: indexer.nextKey(),
			children: [] as Array<IMLParsedNode>,
			ordered: node.ordered,
			target: node.target,
			level: node.level
		}
		const children = (node.items || node.content || node) as Array<ParsedNode>;
		if (!Array.isArray(children)) {
			return ret;
		}
		let currentLine: IMLParsedNode = null;
		const isInlineContainer = this.isInline(node);

		for (let i = 0, len = children.length; i < len; ++i) {
			const child = children[i];
			const type = child.type;
			if (this.isInline(type)) {
				if (isInlineContainer) {
					ret.children.push(this.parsedNodeToMLNode(child, indexer));
					continue;
				}
				if (!currentLine) {
					currentLine = {
						key: indexer.nextKey(),
						line: indexer.nextLine(),
						children: [],
						type: "line"
					};
					ret.children.push(currentLine);
				}
				currentLine.children.push(this.parsedNodeToMLNode(child, indexer));
			}
			else {
				currentLine = null;
				if (!this.isIgnored(type)) {
					ret.children.push(this.parsedNodeToMLNode(child, indexer));
				}
			}

		}
		return ret
	}

	private processListNode(node: ParsedNode, indexer: NodeIndexer): IMLParsedNode {
		const ret: IMLParsedNode = {
			type: nodeTypeToMLType(node.type),
			ordered: node.ordered,
			key: indexer.nextKey(),
			line: -1,
			children: []
		}
		const items = node.items || node.content;
		if (!Array.isArray(items)) {
			return ret;
		}
		items.forEach((child: ParsedNode) => {
			if (Array.isArray(child)) {
				const processed = this.parsedNodeToMLNode({
					items: child,
					type: "list-item"
				}, indexer);
				if (processed) {
					ret.children.push(processed);
				}
			}
		});
		return ret;
	}

	private processTextChildren(node: ParsedNode): ParsedNode {
		if (!node) {
			return node;
		}
		const children = this.findArrayPart(node);
		if (!children) {
			return node;
		}
		const texts: string[] = []
		const newChildren: ParsedNode[] = [];

		for (let i = 0, len = children.length; i < len; ++i) {
			const child: ParsedNode = children[i];
			if (child.type === "text") {
				texts.push(child.content as string);
			}
			else {
				if (texts.length) {
					newChildren.push(...(this.processTextRuns(texts)))
					texts.length = 0;
				}
				newChildren.push(this.processTextChildren(child));
			}
		}
		if (texts.length) {
			newChildren.push(...(this.processTextRuns(texts)))
		}
		children.length = 0;
		children.push(...newChildren);

		return node;
	}

	private findArrayPart(node: ParsedNode): Array<ParsedNode> {
		if (Array.isArray(node.items)) {
			return node.items;
		}
		if (Array.isArray(node.content)) {
			return node.content;
		}
		if (Array.isArray(node)) {
			return node; 1
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
			.join('') // to string
			.replace(/\r/g, '') // remove windows CR
			.split('\n') // split to lines
			.filter(Boolean)
			.reduce((acc, line, index): ParsedNode[] => {
				if (index > 0) {
					acc.push({
						type: "newline",
					})
				}
				acc.push({
					content: line,
					type: "text"
				});
				return acc;
			}, [])
	}
}

class NodeIndexer {
	private keyIndex = 0;
	private lineIndex = 0;
	public nextKey(): string {
		return `ast-${this.keyIndex++}`
	}

	public nextLine(): number {
		return this.lineIndex++
	}

	public currentLine(): number {
		return this.lineIndex;
	}
}

export const contentUtils: IContentUtils = new ContentUtils()