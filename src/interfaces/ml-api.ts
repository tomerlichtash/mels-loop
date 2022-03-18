import { DynamicContentTypes } from "./dynamic-content";
import { IParsedPageData } from "./models";

export interface IMLApiResponse<T> {
	error?: string;
	data: T;
}

export interface IMLDynamicContentParams {
	readonly locale: string;
	readonly type: DynamicContentTypes;
}

export interface IMLDynamicContentResponse {
	/**
	 * The locale of this response
	 */
	locale: string;
	/**
	 * Map of pageId => page data
	 */
	items: { [pageId: string]: IParsedPageData };
}
