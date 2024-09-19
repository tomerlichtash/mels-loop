import React from 'react';
import { ContentIterator } from '../ContentIterator';
import { Link } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

const linkAttrs = {
	target: '_blank',
	rel: 'noreferrer'
};

const isAnchor = (target: string) => target && target[0] === '#';

export const LinkContentBlock = ({ componentData, onClick }: ILinkProps): JSX.Element => {
	const { node } = componentData;
	const targetAttrs = isAnchor(node.target) ? {} : linkAttrs;
	return (
		<Link
			href={node.target}
			onClick={onClick}
			{...targetAttrs}
		>
			<ContentIterator componentData={componentData} />
		</Link>
	);
};
