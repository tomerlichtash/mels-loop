import type { IMLParsedNode, IParsedPageData } from 'types/models';
import { ContentComponent } from './contentComponent';
import { mlUtils } from 'lib/ml-utils';

export const renderElements = (pageData) => {
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed;

	return elements.map((node: IMLParsedNode) => (
		<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
	));
};

export const getMetadata = (keys, pageData) => {
	const { metaData } = pageData[0];
	return keys.map((k) => metaData?.[k]);
};
