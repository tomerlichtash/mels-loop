import { renderNodes } from '../lib/content-component/helpers/renderNodes';
import type { IParsedNode, IParsedPage } from 'lib/types/models';

export const renderElements = (pageData: IParsedPage[]) => {
	const page = pageData[0] || ({} as IParsedPage);
	const elements: IParsedNode[] = page.parsed;
	return renderNodes(elements);
};
