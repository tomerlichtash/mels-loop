import React from 'react';
import DynamicContentBrowser from '../components/contentBrowser';
import { AnnotationContentBlock } from './annotationLinkContentBlock';
import { TermLinkContentBlock } from './termLinkContentBlock';
import { PopoverProvider } from '@contexts/popoverContext';
import { useLocale } from 'hooks/useLocale';
import { useToolbar } from '../hooks/useToolbar';
import { IPopoverContext } from '../types';
import I18nProvider from 'next-translate/I18nProvider';
import { DynamicContentTypes } from 'types/content';
import glossaryEN from '../../../../locales/en/glossary.json';
import { Popover } from 'components/index';
import type {
	ContentComponentProps,
	IContentComponentInitData,
} from 'types/models';

type PopoverContentBlockProps = {
	type: DynamicContentTypes;
	'data-testid'?: string;
};

const getContentBlock = (
	type: DynamicContentTypes,
	data: IContentComponentInitData,
	className: string
): React.ReactNode => {
	switch (type) {
		case DynamicContentTypes.Annotation:
			return (
				<AnnotationContentBlock className={className} componentData={data} />
			);
		default:
			return (
				<TermLinkContentBlock className={className} componentData={data} />
			);
	}
};

export const PopoverContentBlock = ({
	componentData,
	type,
	className,
	'data-testid': dataTestId,
}: PopoverContentBlockProps & ContentComponentProps): JSX.Element => {
	const toolbar = useToolbar();
	const { lang, textDirection } = useLocale();
	const { node } = componentData;
	const context: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	return (
		<PopoverProvider value={context}>
			<Popover
				trigger={getContentBlock(type, componentData, className)}
				toolbarItems={toolbar.items.map((item) => item.element)}
				side={textDirection === 'ltr' ? 'right' : 'left'}
				locale={lang}
				data-testid={dataTestId}
			>
				<I18nProvider namespaces={{ glossaryEN }}>
					<DynamicContentBrowser node={node} />
				</I18nProvider>
			</Popover>
		</PopoverProvider>
	);
};
