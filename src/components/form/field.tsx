import React from "react";
import { FormFieldState, IFieldProps, InputTag } from "./types";
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
	const { VALID, INVALID } = FormFieldState;

	const Tag: InputTag = tag; // as keyof JSX.IntrinsicElements;
	const inputType = tag === "input" ? { type } : null;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onChange(e.target.value);

	const onInputBlur = (e: React.ChangeEvent<HTMLInputElement>) =>
		setValidation(validate(e.target.value) ? VALID : INVALID);

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
						className={st(classes.input, { type: tag, validation })}
						onChange={onInputChange}
						onBlur={onInputBlur}
						{...inputType}
					/>
					{/* {tag === "input" && (
						<input
							tabIndex={tabIndex}
							type={type}
							value={value}
							id={id}
							onChange={(e) => onChange(e.target.value)}
							onBlur={(e) =>
								setValidation(validate(e.target.value) ? VALID : INVALID)
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
								setValidation(validate(e.target.value) ? VALID : INVALID)
							}
							name={id}
							placeholder={placeholder}
							className={st(classes.input, { type: "textarea", validation })}
						/>
					)} */}
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
