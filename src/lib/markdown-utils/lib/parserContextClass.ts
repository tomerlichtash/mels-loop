import { NodeIndexer } from './nodeIndexer';
import { clonePlainObject } from '../helpers/clonePlainObject';
import { VALID_PARSE_MODES } from './parseModes';
import { ParseModes } from 'lib/types/modes';
import type { IContentParseOptions } from '../types';
import type { IParsedNode, IPageMeta } from 'lib/types/models';
// import type { IContentParseOptions } from 'lib/types/parser';

export class ParseContext {
	private _linkDefs: { [key: string]: IParsedNode } = {};
	private _indexer: NodeIndexer = new NodeIndexer();
	private readonly _metaData: IPageMeta;
	private readonly _mode: IContentParseOptions;

	constructor(mode: IContentParseOptions, metaData: IPageMeta) {
		const parseMode = mode.parseMode || metaData.parse_mode;

		this._mode = {
			...mode,
			parseMode: VALID_PARSE_MODES.has(parseMode) ? parseMode : ParseModes.NORMAL
		};

		this._metaData = clonePlainObject(metaData);
	}

	public get mode(): IContentParseOptions {
		return this._mode;
	}

	public clone(mode: Partial<IContentParseOptions>): ParseContext {
		const newMode: IContentParseOptions = Object.assign(Object.assign({}, this.mode), mode);

		const ret = new ParseContext(newMode, this._metaData);

		ret._indexer = this.indexer;
		ret._linkDefs = this._linkDefs;

		return ret;
	}

	public get metaData(): IPageMeta {
		return this._metaData;
	}

	public get linkDefs(): { [key: string]: IParsedNode } {
		return this._linkDefs;
	}

	public get indexer(): NodeIndexer {
		return this._indexer;
	}
}
