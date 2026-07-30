'use client';

import { XIcon } from '@phosphor-icons/react/ssr';
import * as RadixDialog from '@radix-ui/react-dialog';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Dialog.module.css';

export interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	closeLabel?: string;
	children: ReactNode;
	className?: string;
}

export function Dialog({
	open,
	onOpenChange,
	title,
	closeLabel = 'Close',
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
					<RadixDialog.Close className={styles.close} aria-label={closeLabel}>
						<XIcon />
					</RadixDialog.Close>
					{children}
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
}
