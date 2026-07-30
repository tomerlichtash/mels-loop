import { XIcon } from '@phosphor-icons/react/ssr';
import cn from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import styles from './CloseButton.module.css';

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'sm' | 'md';
	/** Required — the button has no text. */
	'aria-label': string;
}

/**
 * The dismiss control for anything that can be dismissed — dialogs, drawers,
 * popovers. One component so every one of them looks and behaves the same;
 * before this the drawer and the search dialog had separately styled buttons
 * that happened to do the same job.
 */
export function CloseButton({
	size = 'md',
	className,
	...props
}: CloseButtonProps) {
	return (
		<button
			type="button"
			className={cn(styles.root, styles[size], 'ml-close-button', className)}
			{...props}
		>
			<XIcon size={size === 'sm' ? 14 : 18} />
		</button>
	);
}
