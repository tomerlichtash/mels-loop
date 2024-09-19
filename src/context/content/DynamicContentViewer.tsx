import React from 'react';
import DynamicContentLayout from './DynamicContentLayout';
import { useDynamicContentServer } from '../page/useDynamicContentServer';
import { SHOW_LOADING_INDICATOR_AFTER_MSEC } from '../consts';
import { urlToContentData } from 'lib/urlToContentData';
import { Text, Spinner } from '@melsloop/ml-components';
import { renderNodes } from '../../lib/content-component/helpers/renderNodes';
import { DynamicContentTypes } from '../types';
import type { RefOrSourceProps } from 'context/page/types';

type DynamicContentViewerProps = {
	url: string;
};

const DynamicContentViewer = ({ url }: DynamicContentViewerProps): JSX.Element => {
	const { error, isLoading, item } = useDynamicContentServer(url);

	if (error) {
		return <Text>{error}</Text>;
	}

	if (isLoading) {
		return <Spinner delay={SHOW_LOADING_INDICATOR_AFTER_MSEC} />;
	}

	const elements = item && item.parsed;

	if (!elements?.length) {
		return <></>;
	}

	const itemData = urlToContentData(url, DynamicContentTypes.Glossary);

	const { type } = itemData;
	const { metaData } = item;

	const { source_name: sourceName, source_url: sourceUrl, glossary_key: term } = metaData;

	const sources: RefOrSourceProps[] = sourceName && [
		{
			name: sourceName,
			url: sourceUrl
		}
	];

	return (
		<DynamicContentLayout
			type={type}
			term={term}
			sources={sources}
		>
			{renderNodes(elements)}
		</DynamicContentLayout>
	);
};

export default DynamicContentViewer;
