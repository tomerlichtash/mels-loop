import { NodeIndexer } from './nodeIndexer';
import { clonePlainObject } from 'utils/clonePlainObject';
import { VALID_PARSE_MODES } from './parseModes';
import { MLParseModes, type IContentParseOptions } from 'types/parser';
import { IMLParsedNode, IPageMetaData } from 'types/models';

export class MLParseContext {
	private _linkDefs: { [key: string]: IMLParsedNode } = {};
	private _indexer: NodeIndexer = new NodeIndexer();
	private readonly _metaData: IPageMetaData;
	private readonly _mode: IContentParseOptions;

	constructor(mode: IContentParseOptions, metaData: IPageMetaData) {
		const parseMode = mode.parseMode || metaData.parse_mode;

		this._mode = {
			...mode,
			parseMode: VALID_PARSE_MODES.has(parseMode)
				? parseMode
				: MLParseModes.NORMAL,
		};

		this._metaData = clonePlainObject(metaData);
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
