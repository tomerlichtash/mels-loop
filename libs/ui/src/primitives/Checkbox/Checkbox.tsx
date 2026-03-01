'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons';
import cn from 'classnames';
import { useId } from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { Label } from '../_internal/Label/Label';
import styles from './Checkbox.module.css';

type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
	checked?: boolean | 'indeterminate';
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean | 'indeterminate') => void;
	size?: CheckboxSize;
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

export function Checkbox({
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
}: CheckboxProps) {
	const autoId = useId();
	const id = idProp ?? autoId;

	return (
		<FormField error={errorMessage}>
			<div
				className={cn(
					styles.root,
					styles[`size-${size}`],
					{ [styles.error]: error, [styles.disabled]: disabled },
					'ml-checkbox',
					className,
				)}
			>
				<RadixCheckbox.Root
					id={id}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					disabled={disabled}
					required={required}
					name={name}
					value={value}
					className={styles.control}
					aria-label={!label ? ariaLabel : undefined}
				>
					<RadixCheckbox.Indicator className={styles.indicator} forceMount>
						<CheckIcon className={styles.checkIcon} />
						<MinusIcon className={styles.indeterminateIcon} />
					</RadixCheckbox.Indicator>
				</RadixCheckbox.Root>
				{label && (
					<Label htmlFor={id} required={required} className={styles.label}>
						{label}
					</Label>
				)}
			</div>
		</FormField>
	);
}
