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
	data: IContentComponentInitData,
	className: string
): React.ReactNode => {
	switch (type) {
		case DynamicContentTypes.Annotation:
			return <AnnotationLink className={className} componentData={data} />;
		default:
			return <ContentIterator className={className} componentData={data} />;
	}
};

const getCloseButtonPosition = (locale: string): ICloseButtonPosition => {
	return locale === "en" ? "right" : "left";
};

export const LinkSelector = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const { locale } = useContext(ReactLayoutContext);

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return (
			<Link key={key} componentData={componentData} className={className} />
		);
	}

	const { linkType, target } = node;

	return (
		<Popover
			type={linkType}
			className={className}
			closePosX={getCloseButtonPosition(locale)}
			side={locale === "en" ? "right" : "left"}
			trigger={getTriggerComp(linkType, componentData, className)}
		>
			<DynamicContentViewer url={target} />
		</Popover>
	);
};

export default LinkSelector;
