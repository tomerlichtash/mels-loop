import { useEffect, useState } from "react";
import { IMLParsedNode } from "../interfaces/models";
import { mlNextBrowserUtils } from "../lib/next-browser-utils";

type AttributeMap = { [key: string]: string };
export interface IComponentAttributeData {
	attributes: AttributeMap
}
/**
 * Returns an object with the sanitized attribute map of the node
 *
 * Guaranteed not null
 * @param props
 * @returns
 */
export const useComponentAttributes = (
	node: IMLParsedNode
): IComponentAttributeData => {
	const [attributes, setAttributes] = useState<AttributeMap>(
		{}
	);

	// If the props changed, due to locale change, reparse the content
	useEffect(() => {
		setAttributes(mlNextBrowserUtils.extractNodeAttributes(node));
	}, [node]);
	return {
		attributes,
	};
};
