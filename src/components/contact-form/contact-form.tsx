import React from "react";
import { Form, IFormInstance, onValuesSubmit, IFieldDef } from "../form";
import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../form/validations";
import {
	CheckIcon,
	ExclamationTriangleIcon,
	ChatBubbleIcon,
	EnvelopeClosedIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./contact-form.st.css";

export const ContactForm = ({
	translate,
	className,
}: IFormInstance): JSX.Element => {
	const formFields: Record<string, IFieldDef> = {
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
				label: translate("CONTACT_FORM_LABEL_FULLNAME"),
				placeholder: translate("CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER"),
				errorMsg: translate("CONTACT_FORM_INVALID_NAME"),
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
				label: translate("CONTACT_FORM_LABEL_EMAIL"),
				placeholder: translate("CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER"),
				errorMsg: translate("CONTACT_FORM_INVALID_EMAIL"),
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
				label: translate("CONTACT_FORM_LABEL_MESSAGE"),
				placeholder: translate("CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER"),
				errorMsg: translate("CONTACT_FORM_INVALID_MESSAGE"),
			},
		},
	};

	const compLocale: Record<string, string> = {
		buttonLabel: translate("CONTACT_FORM_LABEL_SEND"),
		buttonLabelActive: translate("CONTACT_FORM_LABEL_SEND_ACTIVE"),
		success: translate("CONTACT_FORM_SUCCESS_MESSAGE"),
		fail: translate("CONTACT_FORM_SUCCESS_FAIL"),
		backHome: translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME"),
		tryAgain: translate("CONTACT_FORM_ON_FAIL_MESSAGE_TRY_AGAIN"),
		useAgain: translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER"),
		reportProblem: translate("CONTACT_FORM_ON_FAIL_MESSAGE_REPORT_PROBLEM"),
	};

	const onSuccessMessage = (
		<div className={classes.info}>
			<CheckIcon />
			<p>{translate(compLocale.success)}</p>
			<button>{translate(compLocale.useAgain)}</button>
			<button>{translate(compLocale.backHome)}</button>
		</div>
	);

	const onFailMessage = (
		<div className={classes.info}>
			<ExclamationTriangleIcon />
			<p>{translate(compLocale.fail)}</p>
			<button>{translate(compLocale.tryAgain)}</button>
			<button>{translate(compLocale.reportProblem)}</button>
			<button>{translate(compLocale.backHome)}</button>
		</div>
	);

	return (
		<Form
			entries={formFields}
			onSubmit={onValuesSubmit}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={compLocale.buttonLabel}
			submitButtonLabelActive={compLocale.buttonLabelActive}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
