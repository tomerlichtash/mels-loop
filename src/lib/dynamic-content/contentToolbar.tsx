import React, { useContext, useEffect, useState } from 'react';
import { IParsedPageData } from 'types/models';
import { LocaleContext } from '../../context/locale/localeContext';
import { DynamicContentContext } from './contentContext';
import { PopoverContext } from 'lib/dynamic-content/popoverContext';
import Button from 'components/button/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { unique } from 'utils';

export interface IDynamicContentToolbarProps {
	pages: IParsedPageData[];
}

const backButtonKey = 'popover-toolbar-back-button';

export default function DynamicContentToolbar({
	pages,
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageId] = useState('');
	const { textDirection, translate } = useContext(LocaleContext);
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
			translate(prevPage.metaData.glossary_key) ||
			prevPage.id;

		popoverContext.addToolbarItems({
			element: (
				<Button
					key={unique.id(backButtonKey)}
					title={backButtonLabel}
					onClick={() => dynamicContentContext.setPageIndex(idx)}
					className="back-button"
				>
					{textDirection === 'ltr' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
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
		translate,
		textDirection,
	]);

	return <></>;
}
