'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Dialog.module.css';

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: ReactNode;
	className?: string;
}

export function Dialog({
	open,
	onOpenChange,
	title,
	children,
	className,
}: DialogProps) {
	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			<RadixDialog.Portal>
				<RadixDialog.Overlay className={styles.overlay} />
				<RadixDialog.Content
					className={cn(styles.content, className)}
					aria-describedby={undefined}
				>
					<RadixDialog.Title className={styles.visuallyHidden}>
						{title}
					</RadixDialog.Title>
					<RadixDialog.Close className={styles.close} aria-label="Close">
						&times;
					</RadixDialog.Close>
					{children}
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
}
