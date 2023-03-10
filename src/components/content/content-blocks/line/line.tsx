import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";

export const Line = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const children = node.children || [];

	const { line } = node;
	const anchor = <a id={`line${line + 1}`}></a>;

	if (children.length === 0) {
		return <span className="empty text-line"></span>;
	}

	if (children.length === 1 && children[0].type === "text") {
		return (
			<span key={node.key} className="line" data-line-index={line + 1}>
				{anchor}
				{node.children[0].text}
			</span>
		);
	}

	return (
		<span key={node.key} className="line" data-line-index={line + 1}>
			{anchor}
			{children.map((node) => (
				<ContentComponent
					key={node.key}
					className={className}
					componentData={{ node }}
				/>
			))}
		</span>
	);
};

export default Line;
