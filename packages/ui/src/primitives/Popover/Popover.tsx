'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import cn from 'classnames';
import type { ReactNode, Ref } from 'react';

import styles from './Popover.module.css';

type Side = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	trigger: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	triggerRef?: Ref<any>;
	children: ReactNode;
	side?: Side;
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	className?: string;
}

export function Popover({
	open,
	defaultOpen,
	onOpenChange,
	trigger,
	triggerRef,
	children,
	side = 'bottom',
	align = 'center',
	sideOffset = 8,
	className,
}: PopoverProps) {
	return (
		<RadixPopover.Root
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
		>
			<RadixPopover.Trigger asChild ref={triggerRef}>
				{trigger}
			</RadixPopover.Trigger>
			<RadixPopover.Portal>
				<RadixPopover.Content
					className={cn(styles.content, 'ml-popover-content', className)}
					data-popover-content
					side={side}
					align={align}
					sideOffset={sideOffset}
				>
					<div className={styles.scrollArea}>{children}</div>
				</RadixPopover.Content>
			</RadixPopover.Portal>
		</RadixPopover.Root>
	);
}
