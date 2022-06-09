import React from "react";
import type { IFieldDef, IFieldLocale } from "../form/types";
import { VALUE_NOT_EMPTY, VALUE_VALID_EMAIL } from "../form";
import {
	ChatBubbleIcon,
	EnvelopeClosedIcon,
	PersonIcon,
} from "@radix-ui/react-icons";

export type FieldName = "fullname" | "email" | "message";

export const formFields: Record<FieldName, IFieldDef> = {
	fullname: {
		id: "fullname",
		type: "text",
		tag: "input",
		required: true,
		icon: <PersonIcon />,
		validate: VALUE_NOT_EMPTY,
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
		icon: <EnvelopeClosedIcon />,
		validate: VALUE_NOT_EMPTY && VALUE_VALID_EMAIL,
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
		icon: <ChatBubbleIcon />,
		validate: VALUE_NOT_EMPTY,
		locale: {
			label: "CONTACT_FORM_LABEL_MESSAGE",
			placeholder: "CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER",
			errorMsg: "CONTACT_FORM_INVALID_MESSAGE",
		},
	},
};

export const formLocale: Record<FieldName, IFieldLocale> = {
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
};

export const compLocale: Record<string, string> = {
	buttonLabel: "CONTACT_FORM_LABEL_SEND",
	buttonLabelActive: "CONTACT_FORM_LABEL_SEND_ACTIVE",
	success: "CONTACT_FORM_SUCCESS_MESSAGE",
	fail: "CONTACT_FORM_SUCCESS_FAIL",
	backHome: "CONTACT_FORM_ON_SUCCESS_MESSAGE_BACK_HOME",
	tryAgain: "CONTACT_FORM_ON_FAIL_MESSAGE_TRY_AGAIN",
	useAgain: "CONTACT_FORM_ON_SUCCESS_MESSAGE_SEND_ANOTHER",
	reportProblem: "CONTACT_FORM_ON_FAIL_MESSAGE_REPORT_PROBLEM",
};
