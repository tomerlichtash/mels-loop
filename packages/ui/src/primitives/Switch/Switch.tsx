'use client';

import * as RadixSwitch from '@radix-ui/react-switch';
import cn from 'classnames';
import { useId } from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { Label } from '../_internal/Label/Label';
import styles from './Switch.module.css';

type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	size?: SwitchSize;
	label?: string;
	error?: boolean;
	errorMessage?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	id?: string;
	className?: string;
	'aria-label'?: string;
}

export function Switch({
	checked,
	defaultChecked,
	onCheckedChange,
	size = 'md',
	label,
	error,
	errorMessage,
	disabled,
	required,
	name,
	value,
	id: idProp,
	className,
	'aria-label': ariaLabel,
}: SwitchProps) {
	const autoId = useId();
	const id = idProp ?? autoId;

	return (
		<FormField error={errorMessage}>
			<div
				className={cn(
					styles.root,
					styles[`size-${size}`],
					{ [styles.error]: error, [styles.disabled]: disabled },
					'ml-switch',
					className,
				)}
			>
				<RadixSwitch.Root
					id={id}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					disabled={disabled}
					required={required}
					name={name}
					value={value}
					className={styles.track}
					aria-label={!label ? ariaLabel : undefined}
				>
					<RadixSwitch.Thumb className={styles.thumb} />
				</RadixSwitch.Root>
				{label && (
					<Label htmlFor={id} required={required} className={styles.label}>
						{label}
					</Label>
				)}
			</div>
		</FormField>
	);
}
