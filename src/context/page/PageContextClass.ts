import type { IDynamicContentServer } from 'context/types';
import type { IPageContext } from './types';

export class PageContextClass implements IPageContext {
	constructor(
		public readonly dynamicContentServer: IDynamicContentServer,
		public documentPath: string
	) {}
}
