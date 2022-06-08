import React, { Dispatch, SetStateAction } from "react";

export enum FormFieldState {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

export interface IFieldProps {
	tag: "input" | "textarea";
	type: "text" | "email" | "number";
	tabIndex?: number;
	value: string;
	id: string;
	label: string;
	placeholder: string;
	errorMsg: string;
	required: boolean;
	icon: React.ReactNode;
	validation: FormFieldState;
	setValidation: (state: FormFieldState) => void;
	validate: (value: string) => boolean;
	onChange: Dispatch<SetStateAction<string>>;
	className?: string;
}

export const RegExpEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
