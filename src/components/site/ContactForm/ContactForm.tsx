import React from "react";
import { Form, onValuesSubmit } from "../../form";
import type { IFormInstance, IFieldRef } from "../../form";
import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../../form/validations";
import { Button } from "@components/ui";
import SENDGRID_API from "../../../config/sendgrid";
import classNames from "classnames";
import styles from "./ContactForm.module.scss";

const compLocale: Record<string, string> = {
	buttonLabel: "CONTACT_FORM_LABEL_SEND",
	buttonLabelActive: "CONTACT_FORM_LABEL_SEND_ACTIVE",
	success: "CONTACT_FORM_SUCCESS_MESSAGE",
	fail: "CONTACT_FORM_SUCCESS_FAIL",
	backHome: "CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME",
	reportProblem: "CONTACT_FORM_ON_FAIL_MESSAGE_REPORT_PROBLEM",
};

const formFields: Record<string, IFieldRef> = {
	fullname: {
		id: "fullname",
		type: "text",
		tag: "input",
		required: true,
		autoFocus: true,
		tabIndex: 1,
		icon: "person",
		rules: [VALUE_NOT_EMPTY],
		locale: {
			label: "CONTACT_FORM_LABEL_FULLNAME",
			placeholder: "CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER",
			errorMsg: "CONTACT_FORM_INVALID_NAME",
		},
	},
	email: {
		id: "email",
		type: "email",
		tag: "input",
		required: true,
		tabIndex: 2,
		icon: "envelope",
		rules: [VALUE_NOT_EMPTY, VALUE_VALID_EMAIL],
		locale: {
			label: "CONTACT_FORM_LABEL_EMAIL",
			placeholder: "CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER",
			errorMsg: "CONTACT_FORM_INVALID_EMAIL",
		},
	},
	message: {
		id: "message",
		type: "text",
		tag: "textarea",
		required: true,
		tabIndex: 3,
		icon: "chat-square-text",
		rules: [VALUE_NOT_EMPTY],
		locale: {
			label: "CONTACT_FORM_LABEL_MESSAGE",
			placeholder: "CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER",
			errorMsg: "CONTACT_FORM_INVALID_MESSAGE",
		},
	},
};

const ContactForm = ({ translate, className }: IFormInstance): JSX.Element => {
	const onSuccessMessageText = translate(compLocale.success);
	const onFailMessageText = translate(compLocale.fail);
	const backHomeButtonText = translate(compLocale.backHome);

	const onSuccessMessage = (
		// <div className={st(classes.onSubmitMessage, { type: "success" })}>
		<div>
			{/* <span className="icon">
				<Icon name="check" />
			</span> */}
			<span className="message">
				<span>{onSuccessMessageText}</span>
			</span>
			<div className="options">
				<Button className="button" label={backHomeButtonText} link="/" />
			</div>
		</div>
	);

	const onFailMessage = (
		// <div className={st(classes.onSubmitMessage, { type: "fail" })}>
		<div>
			<div className="textWithIcon">
				{/* <div className="icon">
					<ExclamationTriangleIcon />
				</div> */}
				<div className="message">
					<span>{onFailMessageText}</span>
				</div>
			</div>
			<div className="options">
				<Button className="button" label={backHomeButtonText} link="/" />
			</div>
		</div>
	);

	return (
		<Form
			entries={formFields}
			onSubmit={onValuesSubmit(SENDGRID_API)}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={compLocale.buttonLabel}
			submitButtonLabelActive={compLocale.buttonLabelActive}
			className={classNames([styles.root, className])}
			useCaptcha={true}
		/>
	);
};

export default ContactForm;
