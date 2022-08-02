import React from "react";
import { Form, onValuesSubmit } from "../form";
import type { IFormInstance, IFieldRef } from "../form";
import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../form/validations";
import {
	CheckIcon,
	ExclamationTriangleIcon,
	ChatBubbleIcon,
	EnvelopeClosedIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./contact-form.st.css";

const compLocale: Record<string, string> = {
	buttonLabel: "CONTACT_FORM_LABEL_SEND",
	buttonLabelActive: "CONTACT_FORM_LABEL_SEND_ACTIVE",
	success: "CONTACT_FORM_SUCCESS_MESSAGE",
	fail: "CONTACT_FORM_SUCCESS_FAIL",
	backHome: "CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME",
	tryAgain: "CONTACT_FORM_ON_FAIL_MESSAGE_TRY_AGAIN",
	useAgain: "CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER",
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
		icon: <PersonIcon />,
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
		icon: <EnvelopeClosedIcon />,
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
		icon: <ChatBubbleIcon />,
		rules: [VALUE_NOT_EMPTY],
		locale: {
			label: "CONTACT_FORM_LABEL_MESSAGE",
			placeholder: "CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER",
			errorMsg: "CONTACT_FORM_INVALID_MESSAGE",
		},
	},
};

export const ContactForm = ({ className }: IFormInstance): JSX.Element => {
	const onSuccessMessage = (
		<div>
			<CheckIcon />
			<p>{compLocale.success}</p>
			{/* <button>{compLocale.useAgain}</button>
			<button>{compLocale.backHome}</button> */}
		</div>
	);

	const onFailMessage = (
		<div>
			<ExclamationTriangleIcon />
			<p>{compLocale.fail}</p>
			{/* <button>{compLocale.tryAgain}</button>
			<button>{compLocale.reportProblem}</button>
			<button>{compLocale.backHome}</button> */}
		</div>
	);

	return (
		<div className={classes.root}>
			<Form
				entries={formFields}
				onSubmit={onValuesSubmit}
				onSuccessMessage={onSuccessMessage}
				onFailMessage={onFailMessage}
				submitButtonLabel={compLocale.buttonLabel}
				submitButtonLabelActive={compLocale.buttonLabelActive}
				className={st(classes.form, className)}
			/>
		</div>
	);
};

export default ContactForm;
