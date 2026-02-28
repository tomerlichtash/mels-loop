import cn from 'classnames';
import { forwardRef, type InputHTMLAttributes } from 'react';

import styles from './TextInput.module.css';

type TextInputSize = 'sm' | 'md' | 'lg';
type TextInputRadius = 'none' | 'sm' | 'md' | 'lg';

interface TextInputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	size?: TextInputSize;
	radius?: TextInputRadius;
	error?: boolean;
	fullWidth?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(
		{
			size = 'md',
			radius = 'md',
			error,
			fullWidth,
			className,
			type = 'text',
			...props
		},
		ref,
	) {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					styles.root,
					styles[`size-${size}`],
					styles[`radius-${radius}`],
					{ [styles.error]: error, [styles.fullWidth]: fullWidth },
					'ml-text-input',
					className,
				)}
				{...props}
			/>
		);
	},
);
