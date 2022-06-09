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
	const [state, setState] = useState("");

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
