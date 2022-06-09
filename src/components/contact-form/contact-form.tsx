import React, { useContext, useState } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import {
	ChatBubbleIcon,
	CheckIcon,
	EnvelopeClosedIcon,
	ExclamationTriangleIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import { Form, FormFieldState, IFieldProps } from "../form";
import { st, classes } from "./contact-form.st.css";

import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../form/validations";

export const ContactForm = ({ className }: ComponentProps): JSX.Element => {
	const { translate, locale } = useContext(ReactLocaleContext);

	/**
	 * Form Fields
	 */
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	/**
	 * Fields Validation States
	 */
	const [fieldStateName, setFieldStateName] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);
	const [fieldStateEmail, setFieldStateEmail] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);
	const [fieldStateMessage, setFieldStateMessage] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);

	const lang = {
		fields: {
			fullName: {
				label: "CONTACT_FORM_LABEL_FULLNAME",
				placeholder: "CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER",
				error: "CONTACT_FORM_INVALID_NAME",
			},
			email: {
				label: "CONTACT_FORM_LABEL_EMAIL",
				placeholder: "CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER",
				error: "CONTACT_FORM_INVALID_EMAIL",
			},
			message: {
				label: "CONTACT_FORM_LABEL_MESSAGE",
				placeholder: "CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER",
				error: "CONTACT_FORM_INVALID_MESSAGE",
			},
		},
		ui: {
			buttonLabel: "CONTACT_FORM_LABEL_SEND",
			success: "CONTACT_FORM_SUCCESS_MESSAGE",
			fail: "CONTACT_FORM_SUCCESS_FAIL",
			/* -- */
			backHome: "CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME",
			tryAgain: "CONTACT_FORM_ON_FAIL_MESSAGE_TRY_AGAIN",
			useAgain: "CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER",
			reportProblem: "CONTACT_FORM_ON_FAIL_MESSAGE_REPORT_PROBLEM",
		},
	};

	/**
	 * Fields Configuration
	 */
	const fields: IFieldProps[] = [
		{
			id: "fullname",
			type: "text",
			tag: "input",
			value: fullname,
			onChange: setFullname,
			validation: fieldStateName,
			setValidation: setFieldStateName,
			validate: VALUE_NOT_EMPTY,
			required: true,
			tabIndex: 1,
			label: translate(lang.fields.fullName.label),
			placeholder: translate(lang.fields.fullName.placeholder),
			errorMsg: translate(lang.fields.fullName.error),
			icon: <PersonIcon />,
		},
		{
			id: "email",
			type: "email",
			tag: "input",
			value: email,
			onChange: setEmail,
			validation: fieldStateEmail,
			setValidation: setFieldStateEmail,
			validate: VALUE_NOT_EMPTY && VALUE_VALID_EMAIL,
			required: true,
			tabIndex: 2,
			label: translate(lang.fields.email.label),
			placeholder: translate(lang.fields.email.placeholder),
			errorMsg: translate(lang.fields.email.error),
			icon: <EnvelopeClosedIcon />,
		},
		{
			id: "message",
			type: "text",
			tag: "textarea",
			value: message,
			onChange: setMessage,
			validation: fieldStateMessage,
			setValidation: setFieldStateMessage,
			validate: VALUE_NOT_EMPTY,
			required: true,
			tabIndex: 3,
			label: translate(lang.fields.message.label),
			placeholder: translate(lang.fields.message.placeholder),
			errorMsg: translate(lang.fields.message.error),
			icon: <ChatBubbleIcon />,
		},
	];

	const onSubmit = () => {
		return fetch("/api/sendgrid", {
			body: JSON.stringify(
				Object.fromEntries(fields.map((field) => [field.id, field.value]))
			),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
	};

	const onSuccessMessage = (
		<div className={classes.info}>
			<CheckIcon />
			<p>{translate(lang.ui.success)}</p>
			<button>
				{translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER")}
			</button>
			<button>{translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME")}</button>
		</div>
	);

	const onFailMessage = (
		<div className={classes.info}>
			<ExclamationTriangleIcon />
			<p>{translate(lang.ui.fail)}</p>
			<button>{translate("CONTACT_FORM_ON_FAIL_MESSAGE_TRY_AGAIN")}</button>
			<div>{translate("CONTACT_FORM_ON_FAIL_MESSAGE_REPORT_PROBLEM")}</div>
		</div>
	);

	return (
		<Form
			fields={fields}
			onSubmit={onSubmit}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={translate(lang.ui.buttonLabel)}
			locale={locale}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
