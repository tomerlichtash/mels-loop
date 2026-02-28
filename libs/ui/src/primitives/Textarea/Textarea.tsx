import cn from 'classnames';
import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { Label } from '../_internal/Label/Label';
import styles from './TextArea.module.css';

type TextAreaSize = 'sm' | 'md' | 'lg';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	size?: TextAreaSize;
	label?: string;
	error?: boolean;
	errorMessage?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function TextArea(
		{
			size = 'md',
			label,
			error,
			errorMessage,
			className,
			id: idProp,
			required,
			...props
		},
		ref,
	) {
		const autoId = useId();
		const id = idProp ?? autoId;

		const textareaElement = (
			<textarea
				ref={ref}
				id={id}
				required={required}
				className={cn(
					styles.root,
					styles[`size-${size}`],
					{ [styles.error]: error },
					'ml-text-area',
					!label && className,
				)}
				{...props}
			/>
		);

		if (!label) return textareaElement;

		return (
			<FormField error={errorMessage} className={className}>
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				{textareaElement}
			</FormField>
		);
	},
);
