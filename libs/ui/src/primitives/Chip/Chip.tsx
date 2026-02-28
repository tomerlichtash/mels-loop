import { Cross2Icon } from '@radix-ui/react-icons';
import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Chip.module.css';

type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	size?: ChipSize;
	disabled?: boolean;
	onDismiss?: () => void;
	dismissLabel?: string;
}

export function Chip({
	children,
	size = 'md',
	disabled,
	onDismiss,
	dismissLabel = 'Remove',
	className,
	...props
}: ChipProps) {
	return (
		<span
			className={cn(
				styles.root,
				styles[`size-${size}`],
				{ [styles.disabled]: disabled },
				'ml-chip',
				className,
			)}
			{...props}
		>
			<span className={styles.label}>{children}</span>
			{onDismiss && !disabled && (
				<button
					type="button"
					className={styles.dismiss}
					aria-label={dismissLabel}
					onClick={onDismiss}
					tabIndex={-1}
				>
					<Cross2Icon />
				</button>
			)}
		</span>
	);
}
