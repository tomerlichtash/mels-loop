import { IMLParsedNode, IPageMetaData, IParsedPageData } from 'types/models';

export class ParsedPageData implements IParsedPageData {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	constructor(data: Partial<IParsedPageData>) {
		Object.keys(this).forEach((key) => {
			if (data[key] !== undefined) {
				this[key] = data[key];
			}
		});
	}

	public toObject(): IParsedPageData {
		return {
			...this,
		};
	}

	public metaData: IPageMetaData = null;
	public id = '';
	public chapterId = '';
	public path = '';
	public parsed: IMLParsedNode[] = [];
	public error?: string = '';
}
