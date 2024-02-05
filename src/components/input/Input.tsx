import React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import type { InputProps } from './types';

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
