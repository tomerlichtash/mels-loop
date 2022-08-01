import React, { useEffect, useRef } from "react";
import {
	FieldChangeEvent,
	FieldKeyboardEvent,
	FormFieldState,
	IFormField,
} from "./types";
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
	autoFocus,
	validateRules,
	onChange,
	setValidation,
	setFocus,
	translate,
	className,
}: IFormField) => {
	const { INITIAL, VALID, INVALID, EDITED } = FormFieldState;

	const Tag = tag;
	const inputType = tag === "input" ? { type } : null;
	const ref = useRef(null);

	const validateField = (value: string) => {
		if (!value && validation == VALID) return setValidation(INITIAL);
		else if (!value && validation !== EDITED) return;
		else if (!value) return setValidation(INITIAL);
		const isValid = validateRules(value);
		setValidation(isValid ? VALID : INVALID);
		return isValid;
	};

	const onInputChange = (e: FieldChangeEvent) => {
		if (validation === INITIAL) setValidation(EDITED);
		onChange(e.target.value);
	};

	const onInputFocus = () => setFocus(true);

	const onInputBlur = (e: FieldChangeEvent) => {
		validateField(e.target.value);
		onChange(e.target.value.trim());
		setFocus(false);
	};

	const { label, placeholder, errorMsg } = locale;

	const preventWhiteSpace = (e: FieldKeyboardEvent) => {
		if (e.currentTarget.value.trim() === "" && e.keyCode === 32) {
			e.preventDefault();
		}
	};

	useEffect(() => {
		if (autoFocus) ref.current.focus();
	}, [autoFocus]);

	return (
		<div className={st(classes.root, className)}>
			<label htmlFor={id} className={classes.label}>
				<span className={st(classes.caption, { required })}>
					<span className={classes.icon}>{icon}</span>
					<span className={classes.text} aria-label={translate(label)}>
						{translate(label)}
						{validation === VALID && (
							<span className={classes.checkMark}>
								<CheckIcon className={classes.checkMark} />
							</span>
						)}
					</span>
				</span>
			</label>
			<div className={classes.inputContainer}>
				<Tag
					id={id}
					name={id}
					value={value}
					tabIndex={tabIndex}
					autoFocus={autoFocus}
					ref={ref}
					placeholder={translate(placeholder)}
					className={st(classes.input, { tag, validation })}
					onChange={onInputChange}
					onFocus={onInputFocus}
					onBlur={onInputBlur}
					onKeyDown={preventWhiteSpace}
					spellCheck={false}
					{...inputType}
				/>
				{validation === INVALID && (
					<p className={classes.error}>
						<span className={classes.errorIcon}>
							<ExclamationTriangleIcon className={classes.icon} />
						</span>
						<span className={classes.errorText}>{translate(errorMsg)}</span>
					</p>
				)}
			</div>
		</div>
	);
};
