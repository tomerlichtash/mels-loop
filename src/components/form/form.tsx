import React, { useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { FormFieldState } from "./types";
import { Captcha } from "./captcha";
import LoadingIndicator from "../loading-indicator";
import { st, classes } from "./form.st.css";

export interface IFormProps extends ComponentProps {
	fields: JSX.Element[];
	onSuccessMessage: React.ReactNode;
	onFailMessage: React.ReactNode;
	submitButtonLabel: string;
	submitButtonLabelActive: string;
	locale?: string;
	theme?: string;
	onSubmit: () => Promise<Response>;
}

export const Form = ({
	fields,
	onSuccessMessage,
	onFailMessage,
	submitButtonLabel,
	// submitButtonLabelActive,
	locale,
	theme,
	onSubmit,
	className,
}: IFormProps): JSX.Element => {
	const [loadingIndicator, setLoadingIndicator] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [failureMessage, setFailureMessage] = useState(false);
	const [sendButtonState, setSendButtonState] = useState(false);
	const [highlightCaptcha, setHighlightCaptcha] = useState(false);

	const captchaTabIndex = fields.length + 1;

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

	const handleValidation = () => {
		return (
			fields
				.map((field) => {
					if (!field.props.validate(field.props.value)) {
						field.props.setValidation(FormFieldState.INVALID);
						return FormFieldState.INVALID;
					}
				})
				.indexOf(FormFieldState.INVALID) === -1
		);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (handleValidation()) {
			if (!sendButtonState) {
				setHighlightCaptcha(true);
				return;
			}
			setLoadingIndicator(true);
			const res = await onSubmit();
			const { error } = await res.json();
			if (error) onFetchError();
			else onFetchSuccess();
		}
	};

	return (
		<div className={st(classes.root, className)}>
			{successMessage && onSuccessMessage}
			{failureMessage && onFailMessage}
			{!successMessage && !failureMessage && (
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				<form onSubmit={handleSubmit} className={classes.form}>
					{fields}
					<div className={classes.submit}>
						<div className={st(classes.captcha, { highlightCaptcha })}>
							<Captcha
								onChange={onCaptchaChange}
								onExpired={onCaptchaExpired}
								tabIndex={captchaTabIndex}
								locale={locale}
								theme={theme}
							/>
						</div>
						<div className={classes.submitButton}>
							<button
								className={classes.button}
								type="submit"
								tabIndex={captchaTabIndex + 1}
							>
								{loadingIndicator ? (
									<LoadingIndicator
										// label="CONTACT_FORM_LABEL_SEND_ACTIVE"
										delay={0}
										className={classes.loadingIndicator}
									/>
								) : (
									submitButtonLabel
								)}
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default Form;
