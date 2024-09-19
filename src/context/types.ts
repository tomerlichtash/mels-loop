import type { IParsedPage } from 'lib/types/models';
import { IDynamicContentRequest } from './page/dynamic-content-server/types';

// Types of dynamic content
export enum DynamicContentTypes {
	Glossary = 'glossary',
	Annotation = 'annotation',
	// Must remain an empty string, so it can be used in truthy/falsy tests
	None = ''
}

export interface IDynamicContentServer {
	/**
	 * Retrieve parsed page data for each id, given local and content type
	 * @param type
	 * @param locale
	 * @param ids
	 */
	getItems(options: IDynamicContentRequest): Promise<IParsedPage[]>;
}
