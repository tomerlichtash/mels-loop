import * as mdParser from "simple-markdown"
import { IParsedNode } from "../interfaces/models";

/**
 * Functions for processing parsed markdown nodes and maybe more
 */
export interface IContentUtils {
	/**
	 * Convert a markdown parse tree to a MK parse tree, in which text runs are separated into lines
	 * @param arg0 
	 */
	processParseTree(nodes: mdParser.SingleASTNode[]): IParsedNode[];
}

type KeyIndexer = () => string;
type LineIndexer = () => number;

type ParsedNode = mdParser.SingleASTNode;
type ParsedNodesRun = {type: string, nodes: ParsedNode[]};

class ContentUtils implements IContentUtils {

	public processParseTree(nodes: mdParser.SingleASTNode[]): IParsedNode[] {
		const liner = this.createLineIndexer();
		return nodes.map(node => this.processOneASTNode(node, this.createKeyIndexer(), liner))
	}

	/**
	 * partition an array of parsed nodes into runs of identical types
	 * @param nodes 
	 * @returns 
	 */
	private collectNodeRuns(nodes: ParsedNode[]): ParsedNodesRun[] {
		if (!Array.isArray(nodes)) {
			return [];
		}
		const ret: Array<ParsedNodesRun>= [];
		let last: ParsedNodesRun = null;
		nodes.forEach(node => {
			if (!last || node.type !== last.type) {
				last = { type: node.type, nodes: [node]}
				ret.push(last);
			}
			else {
				last.nodes.push(node);
			}
		})
		return ret;
	}

	/**
	 * Creates an indexer function for unique indices in the scope of a container item
	 * @returns 
	 */
	private createKeyIndexer(): KeyIndexer {
		let index = 0;
		return () => `ast-${index++}`
	}

	/**
	 * Creates a line numbering function for consecutive line numbers in the scope of a parsed page
	 * @returns 
	 */
	 private createLineIndexer(): LineIndexer {
		let index = 0;
		return () => index++
	}

	private processOneASTNode(node: ParsedNode, indexer: KeyIndexer, liner: LineIndexer): IParsedNode {
		if (Array.isArray(node.items || node.content)) {
			return this.processContainer(node, indexer, liner);
		}
		else {
			return {
				type: node.type,
				key: indexer(),
				line: liner(),
				content: node.content
			}
		}
	}

	private processContainer(node: ParsedNode, indexer: KeyIndexer, liner: LineIndexer): IParsedNode {
		const ret: IParsedNode = {
			type: node.type,
			line: -1,
			key: indexer(),
			children: [] as Array<IParsedNode>
		}
		if (node.type === "list") {
			return this.processListNode(node, indexer, liner);
		}
		const runs = this.collectNodeRuns(node.items || node.content);
		runs.forEach(run => {
			switch (run.type) {
				case "text":
					ret.children.push(...(this.processTextRuns(run.nodes, indexer, liner)));
					break;
				default:
					ret.children.push(...(run.nodes.map(node => this.processOneASTNode(node, indexer, liner))))
			}
		})

		return ret
	}

	private processListNode(node: ParsedNode, indexer: KeyIndexer, liner: LineIndexer): IParsedNode {
		const ret: IParsedNode = {
			type: node.type,
			ordered: node.ordered,
			key: indexer(),
			line: -1,
			children: []
		}
		const items = node.items || node.content;
		if (!Array.isArray(items)) {
			return ret;
		}
		items.forEach((child: ParsedNode) => {
			if (Array.isArray(child)) {
				ret.children.push(this.processContainer({
						items: child,
						type: "list-item"
					}, indexer, liner))
			}
		});
		return ret;
	}

	private processTextRuns(nodes: ParsedNode[], indexer: KeyIndexer, liner: LineIndexer): IParsedNode[] {
		return nodes
		.map(node => node.content) // collect all text fields
		.join('') // to string
		.replace('\r', '') // remove windows CR
		.split('\n') // split to lines
		.map(line => ({
			key: indexer(),
			line: liner(),
			text: line,
			type: "text"
		}))
	}
}

export const contentUtils: IContentUtils = new ContentUtils()