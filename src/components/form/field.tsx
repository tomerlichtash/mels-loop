import React from "react";
import { FieldChangeEvent, FormFieldState, IFieldProps } from "./types";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { st, classes } from "./field.st.css";

export const Field = ({
	tag,
	type,
	tabIndex,
	value,
	id,
	required,
	icon,
	validation,
	locale,
	onChange,
	validate,
	setValidation,
	className,
}: IFieldProps) => {
	const { INITIAL, VALID, INVALID, EDITED } = FormFieldState;

	const Tag = tag;
	const inputType = tag === "input" ? { type } : null;

	const validateField = (value: string) => {
		if (!value && validation == VALID) return setValidation(INITIAL);
		else if (!value && validation !== EDITED) return;
		else if (!value) return setValidation(INITIAL);
		const isValid = validate(value) ? VALID : INVALID;
		setValidation(isValid);
		return isValid === VALID;
	};

	const onInputChange = (e: FieldChangeEvent) => {
		if (validation === INITIAL) setValidation(FormFieldState.EDITED);
		onChange(e.target.value);
	};

	const onInputBlur = (e: FieldChangeEvent) =>
		validateField(e.target.value) && onChange(e.target.value.trim());

	const { label, placeholder, errorMsg } = locale;

	return (
		<div className={st(classes.root, className)}>
			<label htmlFor={id} className={classes.label}>
				<span className={st(classes.caption, { required })}>
					<span className={classes.icon}>{icon}</span>
					<span className={classes.text} aria-label={label}>
						{label}
						{validation === VALID && (
							<span className={classes.checkMark}>
								<CheckIcon className={classes.checkMark} />
							</span>
						)}
					</span>
				</span>
				<div className={classes.inputContainer}>
					<Tag
						id={id}
						name={id}
						value={value}
						tabIndex={tabIndex}
						placeholder={placeholder}
						className={st(classes.input, { tag, validation })}
						onChange={onInputChange}
						onBlur={onInputBlur}
						{...inputType}
					/>
					{validation === INVALID && (
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
