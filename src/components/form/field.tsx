import React from "react";
import { FormFieldState, IFieldProps } from "./types";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { st, classes } from "./field.st.css";

export const Field = ({
	tag,
	type,
	tabIndex,
	value,
	id,
	label,
	placeholder,
	errorMsg,
	required,
	icon,
	validation,
	onChange,
	validate,
	setValidation,
	className,
}: IFieldProps) => {
	return (
		<div className={st(classes.root, className)}>
			<label htmlFor={id} className={classes.label}>
				<span className={st(classes.caption, { required })}>
					<span className={classes.icon}>{icon}</span>
					<span className={classes.text} aria-label={label}>
						{label}
						{validation === FormFieldState.VALID && (
							<CheckIcon className={classes.checkMark} />
						)}
					</span>
				</span>
				<div className={classes.inputContainer}>
					{tag === "input" && (
						<input
							tabIndex={tabIndex}
							type={type}
							value={value}
							id={id}
							onChange={(e) => onChange(e.target.value)}
							onBlur={(e) =>
								validate(e.target.value) && setValidation(FormFieldState.VALID)
							}
							name={id}
							placeholder={placeholder}
							className={st(classes.input, { type, validation })}
						/>
					)}
					{tag === "textarea" && (
						<textarea
							tabIndex={tabIndex}
							value={value}
							id={id}
							onChange={(e) => onChange(e.target.value)}
							onBlur={(e) =>
								validate(e.target.value) && setValidation(FormFieldState.VALID)
							}
							name={id}
							placeholder={placeholder}
							className={st(classes.input, { type: "textarea", validation })}
						/>
					)}
					{validation && validation === FormFieldState.INVALID && (
						<p className={classes.error}>
							<span className={classes.errorIcon}>
								<ExclamationTriangleIcon className={classes.errorIcon} />
							</span>
							<span className={classes.errorText}>{errorMsg}</span>
						</p>
					)}
				</div>
			</label>
		</div>
	);
};
