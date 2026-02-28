'use client';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { forwardRef, useState } from 'react';

import { InputAction } from '../_internal/InputAction/InputAction';
import { TextField } from '../TextField/TextField';
import { Tooltip } from '../Tooltip/Tooltip';

type TextFieldProps = React.ComponentProps<typeof TextField>;

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'iconEnd'> & {
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
			...props
		},
		ref,
	) {
		const [visible, setVisible] = useState(false);
		const [hovered, setHovered] = useState(false);

		return (
			<TextField
				ref={ref}
				type={visible ? 'text' : 'password'}
				iconEnd={
					tooltip ? (
						<Tooltip label={visible ? hideLabel : showLabel} open={hovered}>
							<InputAction
								aria-label={visible ? hideLabel : showLabel}
								onClick={() => setVisible((v) => !v)}
								onPointerEnter={() => setHovered(true)}
								onPointerLeave={() => setHovered(false)}
							>
								{visible ? <EyeClosedIcon /> : <EyeOpenIcon />}
							</InputAction>
						</Tooltip>
					) : (
						<InputAction
							aria-label={visible ? hideLabel : showLabel}
							onClick={() => setVisible((v) => !v)}
						>
							{visible ? <EyeClosedIcon /> : <EyeOpenIcon />}
						</InputAction>
					)
				}
				{...props}
			/>
		);
	},
);
