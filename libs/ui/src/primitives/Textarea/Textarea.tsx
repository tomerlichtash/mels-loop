import cn from 'classnames';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

import styles from './Textarea.module.css';

type TextareaSize = 'sm' | 'md' | 'lg';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	size?: TextareaSize;
	error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea({ size = 'md', error, className, ...props }, ref) {
		return (
			<textarea
				ref={ref}
				className={cn(
					styles.root,
					styles[`size-${size}`],
					{ [styles.error]: error },
					'ml-textarea',
					className,
				)}
				{...props}
			/>
		);
	},
);
