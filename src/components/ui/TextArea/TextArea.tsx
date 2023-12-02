import React, { SyntheticEvent } from "react";
import { ComponentProps } from "../../../interfaces/models";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

export interface TextAreaProps extends ComponentProps {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | number;
	type?: "text" | "number" | "tel" | "file" | "email";
	onChange?: (e: SyntheticEvent) => void;
}

function TextArea({
	id,
	required,
	placeholder,
	value,
	className,
	onChange,
	...props
}: TextAreaProps) {
	return (
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
}

export default TextArea;
