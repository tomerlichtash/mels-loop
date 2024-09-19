// import { MLParseModes } from 'types/parser/modes';
import { customMarkdownTags } from '../nodeTypes/customMarkdownTags';
import { parseDate } from '../helpers/parseDate';
import { safeMerge } from '../helpers/safeMerge';
import { ParseModes } from 'lib/types/modes';
import type { IFigureConfiguration, IPageMeta, IParsedPage } from 'lib/types/models';

export class PageMetaData implements IPageMeta {
	constructor(data: Partial<IParsedPage> | string) {
		safeMerge(this, data);
		if (this.date && typeof this.date === 'string') {
			this.date = parseDate(this.date);
		}
	}
	public toObject(): IPageMeta {
		return {
			...this
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
	public parse_mode = ParseModes.AUTO;
	public figures: IFigureConfiguration = {
		auto: true,
		base: 1,
		template: `[[${customMarkdownTags.figureAbbr}]] %index%`
	};
}
