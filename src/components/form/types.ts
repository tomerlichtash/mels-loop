import React, { Dispatch, SetStateAction } from "react";

export enum FormFieldState {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export interface IFieldProps {
	id: string;
	type: "text" | "email" | "number";
	tag: "input" | "textarea";
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
	label: string;
	validation?: FormFieldState;
	setValidation?: (state: FormFieldState) => void;
	validate?: (value: string) => boolean;
	required?: boolean;
	placeholder?: string;
	errorMsg?: string;
	icon?: React.ReactNode;
	tabIndex?: number;
	className?: string;
}

export const RegExpEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface ICaptchaProps {
	onChange: (value: string) => void;
	onExpired: () => void;
	locale: string;
	theme: "light" | "dark";
}
