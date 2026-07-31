import { XIcon } from '@phosphor-icons/react/ssr';
import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Chip.module.css';

type ChipSize = 'sm' | 'md' | 'lg';
type ChipRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
type ChipVariant = 'contained' | 'outlined';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	variant?: ChipVariant;
	size?: ChipSize;
	radius?: ChipRadius;
	disabled?: boolean;
	onDismiss?: () => void;
	dismissLabel?: string;
}

export function Chip({
	children,
	variant = 'contained',
	size = 'md',
	radius = 'pill',
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
				styles[`variant-${variant}`],
				styles[`size-${size}`],
				styles[`radius-${radius}`],
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
					<XIcon />
				</button>
			)}
		</span>
	);
}
