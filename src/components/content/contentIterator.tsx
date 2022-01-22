import React from "react";
import ContentComponent from "./contentComponent";
import {
	IContentComponentInitData,
	IMLParsedNode,
} from "../../interfaces/models";
import { style, classes } from "./content-iterator.st.css";

export const ContentIterator = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
	const data = props.data,
		p = data.data;
	const elements: IMLParsedNode[] = Array.isArray(p.children) && p.children;
	const Tag = data.tag as keyof JSX.IntrinsicElements;
	if (!elements) {
		if (p.text) {
			if (Tag) {
				return (
					<Tag className={data.style || ""} key={p.key}>{p.text}</Tag>
				)
			}
			return (
				<span className={style(classes.root, { type: "text" })}>{p.text}</span>
			);
		}
		return <span className={style(classes.root, { type: "unknown" })}></span>;
	}
	if (Tag) {
		return (
			<Tag className={data.style || ""} key={p.key}>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={node.key}
							data={{
								data: node,
								locale: props.data.locale,
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
							data={{
								data: node,
								locale: props.data.locale,
							}}
						/>
					);
				})}
			</>
		);
	}
};

export default ContentIterator;
