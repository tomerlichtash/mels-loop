import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { LocaleContext, PageContext } from 'context';
import { contentUtils } from 'lib/content-utils/contentUtils';
import { DynamicContentTypes } from 'lib/types';
import { DynamicContentContext } from './contentContext';
import {
	LOADING_INDICATOR_MIN_DISPLAY_TIME_MSEC,
	SHOW_LOADING_INDICATOR_AFTER_MSEC,
} from './consts';
import type { IParsedPageData } from 'types/models';

export type DynamicContentViewerProps = {
	url: string;
};

export const useDynamicContentServer = (url: string) => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();
	const { documentPath, dynamicContentServer } = useContext(PageContext);
	const { translate, locale } = useContext(LocaleContext);
	const dynamicContentContext = useContext(DynamicContentContext);

	useEffect(() => {
		// safeguard against a promise resolving after the component was torn down
		let removed = false;

		const queryTime = Date.now();

		const itemData = contentUtils.urlToContentData(
			url,
			DynamicContentTypes.Glossary
		);

		if (itemData.type === DynamicContentTypes.None) {
			setError(`Bad url ${url}`);
			return;
		}

		let docPath: string;
		const { id: itemId, type, isRelative } = itemData;

		if (isRelative) {
			docPath = documentPath || router.asPath;
		}

		dynamicContentServer
			.getItems({
				type,
				locale,
				ids: [itemId],
				document: docPath,
			})
			.then((items: IParsedPageData[]) => {
				if (removed) {
					return;
				}

				const page = items && items[0];

				if (page) {
					const elapsed = Date.now() - queryTime;

					const delay =
						elapsed <= SHOW_LOADING_INDICATOR_AFTER_MSEC
							? 0
							: Math.max(0, LOADING_INDICATOR_MIN_DISPLAY_TIME_MSEC - elapsed);

					window.setTimeout(() => {
						if (!removed) {
							setIsLoading(false);
							setItem(page);
							dynamicContentContext?.addPage(page);
						}
					}, delay);
				} else {
					setIsLoading(false);
					setError(translate('error.dynamicContentNotFound'));
				}
			})
			.catch((e) => {
				if (!removed) {
					setError(`${String(e)}`);
				}
			});

		return () => {
			removed = true;
		};
	}, [
		url,
		dynamicContentContext,
		locale,
		dynamicContentServer,
		documentPath,
		translate,
		router.asPath,
	]);

	return { error, isLoading, item };
};
