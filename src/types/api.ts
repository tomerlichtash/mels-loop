import { DynamicContentTypes } from '../lib/types';
import { IParsedPageData } from './models';

export interface IMLApiResponse<T> {
	error?: string;
	data: T;
}

export interface IMLDynamicContentParams {
	readonly locale: string;
	readonly type: DynamicContentTypes;
	readonly document?: string;
}

export interface IMLDynamicContentResponse {
	/**  The locale of this response */
	locale: string;
	/** Map of pageId => page data */
	items: { [pageId: string]: IParsedPageData };
}
