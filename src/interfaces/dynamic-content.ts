import { IParsedPageData } from "./models";

export enum DynamicContentTypes {
	Glossary = "glossary", Annotation = "annotation"
}

export interface IDynamicContentRecord {
	type: DynamicContentTypes;
	id: string;
}

export interface IDynamicContentServer {
	getItems(type: DynamicContentTypes, locale: string, ids: Array<string>): Promise<IParsedPageData[]>;
	urlToContentData(url: string, defaultType?: DynamicContentTypes): IDynamicContentRecord;
}
