import { ContentComponent } from './dynamic-content-utils/contentComponent';
import type { IMLParsedNode, IParsedPageData } from 'types/models';

export const renderElements = (pageData: IParsedPageData[]) => {
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed;
	return renderNodes(elements);
};

export const renderNodes = (elements: IMLParsedNode[]) =>
	(Array.isArray(elements) ? elements : []).map((node: IMLParsedNode) => (
		<ContentComponent
			key={`content-component-${node.type}-${node.line}-${node.key}`}
			componentData={{ node }}
		/>
	));

export const getMetadata = (keys: string[], pageData: IParsedPageData[]) => {
	const { metaData } = pageData[0];
	return keys.map((k: string) => metaData?.[k]);
};
