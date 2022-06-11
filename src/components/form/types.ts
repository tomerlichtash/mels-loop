import React, { Dispatch, SetStateAction } from "react";
import { ComponentProps } from "../../interfaces/models";

export enum FormFieldState {
	INITIAL = "initial",
	EDITED = "edited",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export type FieldType = "text" | "email" | "number";

export type ValidationRule = (value: string) => boolean;
export interface IFieldLocale {
	label: string;
	placeholder?: string;
	errorMsg?: string;
}

export interface IFieldDef {
	id: string;
	type: FieldType;
	tag: "input" | "textarea";
	icon?: React.ReactNode;
	required?: boolean;
	rules?: ValidationRule[];
	tabIndex?: number;
	className?: string;
	locale: IFieldLocale;
	autoFocus?: boolean;
}

export interface IFieldHooks {
	value: string | number;
	onChange: Dispatch<SetStateAction<string>>;
	validation?: FormFieldState;
	setValidation?: (state: FormFieldState) => void;
	validateRules: (value: string) => boolean;
	focus: boolean;
	setFocus: (state: boolean) => void;
}

export type IFieldProps = IFieldDef & IFieldHooks;

export interface ICaptchaProps {
	onChange: (value: string) => void;
	onExpired: () => void;
	locale: string;
	theme: string;
	tabIndex: number;
}

export interface IFormInstance extends ComponentProps {
	locale: string;
	theme: string;
	translate: (s: string) => string;
}

export type FieldHTMLType = HTMLInputElement | HTMLTextAreaElement;

export type FieldChangeEvent = React.ChangeEvent<FieldHTMLType>;
