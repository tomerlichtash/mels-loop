import React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import type { SyntheticEvent } from 'react';

type InputProps = {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | number;
	type?: 'text' | 'number' | 'tel' | 'email';
	onChange?: (e: SyntheticEvent) => void;
	className?: string;
};

const Input = ({
	id,
	required,
	placeholder,
	type,
	value,
	className,
	onChange,
	...rest
}: InputProps) => (
	<input
		id={id}
		className={classNames(styles.root, className)}
		type={type}
		required={required}
		placeholder={placeholder}
		value={value}
		onChange={onChange}
		{...rest}
	/>
);

export default Input;
export type { InputProps };
