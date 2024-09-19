import { DynamicContentTypes } from '../../types';

export interface IDynamicContentRequest {
	type: DynamicContentTypes;
	locale: string;
	ids: Array<string>;
	document?: string;
}
