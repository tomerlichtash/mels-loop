import React, { Context, createContext } from 'react';
import { DynamicContentServer } from 'lib/dynamic-content-utils/dynamicContentServer';
import type { IDynamicContentServer } from 'lib/types/types';
import type { IPageContext } from '../types';

export class PageContextClass implements IPageContext {
	constructor(
		public readonly dynamicContentServer: IDynamicContentServer,
		public documentPath: string
	) {}
}

const ctx = createContext<IPageContext>(new PageContextClass(null, ''));

export const PageContext: Context<IPageContext> = ctx;

export const PageProvider = ({ documentPath, children }) => (
	<PageContext.Provider
		value={
			new PageContextClass(new DynamicContentServer(), documentPath as string)
		}
	>
		{children}
	</PageContext.Provider>
);

export default PageProvider;
