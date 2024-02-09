import React, { useContext } from 'react';
import { contentUtils } from '../contentUtils';
import { ContentComponent } from './contentComponent';
import { DynamicContentLayout } from './contentLayout';
import { Text, LoadingIndicator } from 'components';
import { LocaleContext } from '../../context/locale/localeContext';
import { BibliographyItem, DynamicContentTypes } from '../types';
import { useDynamicContentServer } from './useDynamicContentServer';
import { SHOW_LOADING_INDICATOR_AFTER_MSEC } from './consts';
import { unique } from 'utils';

type DynamicContentViewerProps = {
	url: string;
};

export const DynamicContentViewer = ({
	url,
}: DynamicContentViewerProps): JSX.Element => {
	const { translate, locale, textDirection } = useContext(LocaleContext);
	const { error, isLoading, item } = useDynamicContentServer(url);

	if (error) {
		return <Text>{error}</Text>;
	}

	if (isLoading) {
		return (
			<LoadingIndicator
				label={translate('dynamicContent.viewer.loadingIndicator.label')}
				delay={SHOW_LOADING_INDICATOR_AFTER_MSEC}
			/>
		);
	}

	const elements = item && item.parsed;

	if (!elements?.length) {
		return <></>;
	}

	const itemData = contentUtils.urlToContentData(
		url,
		DynamicContentTypes.Glossary
	);

	const { type: itemType } = itemData;
	const { metaData } = item;
	const { source_name, source_url, glossary_key } = metaData;
	const caption = translate(
		`dynamicContent.viewer.${itemType.toLowerCase()}.caption`
	);
	const origTerm = locale === 'en' ? null : translate(glossary_key, 'en');
	const sources: BibliographyItem[] = source_name && [
		{
			name: source_name,
			url: source_url,
		},
	];
	const sourcesLabel = translate(
		`dynamicContent.viewer.sources.${
			sources.length > 1 ? 'multiple' : 'single'
		}.label`
	);

	return (
		<DynamicContentLayout
			type={itemType}
			textDirection={textDirection}
			caption={caption}
			title={translate(glossary_key)}
			term={origTerm}
			sourcesLabel={sourcesLabel}
			sources={sources}
		>
			{elements.map((node) => (
				<ContentComponent key={unique.id()} componentData={{ node }} />
			))}
		</DynamicContentLayout>
	);
};

export default DynamicContentViewer;
