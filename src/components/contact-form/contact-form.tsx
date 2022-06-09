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
import { Form, FormFieldState, IBaseField, IFieldProps } from "../form";
import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../form/validations";
import { st, classes } from "./contact-form.st.css";

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
	 * Form Locale
	 */
	const lang = {
		fields: {
			fullname: {
				label: "CONTACT_FORM_LABEL_FULLNAME",
				placeholder: "CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER",
				errorMsg: "CONTACT_FORM_INVALID_NAME",
			},
			email: {
				label: "CONTACT_FORM_LABEL_EMAIL",
				placeholder: "CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER",
				errorMsg: "CONTACT_FORM_INVALID_EMAIL",
			},
			message: {
				label: "CONTACT_FORM_LABEL_MESSAGE",
				placeholder: "CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER",
				errorMsg: "CONTACT_FORM_INVALID_MESSAGE",
			},
		},
		ui: {
			buttonLabel: "CONTACT_FORM_LABEL_SEND",
			buttonLabelActive: "CONTACT_FORM_LABEL_SEND_ACTIVE",
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
	 * Field Icons
	 */
	const icons = {
		fullname: <PersonIcon />,
		email: <EnvelopeClosedIcon />,
		message: <ChatBubbleIcon />,
	};

	/**
	 * Fields Configuration
	 */
	const fields: IBaseField[] = [
		{
			id: "fullname",
			type: "text",
			tag: "input",
			value: fullname,
			onChange: setFullname,
			validation: fieldStateName,
			setValidation: setFieldStateName,
			validate: VALUE_NOT_EMPTY,
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
		},
	];

	const setFields = (fields: IBaseField[]) =>
		fields.map((field, index) =>
			Object.assign({}, field, {
				required: true,
				tabIndex: index + 1,
				icon: icons[field.id],
				...Object.fromEntries(
					Object.keys(lang.fields[field.id] as string).map((key) => [
						key,
						translate(lang.fields[field.id][key] as string),
					])
				),
			})
		) as IFieldProps[];

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
			<button>{translate(lang.ui.useAgain)}</button>
			<button>{translate(lang.ui.backHome)}</button>
		</div>
	);

	const onFailMessage = (
		<div className={classes.info}>
			<ExclamationTriangleIcon />
			<p>{translate(lang.ui.fail)}</p>
			<button>{translate(lang.ui.tryAgain)}</button>
			<div>{translate(lang.ui.reportProblem)}</div>
		</div>
	);

	return (
		<Form
			fields={setFields(fields)}
			onSubmit={onSubmit}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={translate(lang.ui.buttonLabel)}
			submitButtonLabelActive={translate(lang.ui.buttonLabelActive)}
			locale={locale}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
