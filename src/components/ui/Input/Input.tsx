import React, { SyntheticEvent } from "react";
import { ComponentProps } from "../../../interfaces/models";
import styles from "./Input.module.scss";
import classNames from "classnames";

export interface InputProps extends ComponentProps {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | number;
	type?: "text" | "number" | "tel" | "file" | "email";
	onChange?: (e: SyntheticEvent) => void;
}

function Input({
	id,
	required,
	placeholder,
	type,
	value,
	className,
	onChange,
	...props
}: InputProps) {
	return (
		<input
			id={id}
			className={classNames(styles.root, className)}
			type={type}
			required={required}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
}

export default Input;
