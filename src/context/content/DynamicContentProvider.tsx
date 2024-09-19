import React, { useEffect, useState } from 'react';
import DynamicContentContext from './DynamicContentContext';
import { ContentStack } from './contentStack';
import DynamicContentViewer from './DynamicContentViewer';
import DynamicContentToolbar from './DynamicContentToolbar';
import type { IParsedNode, IParsedPage } from 'lib/types/models';
import type { IDynamicContentContext } from '../../lib/content-component/types';

export interface IStackBrowserProps {
	node: IParsedNode;
}

const DynamicContentProvider = (props: IStackBrowserProps): JSX.Element => {
	const [currentNode, setCurrentNode] = useState<IParsedNode>(props.node);
	const [currentPage, setCurrentPage] = useState<IParsedPage>(null);
	// always one less than the contentstack's length, which starts at 0
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [contentStack] = useState(new ContentStack<IParsedNode>());
	const [pageStack] = useState(new ContentStack<IParsedPage>('id'));
	const [pages, setPages] = useState<Array<IParsedPage>>([]);
	const [url, setUrl] = useState('');

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
		setPageIndex: setCurrentIndex
	};

	return (
		<DynamicContentContext.Provider value={ctx}>
			<>
				<DynamicContentToolbar pages={pages} />
				<DynamicContentViewer url={url} />
			</>
		</DynamicContentContext.Provider>
	);
};

export default DynamicContentProvider;
