import { ILocaleMap, IParsedPageData, PageSortField } from 'types/models';
import { IContentParseOptions, LoadFolderModes } from 'types/parser';

export interface IFolderContent {
	readonly pages: IParsedPageData[];
	readonly ids: ILocaleMap[];
	sortOn(field: PageSortField): IParsedPageData[];
}

export interface ILoadContentOptions {
	/** Defaults to FOLDER */
	readonly loadMode: LoadFolderModes;
	/** The content path, relative to the content folder */
	readonly relativePath: string;
	/** If true, iterate over children folders */
	readonly locale: string;
	readonly mode?: Partial<IContentParseOptions>;
	readonly rootFolder?: string;
}
