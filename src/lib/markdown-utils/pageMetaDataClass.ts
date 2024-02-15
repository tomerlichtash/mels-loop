import {
	IFigureConfiguration,
	IPageMetaData,
	IParsedPageData,
} from 'types/models';
import { safeMerge, parseDate } from 'utils/index';
import { MLParseModes } from 'types/parser';
import { customMarkdownTags } from 'lib/customMarkdownTags';

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
	public figures: IFigureConfiguration = {
		auto: true,
		base: 1,
		template: `[[${customMarkdownTags.figureAbbr}]] %index%`,
	};
}
