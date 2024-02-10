import React from 'react';
import { ContentComponent } from '../contentComponent';
import { IMLParsedNode, ContentComponentProps } from 'types/models';
import { useComponentAttrs } from '../../../hooks/useComponentAttrs';
import { Table } from 'components';

export const TableContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<Table key={node.key} {...attributes}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</Table>
	);
};

export default TableContentBlock;
