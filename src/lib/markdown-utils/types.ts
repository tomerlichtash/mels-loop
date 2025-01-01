import { MLParseContext } from 'lib/parserContext';
import { LoadFolderModes } from 'types/parser/modes';
import type { IMLParsedNode, ParsedNode } from 'types/models';
import type { IContentParseOptions } from 'types/parser/parser';

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
