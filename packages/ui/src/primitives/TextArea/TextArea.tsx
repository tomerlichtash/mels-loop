import cn from 'classnames';
import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { Label } from '../_internal/Label/Label';
import styles from './TextArea.module.css';

type TextAreaSize = 'sm' | 'md' | 'lg';
type TextAreaRadius = 'none' | 'sm' | 'md' | 'lg';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	size?: TextAreaSize;
	radius?: TextAreaRadius;
	label?: string;
	error?: boolean;
	errorMessage?: string;
	fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function TextArea(
		{
			size = 'md',
			radius = 'md',
			label,
			error,
			errorMessage,
			fullWidth,
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
					styles[`radius-${radius}`],
					{
						[styles.error]: error,
						[styles.fullWidth]: fullWidth,
					},
					'ml-text-area',
					className,
				)}
				{...props}
			/>
		);

		if (!label) return textareaElement;

		return (
			<FormField error={errorMessage}>
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				{textareaElement}
			</FormField>
		);
	},
);
