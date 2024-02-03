import React, { useState } from 'react';
import DynamicContentBrowser from '../contentBrowser';
import { AnnotationContentBlock } from './annotationLinkContentBlock';
import { TermLinkContentBlock } from './termLinkContentBlock';
import { PopoverProvider } from 'lib/content/popoverContext';
import { useToolbar } from '../useToolbar';
import * as Popover from '@radix-ui/react-popover';
import * as Toolbar from '@radix-ui/react-toolbar';

import {
	PopoverDialog,
	PopoverTrigger,
	PopoverToolbar,
	PopoverCloseButton,
} from '@components/index';
import { Cross2Icon } from '@radix-ui/react-icons';

import { IPopoverContext } from '../types';
import { LocaleId, TextDirection } from 'locale/locale-context';
import {
	ContentComponentProps,
	IContentComponentInitData,
} from '../../../types/models';
import { DynamicContentTypes } from 'lib/types/dynamic-content';

type PopoverContentBlockProps = {
	type: DynamicContentTypes;
	textDirection: TextDirection;
	locale: LocaleId;
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
				<Popover.Trigger onClick={() => setVisible(true)}>
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
							<DynamicContentBrowser node={node} />
						</PopoverDialog>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</PopoverProvider>
	);
};
