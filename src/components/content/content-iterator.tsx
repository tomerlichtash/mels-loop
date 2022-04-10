import React from "react";
import { ContentComponent } from "./index";
import { ContentComponentProps, IMLParsedNode } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import { st, classes } from "./content-iterator.st.css";

const UUID = "ContentIterator";

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
					<Tag className={className} key={mlUtils.uniqueId(UUID)}>
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
			<Tag className={st(classes[Tag], className)} key={mlUtils.uniqueId(UUID)}>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId(UUID)}
							componentData={{ node }}
						/>
					);
				})}
			</Tag>
		);
	} else {
		return (
			<>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId(UUID)}
							componentData={{ node }}
						/>
					);
				})}
			</>
		);
	}
};

export default ContentIterator;
