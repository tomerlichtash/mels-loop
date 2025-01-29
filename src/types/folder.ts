export interface IFolderStaticProps {
	/** Typically the stringified ParsedPageData */
	content: string | object;

	/** The path of the first page in the document data */
	documentPath: string;
}
