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
import { ReactQueryContext } from "../../../../contexts/query-context";
import { CloseButtonPosition } from "../../../popover/popover";
import DynamicContentBrowser from "../../../dynamic-content-browser";
import { ReactDynamicContentContext } from "../../../../contexts/dynamic-content-context";

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

const getCloseButtonPosition = (locale: string): CloseButtonPosition => {
	return locale === "en" ? "right" : "left";
};

export const LinkSelector = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const dcContext = useContext(ReactDynamicContentContext);
	const queryContext = useContext(ReactQueryContext);
	const { locale } = useContext(ReactLayoutContext);

	if (displayType !== NODE_DISPLAY_TYPES.POPOVER) {
		return (
			<Link key={key} componentData={componentData} className={className} />
		);
	}

	const { linkType } = node;
	if (dcContext) {
		const onClick = (evt: React.MouseEvent) => {
			dcContext.addContentNode(node);
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		};
		return <Link key={key} componentData={componentData} onClick={onClick} />;
	}

	const { registerNode, onExit } = queryContext;
	const nodeWithQuery = registerNode(node);
	return (
		<Popover
			type={linkType}
			id={node.target}
			forcePopover={nodeWithQuery}
			onExit={() => onExit()}
			closePosX={getCloseButtonPosition(locale)}
			side={locale === "en" ? "right" : "left"}
			trigger={getTriggerComp(linkType, componentData, className)}
			className={className}
		>
			<DynamicContentBrowser node={node} />
		</Popover>
	);
};

export default LinkSelector;
