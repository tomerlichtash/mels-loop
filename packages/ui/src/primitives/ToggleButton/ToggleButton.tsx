import * as RadixToggle from '@radix-ui/react-toggle';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './ToggleButton.module.css';

export interface ToggleButtonProps {
	pressed: boolean;
	onPressedChange?: (pressed: boolean) => void;
	children: ReactNode;
	className?: string;
	'aria-label'?: string;
}

export function ToggleButton({
	pressed,
	onPressedChange,
	children,
	className,
	'aria-label': ariaLabel,
}: ToggleButtonProps) {
	return (
		<RadixToggle.Root
			pressed={pressed}
			onPressedChange={onPressedChange}
			className={cn(styles.root, 'ml-toggle-button', className)}
			aria-label={ariaLabel}
		>
			{children}
		</RadixToggle.Root>
	);
}
