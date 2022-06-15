import React, { useState } from "react";
import { Field } from "./field";
import { FormFieldState, IFieldDef, FieldType } from "./types";
import { st, classes } from "./form.st.css";

const initValue = (type: FieldType) => {
	switch (type) {
		case "text":
		case "email":
			return "";
		case "number":
			return 0;
		default:
			return null;
	}
};

export const useFormField = ({
	id,
	type,
	tag,
	required,
	icon,
	locale,
	tabIndex,
	rules,
	autoFocus,
	className,
}: IFieldDef) => {
	const { INITIAL } = FormFieldState;

	const [value, setValue] = useState(initValue(type));
	const [validation, setValidation] = useState<FormFieldState>(INITIAL);
	const [focus, setFocus] = useState(false);

	const validateRules = (value: string) =>
		rules.map((rule) => rule(value)).indexOf(false) === -1;

	const element = (
		<Field
			key={`ml-field-${type}-${id}`}
			value={value}
			onChange={setValue}
			validation={validation}
			validateRules={validateRules}
			setValidation={setValidation}
			focus={focus}
			setFocus={setFocus}
			id={id}
			type={type}
			tag={tag}
			required={required}
			icon={icon}
			locale={locale}
			tabIndex={tabIndex}
			autoFocus={autoFocus}
			className={st(classes.field, className)}
		/>
	);

	return [element];
};
