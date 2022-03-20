import React, { useEffect, useState } from "react";
import { ReactDynamicContentContext } from "../../contexts/dynamic-content-context";
import { IDynamicContentContext } from "../../interfaces/dynamic-content-context";
import { IMLParsedNode, IParsedPageData } from "../../interfaces/models";
import { ContentStack } from "../../lib/content-stack";
import DynamicContentViewer from "../content/dynamic-content-viewer";
import DynamicBrowserHeader from "../dynamic-content-header";

export interface IStackBrowserProps {
	node: IMLParsedNode;
}

export default function DynamicContentBrowser(props: IStackBrowserProps): JSX.Element {
	const [currentNode, setCurrentNode] = useState<IMLParsedNode>(null);
	const [currentPage, setCurrentPage] = useState<IParsedPageData>(null);
	//const [contentContext] = useState<IDynamicContentContext>(new DynamicContentContext());
	const [contentStack] = useState((new ContentStack<IMLParsedNode>()).push(props.node));
	const [pageStack] = useState((new ContentStack<IParsedPageData>("id")));
	const [pages, setPages] = useState<Array<IParsedPageData>>([]);
	const [url, setUrl] = useState("");

	useEffect(() => {
		contentStack.push(currentNode);
		setUrl(contentStack.current?.target);
	}, [currentNode, contentStack]);

	useEffect(() => {
		pageStack.push(currentPage);
		setPages(pageStack.stack);
	}, [currentPage, pageStack]);

	if (!url) {
		return (<></>);
	}
	const ctx: IDynamicContentContext = {
		currentNode,
		currentPage,
		setCurrentNode,
		setCurrentPage
	};
	return (
		<ReactDynamicContentContext.Provider value={ctx}>
			<>
				{pages.length > 1 && (
				<DynamicBrowserHeader pages={pages} />
			)}
				<DynamicContentViewer url={url} />
			</>
		</ReactDynamicContentContext.Provider>
	);
}

