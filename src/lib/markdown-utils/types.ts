import { MLParseContext } from 'lib/parserContext';
import {
	ILocaleMap,
	IMLParsedNode,
	IParsedPageData,
	PageSortField,
	ParsedNode,
} from 'types/models';
import type { IContentParseOptions } from 'types/parser';
import { LoadFolderModes } from 'types/parser/modes';

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

export type ParsedNodeProcessor = (
	node: ParsedNode,
	context: MLParseContext
) => IMLParsedNode;

export interface IFigureInfo {
	readonly index: number;
	readonly realIndex: number;
	readonly id: string;
}
