import React from 'react';
import { ContentComponent } from './contentComponent';
import { ContentComponentProps, IMLParsedNode } from '../../types/models';
import { mlUtils } from '../../lib/ml-utils';
import { useComponentAttrs } from './useComponentAttrs';

/**
 * Displays the content of a Content Node, optionally wrapping
 * them with a provided tag. Handles the case of a node with text
 * content.
 * @returns
 */
export const ContentIterator = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);
	const { children, text } = node;

	if (!node) {
		console.warn('Content Iterator: no input node');
		return <div className="no-data"></div>;
	}

	const elements: IMLParsedNode[] = Array.isArray(children) && children;

	const Tag = componentData.tag as keyof JSX.IntrinsicElements;

	if (!elements?.length) {
		if (Tag) {
			return (
				<Tag className={className} key={mlUtils.uniqueId()} {...attributes}>
					{text || ''}
				</Tag>
			);
		}

		return (
			<span className={className} key={mlUtils.uniqueId()}>
				{text || ''}
			</span>
		);
	}

	if (Tag) {
		return (
			<Tag key={mlUtils.uniqueId()} {...attributes}>
				{elements.map((node) => (
					<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
				))}
			</Tag>
		);
	}

	return (
		<>
			{elements.map((node) => {
				return (
					<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
				);
			})}
		</>
	);
};

export default ContentIterator;
