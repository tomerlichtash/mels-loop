import React from "react";
import { ContentComponent } from "./index";
import { ContentComponentProps, IMLParsedNode } from "../../interfaces/models";
import { v4 as uuidv4 } from "uuid";
import { st, classes } from "./content-iterator.st.css";

export const ContentIterator = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;

	if (!node) {
		console.warn("Content Iterator: no input node");
		return <div className={classes.noData}></div>;
	}

	const elements: IMLParsedNode[] =
		Array.isArray(node.children) && node.children;
	const Tag = componentData.tag as keyof JSX.IntrinsicElements;

	if (!elements) {
		if (node.text) {
			if (Tag) {
				return (
					<Tag className={className} key={uuidv4()}>
						{node.text}
					</Tag>
				);
			}

			return <span className={className}>{node.text}</span>;
		}
		return <span></span>;
	}

	if (Tag) {
		return (
			<Tag className={st(classes[Tag], className)} key={uuidv4()}>
				{elements.map((node) => {
					return <ContentComponent key={uuidv4()} componentData={{ node }} />;
				})}
			</Tag>
		);
	} else {
		return (
			<>
				{elements.map((node) => {
					return <ContentComponent key={uuidv4()} componentData={{ node }} />;
				})}
			</>
		);
	}
};

export default ContentIterator;
