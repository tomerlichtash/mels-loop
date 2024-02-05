import React from 'react';
import { ContentComponentProps, MLNODE_TYPES } from 'types/models';
import { ContentComponent } from '../index';
import { Line } from 'components';

export const LineContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { line, children } = node;
	// const children = node.children || [];
	// const { line } = node;
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
			// <span key={node.key} className={styles.root} data-line-index={line + 1}>
			// 	{anchor}
			// 	{node.children[0].text}
			// </span>
		);
	}

	return (
		<Line index={line + 1}>
			{anchor}
			{children.map((node) => (
				<ContentComponent key={node.key} componentData={{ node }} />
			))}
		</Line>

		// <span key={node.key} className={styles.root} data-line-index={line + 1}>
		// 	{anchor}
		// 	{children.map((node) => (
		// 		<ContentComponent key={node.key} componentData={{ node }} />
		// 	))}
		// </span>
	);
};

export default LineContentBlock;
