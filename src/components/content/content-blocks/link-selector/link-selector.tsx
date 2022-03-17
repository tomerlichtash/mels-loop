import React from "react";
import { DynamicContentTypes } from "../../../../interfaces/dynamic-content";
import {
	ContentComponentProps,
	NODE_DISPLAY_TYPES,
} from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { Link } from "../link/link";
import AnnotationLink from "../annotation-link";
import PopoverLink from "../popover-link";

export const LinkSelector = (props: ContentComponentProps): JSX.Element => {
	const node = props.componentData.node;
	if (node.displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return <Link key={node.key} componentData={props.componentData} />;
	}
	const isAnnotation = node.linkType === DynamicContentTypes.Annotation;
	return (
		<PopoverLink url={node.target} isAnnotation={isAnnotation}>
			{isAnnotation ? (
				<AnnotationLink componentData={props.componentData} />
			) : (
				<ContentIterator componentData={props.componentData} />
			)}
		</PopoverLink>
	);
};

export default LinkSelector;
