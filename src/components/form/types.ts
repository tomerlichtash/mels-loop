import React, { Dispatch, SetStateAction } from "react";

export enum FormFieldState {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export interface IFieldLocale {
	label: string;
	placeholder?: string;
	errorMsg?: string;
}

export interface IFieldDef {
	id: string;
	type: "text" | "email" | "number";
	tag: "input" | "textarea";
	icon?: React.ReactNode;
	required?: boolean;
	validate?: (value: string) => boolean;
	tabIndex?: number;
	className?: string;
	locale: IFieldLocale;
}

export interface IFieldHooks {
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
	validation?: FormFieldState;
	setValidation?: (state: FormFieldState) => void;
}

export type IFieldProps = IFieldDef & IFieldHooks;

export interface ICaptchaProps {
	onChange: (value: string) => void;
	onExpired: () => void;
	locale: string;
	theme: "light" | "dark";
	tabIndex: number;
}
