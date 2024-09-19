import React from 'react';
import { ContentComponent } from '../ContentComponent';
import { Line } from '@melsloop/ml-components';
import { MLNODE_TYPES } from 'lib/types/nodes';
import type { ContentComponentProps } from '../types';

export const LineContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { line, children } = node;
	const anchor = <a id={`line${line + 1}`}></a>;

	if (!children?.length) {
		return <span className="empty text-line"></span>;
	}

	if (children.length === 1 && children[0].type === MLNODE_TYPES.TEXT) {
		return (
			<Line index={line + 1}>
				{anchor}
				{node.children[0].text}
			</Line>
		);
	}

	return (
		<Line>
			{anchor}
			{children.map((node) => (
				<ContentComponent
					key={node.key}
					componentData={{ node }}
				/>
			))}
		</Line>
	);
};

export default LineContentBlock;
