import { IParsedNode, IPageMeta, IParsedPage } from 'lib/types/models';

export class ParsedPageData implements IParsedPage {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	constructor(data: Partial<IParsedPage>) {
		Object.keys(this).forEach((key) => {
			if (data[key] !== undefined) {
				this[key] = data[key];
			}
		});
	}
	public toObject(): IParsedPage {
		return {
			...this
		};
	}
	public metaData: IPageMeta = null;
	public id = '';
	public chapterId = '';
	public path = '';
	public parsed: IParsedNode[] = [];
	public error?: string = '';
}
