import React from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.scss';
import type { TextAreaProps } from './types';

const TextArea = ({
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
