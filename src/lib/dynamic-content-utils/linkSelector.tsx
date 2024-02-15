import React, { useContext } from 'react';
import { ContentComponentProps, NODE_DISPLAY_TYPES } from 'types/models';
import { LinkContentBlock } from './content-blocks';
import { DynamicContentContext } from './context/contentContext';
import { PopoverContentBlock } from './content-blocks/popoverContentBlock';
import { useLocale } from 'hooks/useLocale';

export const LinkSelector = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const ctx = useContext(DynamicContentContext);
	const { textDirection, lang } = useLocale();

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return <LinkContentBlock key={key} componentData={componentData} />;
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
			data-testid={`${node.linkType}_${node.target.split(`/`)[1]}`}
			type={node.linkType}
			componentData={componentData}
			textDirection={textDirection}
			locale={lang}
		/>
	);
};
