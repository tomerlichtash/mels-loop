import React, { useState } from 'react';
import * as yup from 'yup';
import { Field, Formik, Form as FormikForm } from 'formik';
import { getIcon } from 'components/icons';
import {
	Container,
	Button,
	LoadingIndicator,
	Recaptcha,
} from 'components/index';
import { handleSubmit } from 'components/recaptcha/Recaptcha';
import { ApiRoutes } from '../../apiRoutes';
import styles from './Form.module.scss';
import CustomField from 'components/custom-field/CustomField';

type FormFieldProps = {
	name: string;
	type: 'text' | 'number' | 'tel' | 'email' | 'textarea';
	initialValue: unknown;
	required?: boolean;
	label?: string;
	placeholder?: string;
	icon?: string;
	validation?: yup.Schema;
	input?: React.ReactNode;
	component?: 'input' | 'textarea' | 'select';
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
	fields,
	recaptchaSiteKey,
	submitButtonLabel,
	submitButtonIcon,
	submitButtonLabelActive,
	onSuccess,
	onError,
}: FormProps) => {
	const [submitting, setSubmitting] = useState(false);

	const initialValues = Object.fromEntries(
		fields.map(({ name, initialValue }) => [name, initialValue])
	);

	const validationSchema = Object.fromEntries(
		fields.map(({ name, validation }) => [name, validation])
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
				{({ dirty, isValid, touched, errors }) => {
					return (
						<FormikForm>
							<div className={styles.fieldset}>
								{fields.map(
									({
										name,
										label,
										placeholder,
										icon,
										required,
										type,
										component,
									}) => {
										return (
											<CustomField
												key={name}
												name={name}
												label={label}
												icon={icon}
												placeholder={placeholder}
												type={type}
												isInvalid={!!touched[name] && !!errors[name]?.length}
												isValid={touched[name] && !errors[name]?.length}
												errorMessage={errors[name]}
												required={required}
											>
												<Field name={name} type={type} component={component} />
											</CustomField>
										);
									}
								)}
							</div>
							<Container
								className={styles.panel}
								spaceBetween
								fullWidth
								alignContentRight
							>
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
