import cn from 'classnames';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './IndexMarker.module.css';

export interface IndexMarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	index: number;
	padLength?: number;
}

export const IndexMarker = forwardRef<HTMLButtonElement, IndexMarkerProps>(
	function IndexMarker({ index, padLength = 2, className, ...props }, ref) {
		const display = String(index).padStart(padLength, '0');

		return (
			<button
				ref={ref}
				type="button"
				className={cn(styles.root, 'ml-index-marker', className)}
				{...props}
			>
				<span className={styles.label}>{display}</span>
			</button>
		);
	},
);
