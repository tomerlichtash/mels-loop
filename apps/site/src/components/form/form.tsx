import React, { useContext, useEffect, useRef, useState } from "react";
import { FormFieldState, FormValues, IFormProps } from "./types";
import { useFormField as createField } from "./useFormField";
import { Captcha } from "./captcha";
import LoadingIndicator from "../loading-indicator";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./form.st.css";

export const Form = ({
	entries,
	onSuccessMessage,
	onFailMessage,
	submitButtonLabel,
	// submitButtonLabelActive,
	onSubmit,
	className,
}: IFormProps): JSX.Element => {
	const { theme } = useContext(ReactThemeContext);
	const { locale, translate } = useContext(ReactLocaleContext);

	const { VALID, INVALID } = FormFieldState;

	const [loadingIndicator, setLoadingIndicator] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [failureMessage, setFailureMessage] = useState(false);
	const [sendButtonState, setSendButtonState] = useState(false);
	const [highlightCaptcha, setHighlightCaptcha] = useState(false);

	const fields = Object.keys(entries).map(
		(key) => createField({ translate, ...entries[key] })[0]
	);

	const captchaRef = useRef(null);
	const captchaTabIndex = Object.keys(entries).length + 1;

	const onFetchError = () => {
		setSuccessMessage(false);
		setFailureMessage(true);
		setLoadingIndicator(false);
	};

	const onFetchSuccess = () => {
		setSuccessMessage(true);
		setFailureMessage(false);
		setLoadingIndicator(false);
	};

	const onCaptchaChange = () => {
		setSendButtonState(true);
		setHighlightCaptcha(false);
	};

	const onCaptchaExpired = () => {
		setSendButtonState(false);
		setHighlightCaptcha(false);
	};

	const validateField = (field: JSX.Element) => {
		const { props } = field;
		const { setValidation, validateRules, value } = props;
		const isValid = validateRules(value);
		if (isValid) {
			setValidation(VALID);
			return VALID;
		}
		setValidation(INVALID);
		return INVALID;
	};

	const validateAllFields = () =>
		fields.map((field) => validateField(field)).indexOf(INVALID) === -1;

	const onSubmitClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (validateAllFields()) async () => handleSubmit();
	};

	const handleSubmit = () => {
		if (validateAllFields()) {
			if (!sendButtonState) {
				setHighlightCaptcha(true);
				captchaRef.current.focus();
				return;
			}
			return async () => submitForm();
		}
	};

	async function submitForm() {
		setLoadingIndicator(true);
		const values = Object.fromEntries(
			fields.map((field) => [field.props.id, field.props.value])
		) as FormValues;
		const res = await onSubmit(values);
		const { error } = await res.json();
		if (error) onFetchError();
		else onFetchSuccess();
	}

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			const focusedFields = fields.map((field) => field.props.focus);

			if (focusedFields.indexOf(true) === -1) return;

			const field = fields[focusedFields.indexOf(true)];
			const enterWithoutMeta =
				e.key === "Enter" &&
				!e.metaKey &&
				!e.ctrlKey &&
				field.props.tag !== "textarea";

			const enterWithMeta =
				(e.key === "Enter" && e.metaKey) || (e.key === "Enter" && e.ctrlKey);

			if (enterWithoutMeta) {
				e.preventDefault();
				validateField(field);
			} else if (enterWithMeta) {
				e.preventDefault();
				handleSubmit();
			}
		};
		document.addEventListener("keydown", keyDownHandler);
		return () => document.removeEventListener("keydown", keyDownHandler);
	});

	return (
		<div className={st(classes.root, className)}>
			{successMessage && onSuccessMessage}
			{failureMessage && onFailMessage}
			{!successMessage && !failureMessage && (
				<form className={classes.form} noValidate>
					{fields}
				</form>
			)}
			<div className={classes.footer}>
				<div className={classes.captchaContainer}>
					<Captcha
						onChange={onCaptchaChange}
						onExpired={onCaptchaExpired}
						tabIndex={captchaTabIndex}
						locale={locale}
						theme={theme}
						highlight={highlightCaptcha}
						className={classes.captcha}
					/>
				</div>
				<div className={classes.buttonContainer}>
					<button
						className={classes.button}
						tabIndex={captchaTabIndex + 1}
						ref={captchaRef}
						onClick={(e) => onSubmitClick(e)}
					>
						{loadingIndicator ? (
							<LoadingIndicator
								// label={submitButtonLabelActive}
								delay={0}
								className={classes.loadingIndicator}
							/>
						) : (
							translate(submitButtonLabel)
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Form;
