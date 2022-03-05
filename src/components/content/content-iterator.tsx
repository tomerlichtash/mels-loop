import React from "react";
import { ContentComponent } from "./index";
import { ContentComponentProps, IMLParsedNode } from "../../interfaces/models";
import { style, classes } from "./content-iterator.st.css";

export const ContentIterator = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const p = data.node;
	const { className } = props;

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
					<Tag className={className} key={p.key}>
						{p.text}
					</Tag>
				);
			}

			return (
				<span className={style(classes.root, { type: "text" }, className)}>
					{p.text}
				</span>
			);
		}
		return (
			<span
				className={style(classes.root, { type: "unknown" }, className)}
			></span>
		);
	}

	if (Tag) {
		return (
			<Tag className={style(classes[Tag], className)} key={p.key}>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={node.key}
							className={className}
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
