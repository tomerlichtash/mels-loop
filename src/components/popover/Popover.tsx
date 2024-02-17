import React, { PropsWithChildren, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { getIcon } from 'components/icons';
import { Button } from '..';
import styles from './Popover.module.scss';
import PopoverTrigger from './PopoverTrigger';
import PopoverDialog from './PopoverDialog';
import classNames from 'classnames';

type CustomPopoverProps = {
	trigger: React.ReactNode;
	side: 'top' | 'right' | 'bottom' | 'left';
	locale: string;
	toolbarItems?: React.ReactNode[];
	open?: boolean;
	'data-testid': string;
};

const Popover = ({
	open,
	trigger,
	side,
	locale,
	toolbarItems,
	children,
	'data-testid': dataTestId,
}: PropsWithChildren<CustomPopoverProps>) => {
	const [visible, setVisible] = useState(false);

	return (
		<PopoverPrimitive.Root
			onOpenChange={(opened) => setVisible(opened)}
			open={open || visible}
		>
			<PopoverPrimitive.Trigger
				data-testid={dataTestId}
				className={styles.trigger}
			>
				<PopoverTrigger
					data-popover-state={open || visible ? 'open' : 'closed'}
				>
					{trigger}
				</PopoverTrigger>
			</PopoverPrimitive.Trigger>

			<PopoverPrimitive.Portal>
				<PopoverPrimitive.Content
					side={side}
					data-locale={locale}
					className={styles.dialog}
				>
					<PopoverDialog>
						{toolbarItems && (
							<div role="toolbar" className={styles.toolbar}>
								{toolbarItems}
								<PopoverPrimitive.Close
									className={classNames(styles.toolbarButton, styles.close)}
								>
									<Button onClick={() => setVisible(false)} asChild>
										{getIcon('close')}
									</Button>
								</PopoverPrimitive.Close>
							</div>
						)}
						{children}
					</PopoverDialog>
					<PopoverPrimitive.Arrow />
				</PopoverPrimitive.Content>
			</PopoverPrimitive.Portal>
		</PopoverPrimitive.Root>
	);
};

export default Popover;
