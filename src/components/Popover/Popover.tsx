import React, { useEffect } from 'react';
import I18nProvider from 'next-translate/I18nProvider';
import glossaryEN from '../../../locales/en/glossary.json';
import DynamicContentProvider from 'context/content/DynamicContentProvider';
import PopoverProvider from 'context/popover/PopoverProvider';
import { useToolbar } from 'context/content/hooks/useToolbar';
import { useLocale } from 'hooks/useLocale';
import { Popover } from '@melsloop/ml-components';
import classNames from 'classnames';
import styles from './Popover.module.css';
import type { IParsedNode } from 'lib/types/models';
import type { IPopoverContext } from 'context/popover/types';
import { useEffectOnce } from 'hooks/useEffectOnce';
import PopoverCloseButton from './PopoverCloseButton/PopoverCloseButton';

type PopoverComponentProps = {
	node: IParsedNode;
	trigger: React.ReactNode;
	className?: string;
	'data-testid'?: string;
};

export const PopoverComponent = ({
	trigger,
	node,
	className,
	'data-testid': dataTestId
}: PopoverComponentProps): JSX.Element => {
	const { lang, textDirection } = useLocale();

	const toolbar = useToolbar();
	const toolbarItems = toolbar.items.map((item) => item.element);

	const ctx: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById
	};

	useEffectOnce(() => {
		toolbar.addItems([
			{
				element: <PopoverCloseButton key={`popover-close-${node.key}`} />,
				id: 'popover-close',
				enabled: true,
				position: 'last'
			}
		]);
	});

	// We need to wrap the popover with locale provider and supply glossaryEn
	// so we can always access the original term in english
	return (
		<I18nProvider namespaces={{ glossaryEN }}>
			<PopoverProvider value={ctx}>
				<Popover
					trigger={trigger}
					side={textDirection === 'ltr' ? 'right' : 'left'}
					toolbarItems={toolbarItems}
					locale={lang}
					data-testid={dataTestId}
					className={classNames(styles.root, className)}
				>
					<DynamicContentProvider node={node} />
				</Popover>
			</PopoverProvider>
		</I18nProvider>
	);
};
