import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.scss';

type TextAreaProps = {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | number;
	type?: 'text' | 'number' | 'tel' | 'file' | 'email';
	onChange?: (e: SyntheticEvent) => void;
	className?: string;
};

export const TextArea = ({
	id,
	required,
	placeholder,
	value,
	className,
	onChange,
	...props
}: TextAreaProps) => (
	<textarea
		id={id}
		className={classNames(styles.root, className)}
		required={required}
		placeholder={placeholder}
		value={value}
		onChange={onChange}
		{...props}
	/>
);

export default TextArea;
