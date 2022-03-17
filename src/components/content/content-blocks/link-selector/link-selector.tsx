import React from "react";
import { DynamicContentTypes } from "../../../../interfaces/dynamic-content";
import {
	ContentComponentProps,
	IContentComponentInitData,
	NODE_DISPLAY_TYPES,
} from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { Link } from "../link/link";
import AnnotationLink from "../annotation-link";
import Popover from "../../../popover";
import DynamicContentViewer from "../../dynamic-content-viewer";

const getTriggerComp = (type: DynamicContentTypes, data: IContentComponentInitData): React.ReactNode => {
	switch(type) {
		case DynamicContentTypes.Annotation:
			return <AnnotationLink componentData={data} />;
		default:
			return <ContentIterator componentData={data} />
	}
}

export const LinkSelector = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return <Link key={key} componentData={componentData} />;
	}

	const { linkType, target } = node;

	return (
		<Popover trigger={getTriggerComp(linkType, componentData)}>
			<DynamicContentViewer url={target} />
		</Popover>
	);
};

export default LinkSelector;
