import React from 'react';
import { useComponentAttrs } from '../useComponentAttrs/useComponentAttrs';
import { Table } from '@melsloop/ml-components';
import { renderNodes } from '../helpers/renderNodes';
import type { ContentComponentProps } from '../types';

export const TableContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);
	const { key, children } = node;
	return (
		<Table
			key={key}
			{...attributes}
		>
			{renderNodes(children)}
		</Table>
	);
};

export default TableContentBlock;
