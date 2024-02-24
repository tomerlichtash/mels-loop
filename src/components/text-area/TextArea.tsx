import React from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.scss';
import type { SyntheticEvent } from 'react';

type TextAreaProps = {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string;
	type?: 'text' | 'number' | 'tel' | 'file' | 'email';
	onChange?: (e: SyntheticEvent) => void;
	className?: string;
};

const TextArea = ({
	id,
	required,
	placeholder,
	value,
	// maxLength,
	// hasCounter,
	className,
	onChange,
	...props
}: TextAreaProps) => (
	<>
		<textarea
			id={id}
			className={classNames(styles.root, className)}
			required={required}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...props}
		/>
		{/* {hasCounter && `${value.length}/${maxLength}`} */}
	</>
);

export default TextArea;
export type { TextAreaProps };
