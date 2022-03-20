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
	const [url, setUrl] = useState("");

	useEffect(() => {
		contentStack.push(currentNode);
		console.log("pushed current node to content stack, length is", contentStack.count);
		setUrl(contentStack.current?.target);
	}, [currentNode, contentStack]);

	useEffect(() => {
		pageStack.push(currentPage);
		console.log("pushed current page to page stack, length is", pageStack.count);
	}, [currentPage, pageStack]);

	if (!url) {
		console.log("dynamic content browser: no url");
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
			{/*{pageStack.count > 1 && (
				<DynamicBrowserHeader pages={pageStack.stack} />
			)}*/}
			<DynamicContentViewer url={url} />
		</ReactDynamicContentContext.Provider>
	);
}

