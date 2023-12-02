import React, { useEffect, useState } from "react";
import { DynamicContentContext } from "../../../contexts/dynamic-content-context";
import { IDynamicContentContext } from "../types/dynamic-content-context";
import { IMLParsedNode, IParsedPageData } from "../../../interfaces/models";
import { ContentStack } from "./content-stack";
import DynamicContentViewer from "../dynamic-content-viewer";
import DynamicContentToolbar from "../dynamic-content-toolbar";

export interface IStackBrowserProps {
	node: IMLParsedNode;
}

export default function DynamicContentBrowser(
	props: IStackBrowserProps
): JSX.Element {
	const [currentNode, setCurrentNode] = useState<IMLParsedNode>(props.node);
	const [currentPage, setCurrentPage] = useState<IParsedPageData>(null);
	// always one less than the contentstack's length, which starts at 0
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [contentStack] = useState(new ContentStack<IMLParsedNode>());
	const [pageStack] = useState(new ContentStack<IParsedPageData>("id"));
	const [pages, setPages] = useState<Array<IParsedPageData>>([]);
	const [url, setUrl] = useState("");

	useEffect(() => {
		contentStack.push(currentNode);
		setUrl(contentStack.current?.target);
	}, [currentNode, contentStack]);

	useEffect(() => {
		pageStack.push(currentPage);
		setCurrentIndex(contentStack.count - 1);
	}, [currentPage, pageStack, contentStack]);

	useEffect(() => {
		if (currentIndex >= 0) {
			setCurrentNode(contentStack.setIndex(currentIndex).current);
			setPages(pageStack.setIndex(currentIndex).stack);
		}
	}, [currentIndex, pageStack, contentStack]);

	if (!url) {
		return <></>;
	}
	const ctx: IDynamicContentContext = {
		currentNode,
		currentPage,
		addContentNode: setCurrentNode,
		addPage: setCurrentPage,
		pageIndex: currentIndex,
		setPageIndex: setCurrentIndex,
	};
	return (
		<DynamicContentContext.Provider value={ctx}>
			<>
				<DynamicContentToolbar pages={pages} />
				<DynamicContentViewer url={url} />
			</>
		</DynamicContentContext.Provider>
	);
}
