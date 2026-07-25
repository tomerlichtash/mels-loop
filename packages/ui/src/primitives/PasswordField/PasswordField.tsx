'use client';

import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react/ssr';
import cn from 'classnames';
import { forwardRef, useState } from 'react';

import { InputAction } from '../_internal/InputAction/InputAction';
import { TextField } from '../TextField/TextField';
import { Tooltip } from '../Tooltip/Tooltip';
import styles from './PasswordField.module.css';

type TextFieldProps = React.ComponentProps<typeof TextField>;

export type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'iconEnd'> & {
	showLabel?: string;
	hideLabel?: string;
	tooltip?: boolean;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
	function PasswordField(
		{
			showLabel = 'Show password',
			hideLabel = 'Hide password',
			tooltip = false,
			className,
			...props
		},
		ref,
	) {
		const [visible, setVisible] = useState(false);
		const [hovered, setHovered] = useState(false);

		const toggleButton = tooltip ? (
			<Tooltip label={visible ? hideLabel : showLabel} open={hovered}>
				<InputAction
					aria-label={visible ? hideLabel : showLabel}
					onClick={() => setVisible((v) => !v)}
					onPointerEnter={() => setHovered(true)}
					onPointerLeave={() => setHovered(false)}
					className={styles.toggle}
				>
					{visible ? <EyeSlashIcon /> : <EyeIcon />}
				</InputAction>
			</Tooltip>
		) : (
			<InputAction
				aria-label={visible ? hideLabel : showLabel}
				onClick={() => setVisible((v) => !v)}
				className={styles.toggle}
			>
				{visible ? <EyeSlashIcon /> : <EyeIcon />}
			</InputAction>
		);

		return (
			<TextField
				ref={ref}
				type={visible ? 'text' : 'password'}
				autoComplete="current-password"
				iconEnd={toggleButton}
				className={cn('ml-password-field', className)}
				{...props}
			/>
		);
	},
);
