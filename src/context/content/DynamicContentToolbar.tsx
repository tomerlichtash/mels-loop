import React, { useCallback, useContext, useEffect, useState } from 'react';
import DynamicContentContext from './DynamicContentContext';
import { PopoverContext } from '../popover/PopoverContext';
import PopoverBackButton from 'components/popover/toolbarItems/PopoverBackButton/PopoverBackButton';
import type { IParsedPage } from 'lib/types/models';

export interface IDynamicContentToolbarProps {
	pages: IParsedPage[];
}

const backButtonKey = 'popover-toolbar-back-button';

export default function DynamicContentToolbar({
	pages
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageId] = useState('');
	const popoverContext = useContext(PopoverContext);
	const dynamicContentContext = useContext(DynamicContentContext);

	const clearToolbarItems = useCallback(() => {
		popoverContext.removeToolbarItems(backButtonKey);
		setPrevPageId('');
	}, [popoverContext]);

	const createBackButton = useCallback(
		(prevPage: IParsedPage, idx: number) => {
			popoverContext.addToolbarItems({
				element: (
					<PopoverBackButton
						key={`back-button-key-${prevPage.metaData.glossary_key}`}
						title={`term:${prevPage.metaData.glossary_key}`}
						onClick={() => dynamicContentContext.setPageIndex(idx)}
					/>
				),
				id: backButtonKey,
				enabled: true
			});
		},
		[dynamicContentContext, popoverContext]
	);
	const stackEmpty = pages.length < 2;

	useEffect(() => {
		if (stackEmpty) {
			clearToolbarItems();
			return;
		}

		const idx = pages.length - 2;
		const prevPage = pages[idx]; // guaranteed

		if (prevPage.id === prevPageId) {
			return;
		}

		setPrevPageId(prevPage.id);

		createBackButton(prevPage, idx);
	}, [
		pages,
		prevPageId,
		dynamicContentContext,
		popoverContext,
		stackEmpty,
		createBackButton,
		clearToolbarItems
	]);

	return <></>;
}
