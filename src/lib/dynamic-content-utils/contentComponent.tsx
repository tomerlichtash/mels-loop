import React from 'react';
import { ContentIterator } from './contentIterator';
import { LinkSelector } from './linkSelector';
import {
	ContentComponentProps,
	MLNODE_TYPES,
	NODE_LIST_TYPES,
} from 'types/models';
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
} from './content-blocks';

export const ContentComponent = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, type } = node;

	if (!key) {
		console.warn('missing key on', node);
	}

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
		case MLNODE_TYPES.PARAGRAPH:
			return <ParagraphContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.LINE:
			return <LineContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.CODE:
			return <CodeInlineContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.CODEBLOCK:
			return <CodeBlockContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.BLOCKQUOTE:
			return <BlockquoteContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.TEXT:
			const { text } = node;
			return <span key={key}>{text}</span>;
		case MLNODE_TYPES.LIST:
			return (
				<ContentIterator
					key={key}
					componentData={{
						...componentData,
						tag: node.ordered
							? NODE_LIST_TYPES.ORDERED
							: NODE_LIST_TYPES.UNORDERED,
					}}
				/>
			);
		case MLNODE_TYPES.LIST_ITEM:
			return <ListItemContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.LINK:
			return <LinkSelector key={key} componentData={componentData} />;
		case MLNODE_TYPES.IMAGE:
			return (
				<CustomImageContentBlock key={key} componentData={componentData} />
			);
		case MLNODE_TYPES.FIGURE:
			return <FigureContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.TABLE:
			return <TableContentBlock key={key} componentData={componentData} />;
		case MLNODE_TYPES.HR:
			return <hr />;
		default:
			if (/heading/i.test(type)) {
				return (
					<HeadingContentBlock
						key={key}
						componentData={componentData}
						className={`content-component-heading-${node.level}`}
					/>
				);
			}
			return (
				<div className="error" key={key}>
					<pre>Type "{node.type}" not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
