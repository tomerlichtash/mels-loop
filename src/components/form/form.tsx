import React, { useContext, useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactThemeContext } from "../../contexts/theme-context";
import { Field } from "./field";
import { FormFieldState, IFieldProps } from "./types";
import { Captcha } from "./captcha";
import LoadingIndicator from "../loading-indicator";
import { st, classes } from "./form.st.css";

export interface IFormProps extends ComponentProps {
	fields: IFieldProps[];
	onSuccessMessage: React.ReactNode;
	onFailMessage: React.ReactNode;
	submitButtonLabel: string;
	locale: string;
	onSubmit: () => Promise<Response>;
}

export const Form = ({
	fields,
	onSuccessMessage,
	onFailMessage,
	submitButtonLabel,
	onSubmit,
	locale,
	className,
}: IFormProps): JSX.Element => {
	const { theme } = useContext(ReactThemeContext);

	const [loadingIndicator, toggleLoadingIndicator] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	const [sendButtonState, setSendButtonState] = useState(false);
	// const [buttonTooltipVisibility, setButtonTooltipVisibility] = useState(false);
	const [highlightCaptcha, setHighlightCaptcha] = useState(false);

	// const toggleButtonTooltip = () => {
	// 	if (!sendButtonState) setButtonTooltipVisibility(!buttonTooltipVisibility);
	// 	else setButtonTooltipVisibility(false);
	// };

	const handleValidation = () =>
		fields
			.map((field) => {
				if (!field.validate(field.value)) {
					field.setValidation(FormFieldState.INVALID);
					return FormFieldState.INVALID;
				}
			})
			.indexOf(FormFieldState.INVALID) === -1;

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (handleValidation()) {
			if (!sendButtonState) {
				setHighlightCaptcha(true);
				return;
			}
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
					{fields.map((fieldProps, index) => (
						<Field
							key={`ml-form-${fieldProps.id}`}
							{...Object.assign({}, fieldProps, {
								className: classes.field,
								tabIndex: index + 1,
							})}
						/>
					))}
					<div className={classes.submit}>
						<div
							className={st(classes.captcha, { highlight: highlightCaptcha })}
						>
							<Captcha
								locale={locale}
								theme={theme === "dark" ? "dark" : "light"}
								onChange={() => {
									setSendButtonState(true);
									setHighlightCaptcha(false);
								}}
								onExpired={() => {
									setSendButtonState(false);
									setHighlightCaptcha(false);
								}}
							/>
						</div>
						<div className={classes.submitButton}>
							<button
								className={classes.button}
								type="submit"
								tabIndex={4}
								// onMouseOver={toggleButtonTooltip}
								// onMouseLeave={toggleButtonTooltip}
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
							{/* {buttonTooltipVisibility && (
								<div className={classes.buttonTooltip}>
									{translate("CAPTCHA_SUBMIT_BUTTON_TOOLTIP_TEXT")}
								</div>
							)} */}
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default Form;
