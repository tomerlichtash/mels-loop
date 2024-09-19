import React, { useContext } from 'react';
import DynamicContentContext from '../../context/content/DynamicContentContext';
import { LinkContentBlock, PopoverContentBlock } from './content-blocks';
import { NODE_DISPLAY_TYPES } from 'lib/types/nodes';
import type { ContentComponentProps } from './types';

export const LinkSelector = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const ctx = useContext(DynamicContentContext);

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return (
			<LinkContentBlock
				key={key}
				componentData={componentData}
			/>
		);
	}

	if (ctx) {
		const onClick = (evt: React.MouseEvent) => {
			ctx.addContentNode(node);
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		};

		return (
			<LinkContentBlock
				key={key}
				componentData={componentData}
				onClick={onClick}
			/>
		);
	}

	return (
		<PopoverContentBlock
			type={node.linkType}
			componentData={componentData}
			data-testid={`${node.linkType}_${node.target.split(`/`)[1]}`}
		/>
	);
};
