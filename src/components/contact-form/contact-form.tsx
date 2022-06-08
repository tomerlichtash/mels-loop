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
import { Form, FormFieldState, IFieldProps, RegExpEmail } from "../form";
import { st, classes } from "./contact-form.st.css";

export const ContactForm = ({ className }: ComponentProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);

	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [fieldStateName, setFieldStateName] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);
	const [fieldStateEmail, setFieldStateEmail] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);
	const [fieldStateMessage, setFieldStateMessage] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);

	const fields: IFieldProps[] = [
		{
			tag: "input",
			id: "fullname",
			type: "text",
			required: true,
			label: translate("CONTACT_FORM_LABEL_FULLNAME"),
			placeholder: translate("CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_NAME"),
			icon: <PersonIcon />,
			value: fullname,
			validation: fieldStateName,
			setValidation: (state: FormFieldState) => setFieldStateName(state),
			validate: (value: string) => value.length > 0,
			onChange: setFullname,
		},
		{
			tag: "input",
			id: "email",
			type: "email",
			required: true,
			label: translate("CONTACT_FORM_LABEL_EMAIL"),
			placeholder: translate("CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_EMAIL"),
			icon: <EnvelopeClosedIcon />,
			value: email,
			validation: fieldStateEmail,
			setValidation: setFieldStateEmail,
			validate: (value) => !!(value.length > 0 && email.match(RegExpEmail)),
			onChange: setEmail,
		},
		{
			tag: "textarea",
			id: "message",
			type: "text",
			value: message,
			validation: fieldStateMessage,
			setValidation: setFieldStateMessage,
			validate: (value) => value.length > 0,
			required: true,
			label: translate("CONTACT_FORM_LABEL_MESSAGE"),
			placeholder: translate("CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER"),
			errorMsg: translate("CONTACT_FORM_INVALID_MESSAGE"),
			icon: <ChatBubbleIcon />,
			onChange: setMessage,
		},
	];

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
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={translate("CONTACT_FORM_LABEL_SEND")}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
