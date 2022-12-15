import React, { useContext } from "react";
import { DynamicContentTypes } from "../../../interfaces/dynamic-content";
import {
	ContentComponentProps,
	IContentComponentInitData,
	NODE_DISPLAY_TYPES,
} from "../../../interfaces/models";
import { Link, AnnotationLink, TermLink } from "../content-blocks";
import Popover from "../../popover";
import { ReactLocaleContext } from "../../../contexts/locale-context";
import DynamicContentBrowser from "../dynamic-content-browser";
import { ReactDynamicContentContext } from "../../../contexts/dynamic-content-context";

const getTriggerComp = (
	type: DynamicContentTypes,
	data: IContentComponentInitData,
	className: string
): React.ReactNode => {
	switch (type) {
		case DynamicContentTypes.Annotation:
			return <AnnotationLink className={className} componentData={data} />;
		default:
			return <TermLink className={className} componentData={data} />;
	}
};

export const LinkSelector = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { displayType, key } = node;
	const dcContext = useContext(ReactDynamicContentContext);
	const { textDirection } = useContext(ReactLocaleContext);

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
		<span
			data-link-type={node.linkType}
			data-link-target={node.target.split(`/`)[1]}
		>
			<Popover
				type={linkType}
				id={node.target}
				side={textDirection === "ltr" ? "right" : "left"}
				trigger={getTriggerComp(linkType, componentData, className)}
			>
				<DynamicContentBrowser node={node} />
			</Popover>
		</span>
	);
};

export default LinkSelector;
