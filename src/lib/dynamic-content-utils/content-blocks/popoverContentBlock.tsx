import React, { useState } from 'react';
import DynamicContentBrowser from '../components/contentBrowser';
import { AnnotationContentBlock } from './annotationLinkContentBlock';
import { TermLinkContentBlock } from './termLinkContentBlock';
import { PopoverProvider } from 'lib/dynamic-content-utils/context/popoverContext';
import { useToolbar } from '../hooks/useToolbar';
import * as Popover from '@radix-ui/react-popover';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
	PopoverDialog,
	PopoverTrigger,
	PopoverToolbar,
	PopoverCloseButton,
} from 'components/index';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IPopoverContext } from '../types';
import type { LocaleId, TextDirection } from 'types/locale';
import { ContentComponentProps, IContentComponentInitData } from 'types/models';
import { DynamicContentTypes } from 'lib/types/types';
import I18nProvider from 'next-translate/I18nProvider';
import glossaryEN from '../../../../locales/en/glossary.json';

type PopoverContentBlockProps = {
	type: DynamicContentTypes;
	textDirection: TextDirection;
	locale: LocaleId;
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
	textDirection,
	locale,
	className,
	'data-testid': dataTestId,
}: PopoverContentBlockProps & ContentComponentProps): JSX.Element => {
	const toolbar = useToolbar();
	const { node } = componentData;

	const context: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	const trigger = getContentBlock(type, componentData, className);
	const side = textDirection === 'ltr' ? 'right' : 'left';

	const [visible, setVisible] = useState(false);

	return (
		<PopoverProvider value={context}>
			<Popover.Root
				onOpenChange={(opened) => {
					setVisible(opened);
				}}
				open={visible}
			>
				<Popover.Trigger
					onClick={() => setVisible(true)}
					data-testid={dataTestId}
				>
					<PopoverTrigger>{trigger}</PopoverTrigger>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content side={side} data-locale={locale}>
						<PopoverDialog>
							<PopoverToolbar>
								<Toolbar.Root>
									{toolbar.items.map((item) => item.element)}
									<Popover.Close>
										<Toolbar.Button asChild>
											<PopoverCloseButton onClick={() => setVisible(false)}>
												<Cross2Icon />
											</PopoverCloseButton>
										</Toolbar.Button>
									</Popover.Close>
								</Toolbar.Root>
							</PopoverToolbar>
							<I18nProvider namespaces={{ glossaryEN }}>
								<DynamicContentBrowser node={node} />
							</I18nProvider>
						</PopoverDialog>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</PopoverProvider>
	);
};
