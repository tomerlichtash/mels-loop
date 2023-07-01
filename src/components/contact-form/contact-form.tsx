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
import { Button } from "../ui";
import { SUBMIT_API } from "../../config/public-api-params";

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

export const ContactForm = ({
	translate,
	className,
}: IFormInstance): JSX.Element => {
	const onSuccessMessageText = translate(compLocale.success);
	const onFailMessageText = translate(compLocale.fail);
	const backHomeButtonText = translate(compLocale.backHome);

	const onSuccessMessage = (
		<div className={st(classes.onSubmitMessage, { type: "success" })}>
			<span className={classes.icon}>
				<CheckIcon />
			</span>
			<span className={classes.message}>
				<span>{onSuccessMessageText}</span>
			</span>
			<div className={classes.options}>
				<Button
					className={classes.button}
					label={backHomeButtonText}
					link="/"
				/>
			</div>
		</div>
	);

	const onFailMessage = (
		<div className={st(classes.onSubmitMessage, { type: "fail" })}>
			<div className={classes.textWithIcon}>
				<div className={classes.icon}>
					<ExclamationTriangleIcon />
				</div>
				<div className={classes.message}>
					<span>{onFailMessageText}</span>
				</div>
			</div>
			<div className={classes.options}>
				<Button
					className={classes.button}
					label={backHomeButtonText}
					link="/"
				/>
			</div>
		</div>
	);

	return (
		<div className={st(classes.root, className)}>
			<Form
				entries={formFields}
				onSubmit={onValuesSubmit(SUBMIT_API.SEND_GRID)}
				onSuccessMessage={onSuccessMessage}
				onFailMessage={onFailMessage}
				submitButtonLabel={compLocale.buttonLabel}
				submitButtonLabelActive={compLocale.buttonLabelActive}
				className={st(classes.form, className)}
				useCaptcha={false}
			/>
		</div>
	);
};

export default ContactForm;
