import React from 'react';
import { AnnotationContentBlock, TermLinkContentBlock } from './index';
import { PopoverComponent } from 'components/Popover/Popover';
import { DynamicContentTypes } from '../../../context/types';
import type { ContentComponentProps, IContentComponentInitData } from '../types';

type PopoverContentBlockProps = {
	type: DynamicContentTypes;
	'data-testid'?: string;
};

const getTriggerContentBlock = ({
	type,
	...rest
}: {
	type: string;
	componentData: IContentComponentInitData;
	className?: string;
}): React.ReactNode => {
	switch (type) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
		case DynamicContentTypes.Annotation:
			return <AnnotationContentBlock {...rest} />;
		default:
			return <TermLinkContentBlock {...rest} />;
	}
};

export const PopoverContentBlock = ({
	componentData,
	type,
	className,
	'data-testid': dataTestId
}: PopoverContentBlockProps & ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return (
		<PopoverComponent
			node={node}
			trigger={getTriggerContentBlock({ type, componentData, className })}
			data-testid={dataTestId}
		/>
	);
};
