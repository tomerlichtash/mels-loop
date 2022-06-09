import { useState } from "react";
import { Field } from "./field";
import { FormFieldState, IFieldDef } from "./types";
import { st, classes } from "./form.st.css";

export const useFormField = ({
	id,
	type,
	tag,
	required,
	icon,
	validate,
	locale,
	className,
}: IFieldDef) => {
	let initialValue: string | number;
	switch (type) {
		case "number":
			initialValue = 0;
			break;
		default:
			initialValue = "";
			break;
	}

	const [state, setState] = useState(initialValue);

	const [fieldValidation, setFieldValidation] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);

	return [
		<Field
			key={`ml-field-${id}`}
			className={st(classes.field, className)}
			value={state}
			onChange={setState}
			validation={fieldValidation}
			setValidation={setFieldValidation}
			id={id}
			type={type}
			tag={tag}
			required={required}
			icon={icon}
			validate={validate}
			locale={locale}
		/>,
	];
};
