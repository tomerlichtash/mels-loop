import React, { Dispatch, SetStateAction } from "react";

export enum FormFieldState {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export type InputTag = "input" | "textarea";

export interface IFieldProps {
	id: string;
	type: "text" | "email" | "number";
	tag: InputTag;
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

export interface ICaptchaProps {
	onChange: (value: string) => void;
	onExpired: () => void;
	locale: string;
	theme: "light" | "dark";
	tabIndex: number;
}
