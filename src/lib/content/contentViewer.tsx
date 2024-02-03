import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mlUtils } from '../../lib/ml-utils';
import { contentUtils } from '../../lib/content-utils';
import { DynamicContentContext } from './contentContext';
import { ReactPageContext } from '../../context/pageContext';
import { ContentComponent } from './contentComponent';
import { LoadingIndicator } from '@components/index';
import DynamicContentLayout from '@components/dynamic-content-layout';

import { LocaleProvider } from '../../locale/context/locale-context';
import { DynamicContentTypes } from '../types/dynamic-content';
import { IParsedPageData } from '../../types/models';

/**
 * Show loading animation after this many msecs have elapsed without data
 */
const LOADING_DELAY_MSEC = 50; // 40ms
/**
 * Min # of msecs to display loading animation
 */
const MIN_LOADING_TIME = 750;

export interface DynamicContentViewerProps {
	url: string;
	className?: string;
}

export const DynamicContentViewer = ({
	url,
}: DynamicContentViewerProps): JSX.Element => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const pageContext = useContext(ReactPageContext);
	const { translate, locale, textDirection } = useContext(LocaleProvider);
	const dynamicContentContext = useContext(DynamicContentContext);
	const elements = item && item.parsed;
	const router = useRouter();

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
		if (itemData.isRelative) {
			docPath = pageContext.documentPath || router.asPath;
		}
		pageContext.dynamicContentServer
			.getItems({
				type: itemData.type,
				locale,
				ids: [itemData.id],
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
						elapsed <= LOADING_DELAY_MSEC
							? 0
							: Math.max(0, MIN_LOADING_TIME - elapsed);
					window.setTimeout(() => {
						if (!removed) {
							setIsLoading(false);
							setItem(page);
							dynamicContentContext?.addPage(page);
						}
					}, delay);
				} else {
					setIsLoading(false);
					setError('not found');
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
	}, [url, dynamicContentContext, pageContext, locale, router.asPath]);

	if (error) {
		return <div className="error">{error}</div>;
	}

	if (isLoading) {
		return (
			<LoadingIndicator
				label={translate('PRELOADER_LABEL')}
				delay={LOADING_DELAY_MSEC}
			/>
		);
	}

	if (!elements || !elements.length) {
		return <></>;
	}

	const itemData = contentUtils.urlToContentData(
		url,
		DynamicContentTypes.Glossary
	);
	const { metaData } = item;
	const { source_name, source_url, glossary_key } = metaData;

	const sources = source_name && [
		{
			name: source_name,
			url: source_url,
		},
	];
	const label = translate(`NOTE_LABEL_${itemData.type.toUpperCase()}`);
	const sourcesLabel = translate(
		`COMPONENT_BIBLIOGRAPHY_LABEL_${sources.length > 1 ? 'MULTIPLE' : 'SINGLE'}`
	);

	return (
		<DynamicContentLayout
			textDirection={textDirection}
			type={itemData.type === DynamicContentTypes.Glossary ? 'ref' : 'note'}
			label={label}
			sourcesLabel={sourcesLabel}
			title={translate(glossary_key)}
			term={locale === 'en' ? '' : translate(glossary_key, 'en')}
			sources={sources}
		>
			{elements.map((node) => (
				<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
			))}
		</DynamicContentLayout>
	);
};

export default DynamicContentViewer;
