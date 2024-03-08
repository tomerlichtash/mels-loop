import React from 'react';
import { ContentIterator } from './contentIterator';
import { MLNODE_TYPES } from 'types/nodes';
import { LinkSelector } from './linkSelector';
import {
	HeadingContentBlock,
	ListItemContentBlock,
	LineContentBlock,
	ParagraphContentBlock,
	FigureContentBlock,
	BlockquoteContentBlock,
	TableContentBlock,
	CustomImageContentBlock,
	CodeInlineContentBlock,
	CodeBlockContentBlock,
	ListContentBlock,
	TextContentBlock,
} from './content-blocks';
import type { ContentComponentProps } from 'types/models';
import { ErrorMessage } from 'components/index';

export const ContentComponent = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, type } = node;

	if (!key) {
		console.warn('missing key on', node);
	}

	const props = { key, componentData };

	switch (type) {
		case MLNODE_TYPES.DEL:
		case MLNODE_TYPES.INS:
		case MLNODE_TYPES.STRONG:
		case MLNODE_TYPES.EM:
		case MLNODE_TYPES.TR:
		case MLNODE_TYPES.TD:
		case MLNODE_TYPES.TH:
		case MLNODE_TYPES.SUB:
		case MLNODE_TYPES.SUP:
		case MLNODE_TYPES.CITE:
		case MLNODE_TYPES.FIGCAPTION:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: type, ...componentData }}
				/>
			);
		case MLNODE_TYPES.LINK:
			return <LinkSelector {...props} />;
		case MLNODE_TYPES.TEXT:
			return <TextContentBlock {...props} />;
		case MLNODE_TYPES.PARAGRAPH:
			return <ParagraphContentBlock {...props} />;
		case MLNODE_TYPES.LINE:
			return <LineContentBlock {...props} />;
		case MLNODE_TYPES.CODE:
			return <CodeInlineContentBlock {...props} />;
		case MLNODE_TYPES.CODEBLOCK:
			return <CodeBlockContentBlock {...props} />;
		case MLNODE_TYPES.BLOCKQUOTE:
			return <BlockquoteContentBlock {...props} />;
		case MLNODE_TYPES.LIST:
			return <ListContentBlock {...props} />;
		case MLNODE_TYPES.LIST_ITEM:
			return <ListItemContentBlock {...props} />;
		case MLNODE_TYPES.IMAGE:
			return <CustomImageContentBlock {...props} />;
		case MLNODE_TYPES.FIGURE:
			return <FigureContentBlock {...props} />;
		case MLNODE_TYPES.TABLE:
			return <TableContentBlock {...props} />;
		case MLNODE_TYPES.HR:
			return <hr />;
		default:
			if (/heading/i.test(type)) {
				return <HeadingContentBlock {...props} />;
			}
			return <ErrorMessage message={`Type "${node.type}" not found`} />;
	}
};

export default ContentComponent;
