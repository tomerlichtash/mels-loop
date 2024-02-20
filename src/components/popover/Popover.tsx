import React, { PropsWithChildren, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { getIcon } from 'components/icons';
import { Button, ToolbarItem } from '..';
import styles from './Popover.module.scss';
import PopoverTrigger from './PopoverTrigger';
import PopoverDialog from './PopoverDialog';

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

	const isOpen = open || visible;

	return (
		<PopoverPrimitive.Root
			onOpenChange={(opened) => setVisible(opened)}
			open={isOpen}
		>
			<PopoverPrimitive.Trigger
				data-testid={dataTestId}
				className={styles.trigger}
			>
				<PopoverTrigger opened={isOpen}>{trigger}</PopoverTrigger>
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
								<div className={styles.panel}>{toolbarItems}</div>
								<div className={styles.closeButton}>
									<ToolbarItem>
										<PopoverPrimitive.Close asChild>
											<Button
												onClick={() => setVisible(false)}
												className={styles.close}
											>
												{getIcon('close')}
											</Button>
										</PopoverPrimitive.Close>
									</ToolbarItem>
								</div>
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
