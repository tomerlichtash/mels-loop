import React, { useContext, useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { Field } from "./field";
import LoadingIndicator from "../loading-indicator";
import { FormFieldState, IFieldProps } from "./types";
import { Captcha } from "./captcha";
import { st, classes } from "./form.st.css";

export interface IFormProps extends ComponentProps {
	fields: IFieldProps[];
	onSuccessMessage: React.ReactNode;
	onFailMessage: React.ReactNode;
	submitButtonLabel: string;
}

export const Form = ({
	fields,
	onSuccessMessage,
	onFailMessage,
	submitButtonLabel,
	className,
}: IFormProps): JSX.Element => {
	const { translate, locale } = useContext(ReactLocaleContext);
	const { theme } = useContext(ReactThemeContext);

	const [loadingIndicator, toggleLoadingIndicator] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	const [sendButtonState, setSendButtonState] = useState(false);
	const [buttonTooltipVisibility, setButtonTooltipVisibility] = useState(false);

	const toggleButtonTooltip = () => {
		if (!sendButtonState) setButtonTooltipVisibility(!buttonTooltipVisibility);
		else setButtonTooltipVisibility(false);
	};

	const handleValidation = () => {
		const validations = fields.map((field) => {
			if (!field.validate(field.value)) {
				field.setValidation(FormFieldState.INVALID);
				return FormFieldState.INVALID;
			}
		});
		return validations.indexOf(FormFieldState.INVALID) === -1;
	};

	const onFetchError = () => {
		setShowSuccessMessage(false);
		setShowFailureMessage(true);
		toggleLoadingIndicator(false);
	};

	const onFetchSuccess = () => {
		setShowSuccessMessage(true);
		setShowFailureMessage(false);
		toggleLoadingIndicator(false);
	};

	const onSubmit = () => {
		return fetch("/api/sendgrid", {
			body: JSON.stringify(
				Object.fromEntries(fields.map((field) => [field.id, field.value]))
			),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (handleValidation() && sendButtonState) {
			toggleLoadingIndicator(true);
			const res = await onSubmit();
			const { error } = await res.json();
			if (error) onFetchError();
			else onFetchSuccess();
		}
	};

	return (
		<div className={st(classes.root, className)}>
			{showSuccessMessage && onSuccessMessage}
			{showFailureMessage && onFailMessage}
			{!showSuccessMessage && !showFailureMessage && (
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				<form onSubmit={handleSubmit} className={classes.form}>
					{fields.map((fieldProps, index) =>
						Field(
							Object.assign({}, fieldProps, {
								className: classes.field,
								tabIndex: index + 1,
							})
						)
					)}
					<div className={classes.captcha}>
						<Captcha
							locale={locale}
							theme={theme === "dark" ? "dark" : "light"}
							onChange={() => setSendButtonState(true)}
						/>
					</div>
					<div className={classes.submit}>
						{loadingIndicator ? (
							<LoadingIndicator
								label="CONTACT_FORM_LABEL_SEND_ACTIVE"
								delay={0}
								className={classes.loadingIndicator}
							/>
						) : (
							<div className={classes.submitButton}>
								<button
									className={classes.button}
									type="submit"
									tabIndex={4}
									onMouseOver={toggleButtonTooltip}
									onMouseLeave={toggleButtonTooltip}
								>
									{submitButtonLabel}
								</button>
								{buttonTooltipVisibility && (
									<div className={classes.buttonTooltip}>
										{translate("CAPTCHA_SUBMIT_BUTTON_TOOLTIP_TEXT")}
									</div>
								)}
							</div>
						)}
					</div>
				</form>
			)}
		</div>
	);
};

export default Form;
