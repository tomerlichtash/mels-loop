import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import { getIcon } from 'components/icons';
import {
	Container,
	Button,
	LoadingIndicator,
	Recaptcha,
} from 'components/index';
import { handleSubmit } from 'components/recaptcha/Recaptcha';
import FormField from './Field';
import { ApiRoutes } from '../../apiRoutes';
import styles from './Form.module.scss';

type FormFieldProps = {
	id: string;
	initialValue: unknown;
	required?: boolean;
	label?: string;
	placeholder?: string;
	icon?: string;
	validation: yup.Schema;
	input: React.ReactNode;
};

type FormProps = {
	name: string;
	fields: FormFieldProps[];
	recaptchaSiteKey?: string;
	onSuccess?: () => void;
	onError?: (e: unknown) => void;
	submitButtonLabel?: string;
	submitButtonIcon?: string;
	submitButtonLabelActive?: string;
};

const Form = ({
	name,
	fields,
	recaptchaSiteKey,
	submitButtonLabel,
	submitButtonIcon,
	submitButtonLabelActive,
	onSuccess,
	onError,
}: FormProps) => {
	const [submitting, setSubmitting] = useState(false);

	// TODO: restore keyboard functionality
	// useEffect(() => {
	// 	const keyDownHandler = (e: KeyboardEvent) => {
	// 		const enterWithMeta =
	// 			(e.key === 'Enter' && e.metaKey) || (e.key === 'Enter' && e.ctrlKey);
	// 		if (enterWithMeta) {
	// 			e.preventDefault();
	// 			buttonRef.current.click();
	// 		}
	// 	};
	// 	document.addEventListener('keydown', keyDownHandler);
	// 	return () => document.removeEventListener('keydown', keyDownHandler);
	// }, []);

	const initialValues = Object.fromEntries(
		fields.map(({ id, initialValue }) => [id, initialValue])
	);

	const validationSchema = Object.fromEntries(
		fields.map(({ id, validation }) => [id, validation])
	);

	return (
		<div className={styles.root}>
			<Formik
				initialValues={initialValues}
				validationSchema={yup.object().shape(validationSchema)}
				onSubmit={(values: Record<string, unknown>, { resetForm }) => {
					setSubmitting(true);
					handleSubmit({
						siteKey: recaptchaSiteKey,
						path: ApiRoutes.forms.contact,
						action: 'submit',
						values,
						onResponseSuccess: () => {
							setSubmitting(false);
							resetForm();
							onSuccess?.();
						},
						onError: (e) =>
							onError((e as Error)?.message || 'Form submit error'),
					});
				}}
			>
				{({ dirty, isValid }) => {
					return (
						<FormikForm>
							<div className={styles.fieldset}>
								{fields.map(
									({ id, label, placeholder, icon, required, input }) => (
										<FormField
											key={`form_${name}_field_${id}`}
											name={id}
											label={label}
											placeholder={placeholder}
											icon={icon}
											required={required}
											className={styles.field}
										>
											{input}
										</FormField>
									)
								)}
							</div>
							<Container spaceBetween fullWidth alignContentRight>
								<Button
									className={styles.submitButton}
									type="submit"
									disabled={!dirty || (dirty && !isValid)}
								>
									{submitting ? (
										<LoadingIndicator
											delay={0}
											label={submitButtonLabelActive}
										/>
									) : (
										<>
											{submitButtonIcon && getIcon(submitButtonIcon)}
											{submitButtonLabel}
										</>
									)}
								</Button>
							</Container>
						</FormikForm>
					);
				}}
			</Formik>

			{recaptchaSiteKey && <Recaptcha siteKey={recaptchaSiteKey} />}
		</div>
	);
};

export default Form;
export type { FormFieldProps, FormProps };
