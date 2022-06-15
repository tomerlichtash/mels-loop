import {
	ChangeEvent,
	KeyboardEvent,
	Dispatch,
	ReactNode,
	SetStateAction,
} from "react";
import { ComponentProps } from "../../interfaces/models";

export type FormValues = Record<string, string>;

export interface IFormProps extends ComponentProps {
	entries: Record<string, IFieldDef>;
	onSuccessMessage: React.ReactNode;
	onFailMessage: React.ReactNode;
	submitButtonLabel: string;
	submitButtonLabelActive: string;
	locale?: string;
	theme?: string;
	onSubmit: (values: FormValues) => Promise<Response>;
}

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
	icon?: ReactNode;
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
	highlight: boolean;
	className?: string;
}

export interface IFormInstance extends ComponentProps {
	translate: (s: string) => string;
}

export type FieldHTMLType = HTMLInputElement | HTMLTextAreaElement;

export type FieldChangeEvent = ChangeEvent<FieldHTMLType>;

export type FieldKeyboardEvent = KeyboardEvent<FieldHTMLType>;
