import cn from 'classnames';
import {
	forwardRef,
	type InputHTMLAttributes,
	type ReactNode,
	useId,
} from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { Label } from '../_internal/Label/Label';
import styles from './TextField.module.css';

type TextFieldSize = 'sm' | 'md' | 'lg';
type TextFieldRadius = 'none' | 'sm' | 'md' | 'lg';

interface TextFieldProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	size?: TextFieldSize;
	radius?: TextFieldRadius;
	label?: string;
	error?: boolean;
	errorMessage?: string;
	fullWidth?: boolean;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField(
		{
			size = 'md',
			radius = 'md',
			label,
			error,
			errorMessage,
			fullWidth,
			iconStart,
			iconEnd,
			className,
			type = 'text',
			id: idProp,
			required,
			...props
		},
		ref,
	) {
		const autoId = useId();
		const id = idProp ?? autoId;
		const hasIcon = !!(iconStart || iconEnd);

		const inputClasses = cn(
			styles.input,
			styles[`size-${size}`],
			styles[`radius-${radius}`],
			{
				[styles.error]: error,
				[styles.fullWidth]: fullWidth,
				[styles.hasIconStart]: !!iconStart,
				[styles.hasIconEnd]: !!iconEnd,
			},
			'ml-text-field',
		);

		const inputElement = hasIcon ? (
			<div
				className={cn(
					styles.root,
					styles[`size-${size}`],
					{
						[styles.fullWidth]: fullWidth,
					},
					className,
				)}
			>
				{iconStart && <span className={styles.iconSlot}>{iconStart}</span>}
				<input
					ref={ref}
					id={id}
					type={type}
					required={required}
					className={inputClasses}
					{...props}
				/>
				{iconEnd && (
					<span className={cn(styles.iconSlot, styles.iconSlotEnd)}>
						{iconEnd}
					</span>
				)}
			</div>
		) : (
			<input
				ref={ref}
				id={id}
				type={type}
				required={required}
				className={cn(inputClasses, className)}
				{...props}
			/>
		);

		if (!label) return inputElement;

		return (
			<FormField error={errorMessage}>
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				{inputElement}
			</FormField>
		);
	},
);
