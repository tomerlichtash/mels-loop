import {
	ICaptionConfiguration,
	IPageMetaData,
	IParsedPageData,
} from 'types/models';
import { safeMerge, parseDate } from 'utils/index';
import { MLParseModes } from 'types/parser/modes';
import { MLNODE_TYPES } from '../../types';

export class PageMetaData implements IPageMetaData {
	constructor(data: Partial<IParsedPageData> | string) {
		safeMerge(this, data);
		if (this.date && typeof this.date === 'string') {
			this.date = parseDate(this.date);
		}
	}
	public toObject(): IPageMetaData {
		return {
			...this,
		};
	}
	public glossary_key = '';
	public date: Date = null;
	public title = '';
	public abstract = '';
	public moto = '';
	public author = '';
	public credits = '';
	public source_url = '';
	public source_name = '';
	public source_author = '';
	// value must be falsy, so initially it doesn't affect the parse mode computation
	public parse_mode = MLParseModes.AUTO;
	public readonly captions: Partial<Record<MLNODE_TYPES, ICaptionConfiguration>> = {
		[MLNODE_TYPES.FIGURE]: {
			auto: true,
			base: 1,
//			template: `[[FIGURE_ABBR]] %index%`,
			template: `[[markdown:tags:figure:abbr]] %index%`,
			
		}
	};
}
