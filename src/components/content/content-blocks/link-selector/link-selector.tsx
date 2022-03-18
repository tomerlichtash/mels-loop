import React, { useContext } from "react";
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
import { ReactLayoutContext } from "../../../../contexts/layout-context";
import { ICloseButtonPosition } from "../../../popover/popover";

const getTriggerComp = (
	type: DynamicContentTypes,
	data: IContentComponentInitData
): React.ReactNode => {
	switch (type) {
		case DynamicContentTypes.Annotation:
			return <AnnotationLink componentData={data} />;
		default:
			return <ContentIterator componentData={data} />;
	}
};

const getCloseButtonPosition = (locale: string): ICloseButtonPosition => {
	return locale === "en" ? "right" : "left";
};

export const LinkSelector = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const { locale } = useContext(ReactLayoutContext);

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return <Link key={key} componentData={componentData} />;
	}

	const { linkType, target } = node;

	return (
		<Popover
			closePosX={getCloseButtonPosition(locale)}
			trigger={getTriggerComp(linkType, componentData)}
		>
			<DynamicContentViewer url={target} />
		</Popover>
	);
};

export default LinkSelector;
