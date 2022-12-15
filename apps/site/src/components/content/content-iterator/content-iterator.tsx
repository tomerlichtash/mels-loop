import React from "react";
import ContentComponent from "../content-component";
import {
	ContentComponentProps,
	IMLParsedNode,
} from "../../../interfaces/models";
import { mlUtils } from "../../../lib/ml-utils";
import { st, classes } from "./content-iterator.st.css";
import { useComponentAttributes } from "../../use-component-attributes";

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

	const { attributes } = useComponentAttributes(node);

	if (!node) {
		console.warn("Content Iterator: no input node");
		return <div className={classes.noData}></div>;
	}

	const elements: IMLParsedNode[] =
		Array.isArray(node.children) && node.children;
	const Tag = componentData.tag as keyof JSX.IntrinsicElements;

	if (!elements?.length) {
		if (Tag) {
			return (
				<Tag className={className} key={mlUtils.uniqueId()} {...attributes}>
					{node.text || ""}
				</Tag>
			);
		}

		return (
			<span className={className} key={mlUtils.uniqueId()}>
				{node.text || ""}
			</span>
		);
	}

	if (Tag) {
		return (
			<Tag
				className={st(classes[Tag], className)}
				key={mlUtils.uniqueId()}
				{...attributes}
			>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={className}
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
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={className}
						/>
					);
				})}
			</>
		);
	}
};

export default ContentIterator;
