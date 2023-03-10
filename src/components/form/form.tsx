import React, { useContext, useEffect, useRef, useState } from "react";
import { FormFieldState, FormValues, IFormProps } from "./types";
import { useFormField as createField } from "./useFormField";
import { Captcha } from "./captcha";
import LoadingIndicator from "../loading-indicator";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";

export const Form = ({
	entries,
	onSuccessMessage,
	onFailMessage,
	submitButtonLabel,
	// submitButtonLabelActive,
	onSubmit,
	className,
	useCaptcha,
}: IFormProps): JSX.Element => {
	const { theme } = useContext(ReactThemeContext);
	const { locale, translate } = useContext(ReactLocaleContext);

	const { VALID, INVALID } = FormFieldState;

	const [loadingIndicator, setLoadingIndicator] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [failureMessage, setFailureMessage] = useState(false);
	const [sendButtonState, setSendButtonState] = useState(false);
	const [highlightCaptcha, setHighlightCaptcha] = useState(false);
	const [captchaError, setCaptchaError] = useState("");

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
		handleSubmit().catch(() => void 0);
	};

	const handleSubmit = async () => {
		if (validateAllFields()) {
			if (!sendButtonState) {
				setHighlightCaptcha(true);
				captchaRef.current.focus();
				return;
			}
			await submitForm();
		}
	};

	async function submitForm() {
		setLoadingIndicator(true);
		const values = Object.fromEntries(
			fields.map((field) => [field.props.id, field.props.value])
		) as FormValues;
		const { error } = await onSubmit(values);
		if (error) {
			onFetchError();
		} else {
			onFetchSuccess();
		}
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
				handleSubmit().catch(() => void 0);
			}
		};
		document.addEventListener("keydown", keyDownHandler);
		return () => document.removeEventListener("keydown", keyDownHandler);
	});

	if (captchaError) {
		return <div className="error">{captchaError}</div>;
	}

	return (
		<div>
			{successMessage && onSuccessMessage}
			{failureMessage && onFailMessage}

			{!successMessage && !failureMessage && (
				<form className="form" noValidate>
					{fields}
				</form>
			)}
			<div className="footer">
				{useCaptcha &&
					!loadingIndicator &&
					!failureMessage &&
					!successMessage && (
						<div className="captcha-container">
							<Captcha
								onChange={onCaptchaChange}
								setCaptchaError={setCaptchaError}
								onExpired={onCaptchaExpired}
								tabIndex={captchaTabIndex}
								locale={locale}
								theme={theme}
								highlight={highlightCaptcha}
								className="captcha"
							/>
						</div>
					)}
				{!failureMessage && !successMessage && (
					<div className="button-container">
						<button
							className="button"
							tabIndex={captchaTabIndex + 1}
							ref={captchaRef}
							onClick={onSubmitClick}
						>
							{loadingIndicator ? (
								<LoadingIndicator delay={0} className="loading-indicator" />
							) : (
								translate(submitButtonLabel)
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Form;
