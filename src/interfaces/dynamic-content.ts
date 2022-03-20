import { IParsedPageData } from "./models";

/**
 * Types of dynamic content
 */
export enum DynamicContentTypes {
	Glossary = "glossary",
	Annotation = "annotation",
	/**
	 * Must remain an empty string, so it can be used in truthy/falsy tests
	 */
	None = "",
}

/**
 * describes a dynamic content item: its type and id
 */
export interface IDynamicContentRecord {
	/**
	 * Annotation, gloassary etc
	 */
	type: DynamicContentTypes;
	/**
	 * The id of the item to fetch
	 */
	id: string;
}

export interface IDynamicContentServer {
	/**
	 * Retrieve parsed page data for each id, given local and content type
	 * @param type
	 * @param locale
	 * @param ids
	 */
	getItems(
		type: DynamicContentTypes,
		locale: string,
		ids: Array<string>
	): Promise<IParsedPageData[]>;
}

