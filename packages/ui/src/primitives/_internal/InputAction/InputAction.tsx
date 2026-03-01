import cn from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './InputAction.module.css';

interface InputActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export function InputAction({
	children,
	className,
	...props
}: InputActionProps) {
	return (
		<button
			type="button"
			className={cn(styles.root, 'ml-input-action', className)}
			onMouseDown={(e) => e.preventDefault()}
			{...props}
		>
			{children}
		</button>
	);
}
