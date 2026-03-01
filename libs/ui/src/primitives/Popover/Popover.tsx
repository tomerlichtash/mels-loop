'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import cn from 'classnames';
import type { ReactNode, Ref } from 'react';

import styles from './Popover.module.css';

type Side = 'top' | 'bottom' | 'left' | 'right';

interface PopoverProps {
	open: boolean;
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
	onOpenChange,
	trigger,
	triggerRef,
	children,
	side = 'bottom',
	align = 'center',
	sideOffset = 4,
	className,
}: PopoverProps) {
	return (
		<RadixPopover.Root open={open} onOpenChange={onOpenChange}>
			<RadixPopover.Trigger asChild ref={triggerRef}>
				{trigger}
			</RadixPopover.Trigger>
			<RadixPopover.Portal>
				<RadixPopover.Content
					className={cn(styles.content, className)}
					side={side}
					align={align}
					sideOffset={sideOffset}
				>
					<RadixPopover.Arrow className={styles.arrow} />
					<div className={styles.scrollArea}>{children}</div>
				</RadixPopover.Content>
			</RadixPopover.Portal>
		</RadixPopover.Root>
	);
}
