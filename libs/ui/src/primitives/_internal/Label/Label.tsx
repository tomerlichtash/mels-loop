import cn from 'classnames';
import type { LabelHTMLAttributes, ReactNode } from 'react';

import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
	required?: boolean;
}

export function Label({ children, required, className, ...props }: LabelProps) {
	return (
		<label
			className={cn(
				styles.root,
				{ [styles.required]: required },
				'ml-label',
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
}
