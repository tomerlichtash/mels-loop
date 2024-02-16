import React from 'react';
import type { ContentComponentProps } from 'types/models';
import { ContentComponent } from '../contentComponent';
import { Line } from 'components/index';
import { MLNODE_TYPES } from 'types/nodes';

export const LineContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
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
		<Line index={line + 1}>
			{anchor}
			{children.map((node) => (
				<ContentComponent key={node.key} componentData={{ node }} />
			))}
		</Line>
	);
};

export default LineContentBlock;
