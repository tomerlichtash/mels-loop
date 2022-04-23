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
// import { ReactThemeContext } from "../../../../contexts/theme-context";
import { ReactLocaleContext } from "../../../../contexts/locale-context";
import { ReactQueryContext } from "../../../../contexts/query-context";
import DynamicContentBrowser from "../../../dynamic-content-browser";
import { ReactDynamicContentContext } from "../../../../contexts/dynamic-content-context";
import {
	st as layoutStyle,
	classes as layoutClasses,
} from "../../../layout/layout.st.css";

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

export const LinkSelector = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const dcContext = useContext(ReactDynamicContentContext);
	const queryContext = useContext(ReactQueryContext);
	const { locale, textDirection } = useContext(ReactLocaleContext);

	const { query } = queryContext;
	const { getQueryUrl, registerNode, onExit } = query;
	const nodeWithQuery = registerNode(node);

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
		return (
			<Link
				key={key}
				componentData={componentData}
				onClick={onClick}
				className={className}
			/>
		);
	}
	return (
		<Popover
			type={linkType}
			id={node.target}
			forcePopover={nodeWithQuery}
			query={getQueryUrl(node)}
			onExit={() => onExit()}
			side={textDirection === "ltr" ? "right" : "left"}
			trigger={getTriggerComp(linkType, componentData, className)}
			portalled={true}
			portalStyles={layoutStyle(layoutClasses.root, { locale, theme: "light" })}
		>
			<DynamicContentBrowser node={node} />
		</Popover>
	);
};

export default LinkSelector;
