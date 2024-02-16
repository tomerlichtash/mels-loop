import React, { useContext, useEffect, useState } from 'react';
import { IParsedPageData } from 'types/models';
import { DynamicContentContext } from '../context/contentContext';
import { PopoverContext } from 'lib/dynamic-content-utils/context/popoverContext';
import Button from 'components/button/Button';
import { unique } from 'utils/index';
import { useLocale } from 'hooks/index';
import { getIcon } from 'components/icons';

export interface IDynamicContentToolbarProps {
	pages: IParsedPageData[];
}

const backButtonKey = 'popover-toolbar-back-button';

export default function DynamicContentToolbar({
	pages,
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageId] = useState('');
	const { t, textDirection } = useLocale();
	const popoverContext = useContext(PopoverContext);
	const dynamicContentContext = useContext(DynamicContentContext);

	useEffect(() => {
		if (pages.length < 2) {
			popoverContext.removeToolbarItems(backButtonKey);
			setPrevPageId('');
			return;
		}

		const idx = pages.length - 2;
		const prevPage = pages[idx]; // guaranteed

		if (prevPage.id === prevPageId) {
			return;
		}

		setPrevPageId(prevPage.id);

		const backButtonLabel =
			prevPage.metaData.title ||
			t(prevPage.metaData.glossary_key) ||
			prevPage.id;

		popoverContext.addToolbarItems({
			element: (
				<Button
					key={unique.id(backButtonKey)}
					title={backButtonLabel}
					onClick={() => dynamicContentContext.setPageIndex(idx)}
					className="back-button"
				>
					{getIcon(`arrow${textDirection === 'ltr' ? 'Left' : 'Right'}`)}
				</Button>
			),
			id: backButtonKey,
			enabled: true,
		});
	}, [
		pages,
		prevPageId,
		dynamicContentContext,
		popoverContext,
		textDirection,
		t,
	]);

	return <></>;
}
