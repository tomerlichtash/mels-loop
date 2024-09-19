import { ContentComponent } from '../ContentComponent';
import type { IParsedNode } from 'lib/types/models';

export const renderNodes = (elements: IParsedNode[]) =>
	(Array.isArray(elements) ? elements : []).map((node: IParsedNode) => (
		<ContentComponent
			key={`content-component-${node.type}-${node.line}-${node.key}`}
			componentData={{ node }}
		/>
	));
