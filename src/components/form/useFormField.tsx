import { useState } from "react";
import { Field } from "./field";
import { FormFieldState, IFieldDef, FieldType } from "./types";
import { st, classes } from "./form.st.css";

const initValue = (type: FieldType) => {
	switch (type) {
		case "text":
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
	validate,
	className,
}: IFieldDef) => {
	const [value, setValue] = useState(initValue(type));

	const [validation, setValidation] = useState<FormFieldState>(
		FormFieldState.INITIAL
	);

	const field = (
		<Field
			key={`ml-field-${type}-${id}`}
			value={value}
			onChange={setValue}
			validation={validation}
			setValidation={setValidation}
			id={id}
			type={type}
			tag={tag}
			required={required}
			icon={icon}
			locale={locale}
			tabIndex={tabIndex}
			validate={validate}
			className={st(classes.field, className)}
		/>
	);

	return [field];
};
