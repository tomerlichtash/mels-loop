import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { PageContext } from '../context/pageContext';
import { DynamicContentTypes } from 'lib/types';
import { DynamicContentContext } from '../context/contentContext';
import {
	LOADING_INDICATOR_MIN_DISPLAY_TIME_MSEC,
	SHOW_LOADING_INDICATOR_AFTER_MSEC,
} from '../consts';
import type { IParsedPageData } from 'types/models';
import { useLocale } from 'hooks/index';
import { contentUtils } from 'lib/contentUtils';

export type DynamicContentViewerProps = {
	url: string;
};

export const useDynamicContentServer = (url: string) => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const { documentPath, dynamicContentServer } = useContext(PageContext);
	const dynamicContentContext = useContext(DynamicContentContext);

	const { t, lang } = useLocale();

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
				locale: lang,
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
					setError(t('errors:dynamicContentNotFound'));
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
		lang,
		dynamicContentServer,
		documentPath,
		router.asPath,
		t,
	]);

	return { error, isLoading, item };
};
