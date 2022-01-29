import React from "react";
import { ContentComponent } from "./index";
import { ContentComponentProps, IMLParsedNode } from "../../interfaces/models";
import { style, classes } from "./content-iterator.st.css";

export const ContentIterator = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const p = data.node;

	if (!p) {
		console.warn("Content Iterator: no input node");
		return <div className={classes.noData}></div>;
	}

	const elements: IMLParsedNode[] = Array.isArray(p.children) && p.children;
	const Tag = data.tag as keyof JSX.IntrinsicElements;

	if (!elements) {
		if (p.text) {
			if (Tag) {
				return (
					<Tag className={data.style || ""} key={p.key}>
						{p.text}
					</Tag>
				);
			}
			return (
				<span className={style(classes.root, { type: "text" })}>{p.text}</span>
			);
		}
		return <span className={style(classes.root, { type: "unknown" })}></span>;
	}

	if (Tag) {
		return (
			<Tag className={classes[Tag]} key={p.key}>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={node.key}
							componentData={{
								node: node,
							}}
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
							key={node.key}
							componentData={{
								node: node,
							}}
						/>
					);
				})}
			</>
		);
	}
};

export default ContentIterator;
