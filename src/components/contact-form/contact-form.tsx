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
			label: translate("CONTACT_FORM_LABEL_FULLNAME"),
			placeholder: translate("CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_NAME"),
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
			label: translate("CONTACT_FORM_LABEL_EMAIL"),
			placeholder: translate("CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_EMAIL"),
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
			label: translate("CONTACT_FORM_LABEL_MESSAGE"),
			placeholder: translate("CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_MESSAGE"),
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
			<p>{translate("CONTACT_FORM_SUCCESS_MESSAGE")}</p>
			<button>
				{translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER")}
			</button>
			<button>{translate("CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME")}</button>
		</div>
	);

	const onFailMessage = (
		<div className={classes.info}>
			<ExclamationTriangleIcon />
			<p>{translate("CONTACT_FORM_SUCCESS_FAIL")}</p>
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
			submitButtonLabel={translate("CONTACT_FORM_LABEL_SEND")}
			locale={locale}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
