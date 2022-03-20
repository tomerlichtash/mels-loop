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
import { ReactLayoutContext } from "../../../../contexts/layout-context";
import { CloseButtonPosition } from "../../../popover/popover";
import DynamicContentBrowser from "../../../dynamic-content-browser";
import { ReactDynamicContentContext } from "../../../../contexts/dynamic-content-context";

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

const getCloseButtonPosition = (locale: string): CloseButtonPosition => {
	return locale === "en" ? "right" : "left";
};

export const LinkSelector = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const dcContext = useContext(ReactDynamicContentContext);
	const { locale } = useContext(ReactLayoutContext);

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		console.log("linkselector rendering normal link");
		return <Link key={key} componentData={componentData} />;
	}

	const { linkType } = node;
	if (dcContext) {
		console.log("linkselector rendering click-only link");
		const onClick = (evt: React.MouseEvent) => {
			dcContext.setCurrentNode(node);
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		};
		return <Link key={key} componentData={componentData}
			onClick={onClick}/>;
	}
	console.log("link selector rendering popover");
	return (
		<Popover
			type={linkType}
			closePosX={getCloseButtonPosition(locale)}
			trigger={getTriggerComp(linkType, componentData)}
		>
			<DynamicContentBrowser 
				node={node}></DynamicContentBrowser>
		</Popover>
	);
};

export default LinkSelector;
