import React, { useContext, useEffect, useState } from 'react';
import { IParsedPageData } from '../../types/models';
import { mlUtils } from '../../lib/ml-utils';
import { LocaleProvider } from '../../locale/context/locale-context';
import { DynamicContentContext } from './contentContext';
import { PopoverContext } from 'lib/content/popoverContext';
import { Button } from '@components/index';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export interface IDynamicContentToolbarProps {
	pages: IParsedPageData[];
}

const NAV_BUTTON_KEY = 'popover-toolbar-back-button';

export default function DynamicContentToolbar({
	pages,
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageid] = useState('');
	const { textDirection, translate } = useContext(LocaleProvider);
	const popoverContext = useContext(PopoverContext);
	const dynamicContentContext = useContext(DynamicContentContext);

	useEffect(() => {
		if (pages.length < 2) {
			popoverContext.removeToolbarItems(NAV_BUTTON_KEY);
			setPrevPageid('');
			return;
		}

		const idx = pages.length - 2;
		const prevPage = pages[idx]; // guaranteed

		if (prevPage.id === prevPageId) {
			return;
		}

		setPrevPageid(prevPage.id);

		const backButtonLabel =
			prevPage.metaData.title ||
			translate(prevPage.metaData.glossary_key) ||
			prevPage.id;

		popoverContext.addToolbarItems({
			element: (
				<Button
					key={mlUtils.uniqueId(NAV_BUTTON_KEY)}
					title={backButtonLabel}
					onClick={() => dynamicContentContext.setPageIndex(idx)}
					className="back-button"
				>
					{textDirection === 'ltr' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				</Button>
			),
			id: NAV_BUTTON_KEY,
			enabled: true,
		});
	}, [
		pages,
		prevPageId,
		dynamicContentContext,
		popoverContext,
		translate,
		textDirection,
	]);

	return <></>;
}
