import {
	IFolderContent,
	ILocaleMap,
	IParsedPageData,
	PageSortField,
} from 'types/models';

export class FolderContent implements IFolderContent {
	public pages: IParsedPageData[] = [];
	public ids: ILocaleMap[] = [];
	public paths: string[];

	sortOn(field: PageSortField): IParsedPageData[] {
		if (!this.pages) {
			return [];
		}

		const key = String(field);

		return this.pages.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
	}
}
