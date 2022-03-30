import React, { useRef, useContext } from "react";
import { ReactQueryContext } from "../../../../contexts/query-context";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";
import { classes } from "./paragraph.st.css";

export const Paragraph = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const children = node.children || [];
	const ref = useRef(null);
	const { addRef } = useContext(ReactQueryContext);

	if (children.length === 0) {
		return <p className={classes.empty}></p>;
	}

	const { line, key } = node;
	addRef(ref, key, line);

	if (children.length === 1 && children[0].type === "text") {
		return (
			<p
				key={node.key}
				className={className}
				data-line-index={line + 1}
				data-has-ref={"WITH_CHILDREN"}
				ref={ref}
			>
				<a id={`line${line + 1}`}></a>
				{node.children[0].text}
			</p>
		);
	}

	return (
		<p
			key={node.key}
			className={className}
			data-line-index={line + 1}
			ref={ref}
			data-has-ref={"SINGLE"}
		>
			<a id={`line${line + 1}`}></a>
			{children.map((node) => (
				<ContentComponent
					key={node.key}
					className={className}
					componentData={{ node }}
				/>
			))}
		</p>
	);
};

export default Paragraph;
