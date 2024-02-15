import { ContentComponent } from './dynamic-content-utils/contentComponent';
import { unique } from 'utils/index';
import type { IMLParsedNode, IParsedPageData } from 'types/models';

export const renderElements = (pageData: IParsedPageData[]) => {
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed;

	return elements.map((node: IMLParsedNode) => (
		<ContentComponent key={unique.id()} componentData={{ node }} />
	));
};

export const getMetadata = (keys: string[], pageData: IParsedPageData[]) => {
	const { metaData } = pageData[0];
	return keys.map((k: string) => metaData?.[k]);
};
