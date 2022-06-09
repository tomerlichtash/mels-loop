import React, { Dispatch, SetStateAction } from "react";

export enum FormFieldState {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export interface IBaseField {
	id: string;
	type: "text" | "email" | "number";
	tag: "input" | "textarea";
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
	validation?: FormFieldState;
	setValidation?: (state: FormFieldState) => void;
	validate?: (value: string) => boolean;
	tabIndex?: number;
	required?: boolean;
	icon?: React.ReactNode;
	className?: string;
}

export interface IFieldProps extends IBaseField {
	label: string;
	placeholder?: string;
	errorMsg?: string;
}

export interface ICaptchaProps {
	onChange: (value: string) => void;
	onExpired: () => void;
	locale: string;
	theme: "light" | "dark";
	tabIndex: number;
}
