import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import type { IFieldDef } from "../form/types";
import { Form, useFormField } from "../form";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { formFields, compLocale } from "./contact-form-data";
import { st, classes } from "./contact-form.st.css";

export const ContactForm = ({ className }: ComponentProps): JSX.Element => {
	const { translate, locale } = useContext(ReactLocaleContext);

	const trField = (field: IFieldDef) => {
		return Object.assign({}, field, {
			locale: Object.fromEntries(
				Object.keys(field.locale).map((key) => [
					key,
					translate(field.locale[key] as string),
				])
			),
		});
	};

	const [fullname] = useFormField(trField(formFields.fullname));
	const [email] = useFormField(trField(formFields.email));
	const [message] = useFormField(trField(formFields.message));

	const values = [fullname, email, message];

	const onSubmit = () => {
		return fetch("/api/sendgrid", {
			body: JSON.stringify(
				Object.fromEntries(
					values.map((field) => {
						const { props } = field;
						const { id, value } = props;
						return [id, value];
					})
				)
			),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
	};

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
			<div>{translate(compLocale.reportProblem)}</div>
		</div>
	);

	return (
		<Form
			fields={values}
			onSubmit={onSubmit}
			onSuccessMessage={onSuccessMessage}
			onFailMessage={onFailMessage}
			submitButtonLabel={translate(compLocale.buttonLabel)}
			submitButtonLabelActive={translate(compLocale.buttonLabelActive)}
			locale={locale}
			className={st(classes.root, className)}
		/>
	);
};

export default ContactForm;
