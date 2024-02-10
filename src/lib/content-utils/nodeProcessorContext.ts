import { IContentParseOptions, INodeProcessorContext } from 'types/parser';
import { IMLParsedNode, MLNODE_TYPES } from 'types/models';
import { MLParseContext } from './parserContext';

export class NodeProcessorContext implements INodeProcessorContext {
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
