import React from 'react';
import { ContentComponentProps } from '../../../types/models';
import { ContentIterator } from '../contentIterator';
import { Link } from '@components/link/Link';

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

const linkAttrs = {
	target: '_blank',
	rel: 'noreferrer',
};

const isAnchor = (target: string) => target && target[0] === '#';

export const LinkContentBlock = ({
	componentData,
	onClick,
}: ILinkProps): JSX.Element => {
	const { node } = componentData;
	const targetAttrs = isAnchor(node.target) ? {} : linkAttrs;
	return (
		<Link href={node.target} onClick={onClick} {...targetAttrs}>
			<ContentIterator componentData={componentData} />
		</Link>
	);
};
