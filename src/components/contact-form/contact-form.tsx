import React from "react";
import {
	Form,
	useFormField,
	trField,
	IFormInstance,
	onValuesSubmit,
} from "../form";
import { formFields, compLocale } from "./contact-form-data";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { st, classes } from "./contact-form.st.css";

export const ContactForm = ({
	translate,
	locale,
	theme,
	className,
}: IFormInstance): JSX.Element => {
	const [fullname] = useFormField(trField(formFields.fullname, translate));
	const [email] = useFormField(trField(formFields.email, translate));
	const [message] = useFormField(trField(formFields.message, translate));
	const values = [fullname, email, message];

	const onSuccessMessage = (
		<div className={classes.info}>
			<CheckIcon />
			<p>{translate(compLocale.success)}</p>
			<button>{translate(compLocale.useAgain)}</button>
			<button>{translate(compLocale.backHome)}</button>
		</div>
	);

	const onFailMessage = (
		<div className={classes.info}>
			<ExclamationTriangleIcon />
			<p>{translate(compLocale.fail)}</p>
			<button>{translate(compLocale.tryAgain)}</button>
			<button>{translate(compLocale.reportProblem)}</button>
			<button>{translate(compLocale.backHome)}</button>
		</div>
	);

	return (
		<Form
			fields={values}
			onSubmit={() => onValuesSubmit(values)}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={translate(compLocale.buttonLabel)}
			submitButtonLabelActive={translate(compLocale.buttonLabelActive)}
			locale={locale}
			theme={theme}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
