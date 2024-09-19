import React, { PropsWithChildren } from 'react';
import { DynamicContentServer } from './dynamic-content-server/DynamicContentServer';
import { PageContext } from './PageContext';
import { PageContextClass } from './PageContextClass';

type PageProviderProps = {
	documentPath: string;
};

export const PageProvider = ({
	documentPath,
	children
}: PropsWithChildren<PageProviderProps>) => (
	<PageContext.Provider value={new PageContextClass(new DynamicContentServer(), documentPath)}>
		{children}
	</PageContext.Provider>
);

export default PageProvider;
