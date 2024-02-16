import React, { useEffect } from 'react';
import * as yup from 'yup';
import * as Form from '@radix-ui/react-form';
import { useFormik, Formik, Field } from 'formik';
// import Recaptcha from 'components/recaptcha';
import {
	ChatBubbleIcon,
	EnvelopeClosedIcon,
	PersonIcon,
	SunIcon,
} from '@radix-ui/react-icons';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import TextArea from 'components/text-area/TextArea';
import classNames from 'classnames';
import styles from './ContactForm.module.scss';
import { useLocale } from 'hooks/index';

const ContactForm = ({ title, description }) => {
	const { t } = useLocale();

	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			message: '',
		},
		validationSchema: yup.object().shape({
			fullName: yup.string().required(),
			email: yup.string().required(),
			message: yup.string().required(),
			recaptcha: yup.string().required(),
		}),
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
		},
	});

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) =>
			e.key === 'Enter' && e.ctrlKey && formik.handleSubmit();
		document.addEventListener('keydown', keyDownHandler);
		return () => document.removeEventListener('keydown', keyDownHandler);
	});

	// useEffect(() => {
	// 	console.log(formik);
	// }, [formik]);

	const SignupSchema = yup.object().shape({
		firstName: yup
			.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		lastName: yup
			.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		email: yup.string().email('Invalid email').required('Required'),
	});

	return (
		<div>
			<h1>Signup</h1>
			<Formik
				initialValues={{
					fullName: '',
					email: '',
					message: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={() => {
					// same shape as initial values
				}}
			>
				{/* errors.email && touched.emai */}
				{() => {
					// {({ errors, touched }) => {
					// console.log({ errors, touched });
					return (
						<div className={styles.root}>
							<div className={styles.header}>
								<div className={styles.title}>{title}</div>
								<div className={styles.subtitle}>{description}</div>
							</div>

							<Form.Root className={styles.form} onSubmit={formik.handleSubmit}>
								<div className={styles.fieldset}>
									<Form.Field className={styles.field} name="fullName">
										<Form.Label className={styles.label} htmlFor="fullName">
											<PersonIcon />
											{t('forms.contact.field.name.label')}
										</Form.Label>
										<div className={styles.inputField}>
											<Form.FormControl asChild>
												<Field name="fullName" type="text" />
												{/* <Input
													id="fullName"
													className={styles.input}
													type="text"
													required
													placeholder={translate(
														"forms.contact.field.name.placeholder"
													)}
													value={formik.values.fullName}
													onChange={formik.handleChange}
													data-size="sm"
												/> */}
											</Form.FormControl>
											<div className={styles.errorMessage}>
												<Form.Message
													className={classNames(
														styles.validationMessage,
														styles.valueMissing
													)}
													match="valueMissing"
												>
													{t('forms.contact.field.name.validity.missingValue')}
												</Form.Message>
												<Form.Message
													className={classNames(
														styles.validationMessage,
														styles.typeMismatch
													)}
													match="typeMismatch"
												>
													Please provide a name
												</Form.Message>
											</div>
										</div>
									</Form.Field>
									<Form.Field className={styles.field} name="email">
										<Form.Label className={styles.label} htmlFor="email">
											<EnvelopeClosedIcon />
											{t('forms.contact.field.email.label')}
										</Form.Label>
										<div className={styles.inputField}>
											<Form.Control asChild>
												<Input
													id="email"
													className={styles.input}
													type="email"
													required
													placeholder={t(
														'forms.contact.field.email.placeholder'
													)}
													value={formik.values.email}
													onChange={formik.handleChange}
												/>
											</Form.Control>
											<div className={styles.errorMessage}>
												<Form.Message
													className={classNames(
														styles.validationMessage,
														styles.valueMissing
													)}
													match="valueMissing"
												>
													{t('forms.contact.field.email.validity.missingValue')}
												</Form.Message>
												<Form.Message
													className={classNames(
														styles.validationMessage,
														styles.typeMismatch
													)}
													match="typeMismatch"
												>
													Please provide a valid email
												</Form.Message>
											</div>
										</div>
									</Form.Field>
									<Form.Field className={styles.field} name="message">
										<Form.Label className={styles.label} htmlFor="message">
											<ChatBubbleIcon />
											{t('forms.contact.field.message.label')}
										</Form.Label>
										<div className={styles.inputField}>
											<Form.Control asChild>
												<TextArea
													id="message"
													className={classNames(styles.input, styles.textarea)}
													required
													placeholder={t(
														'forms.contact.field.message.placeholder'
													)}
													value={formik.values.message}
													onChange={formik.handleChange}
												/>
											</Form.Control>
											<div className={styles.errorMessage}>
												<Form.Message
													className={classNames(
														styles.validationMessage,
														styles.valueMissing
													)}
													match="valueMissing"
												>
													{t(
														'forms.contact.field.message.validity.missingValue'
													)}
												</Form.Message>
											</div>
										</div>
									</Form.Field>
								</div>
								{/* <Recaptcha
									locale={locale}
									tabIndex={0}
									siteKey={recaptchaSiteKey}
									onChange={async (response: string) =>
										await formik.setFieldValue('recaptcha', response)
									}
									onExpired={() => console.log('expired')}
								/> */}
								<Form.Submit asChild>
									<Button className={styles.submit} data-size="sm">
										<SunIcon />
										{t('button.send')}
									</Button>
								</Form.Submit>
							</Form.Root>
						</div>
					);
				}}
			</Formik>
		</div>
	);
};

export default ContactForm;

// import React, { useContext, useEffect } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { LabelRoot } from "components/primitives/Label";
// import {
// 	Form,
// 	FormField,
// 	FormLabel,
// 	FormMessage,
// 	FormControl,
// 	FormSubmit,
// } from "components/primitives/Form";
// import { LocaleProvider } from "locale/context/locale-context";
// import Recaptcha from "components/ui/Recaptcha";
// import {
// 	ChatBubbleIcon,
// 	EnvelopeClosedIcon,
// 	PersonIcon,
// 	SunIcon,
// } from "@radix-ui/react-icons";
// import { Button, Card, Input, TextArea } from "components/ui";
// import classNames from "classnames";
// import styles from "./ContactForm.module.scss";

// const ContactForm = ({ title, description, recaptchaSiteKey, className }) => {
// 	const { locale, translate } = useContext(LocaleProvider);

// 	const formik = useFormik({
// 		initialValues: {
// 			fullName: "",
// 			email: "",
// 			message: "",
// 		},
// 		validationSchema: yup.object().shape({
// 			fullName: yup.string().required(),
// 			email: yup.string().required(),
// 			message: yup.string().required(),
// 			recaptcha: yup.string().required(),
// 		}),
// 		onSubmit: (values) => {
// 			console.log(JSON.stringify(values, null, 2));
// 		},
// 	});

// 	useEffect(() => {
// 		const keyDownHandler = (e: KeyboardEvent) =>
// 			e.key === "Enter" && e.ctrlKey && formik.handleSubmit();
// 		document.addEventListener("keydown", keyDownHandler);
// 		return () => document.removeEventListener("keydown", keyDownHandler);
// 	});

// 	useEffect(() => {
// 		console.log(formik);
// 	}, [formik]);

// 	return (
// 		<Card className={classNames(styles.root, className)}>
// 			<div className={styles.header}>
// 				<div className={styles.title}>{title}</div>
// 				<div className={styles.subtitle}>{description}</div>
// 			</div>
// 			<Form className={styles.form} onSubmit={formik.handleSubmit}>
// 				<div className={styles.fieldset}>
// 					<FormField className={classNames(styles.field)} name="fullName">
// 						<FormLabel asChild>
// 							<LabelRoot className={styles.label} htmlFor="fullName">
// 								<PersonIcon />
// 								{translate("forms.contact.field.name.label")}
// 							</LabelRoot>
// 						</FormLabel>
// 						<div className={styles.inputField}>
// 							<FormControl asChild>
// 								<Input
// 									id="fullName"
// 									className={styles.input}
// 									type="text"
// 									required
// 									placeholder={translate(
// 										"forms.contact.field.name.placeholder"
// 									)}
// 									value={formik.values.fullName}
// 									onChange={formik.handleChange}
// 									data-size="sm"
// 								/>
// 							</FormControl>
// 							<div className={styles.errorMessage}>
// 								<FormMessage
// 									className={classNames(
// 										styles.validationMessage,
// 										styles.valueMissing
// 									)}
// 									match="valueMissing"
// 								>
// 									{translate("forms.contact.field.name.validity.missingValue")}
// 								</FormMessage>
// 								<FormMessage
// 									className={classNames(
// 										styles.validationMessage,
// 										styles.typeMismatch
// 									)}
// 									match="typeMismatch"
// 								>
// 									Please provide a name
// 								</FormMessage>
// 							</div>
// 						</div>
// 					</FormField>
// 					<FormField className={styles.field} name="email">
// 						<FormLabel asChild>
// 							<LabelRoot className={styles.label} htmlFor="email">
// 								<EnvelopeClosedIcon />
// 								{translate("forms.contact.field.email.label")}
// 							</LabelRoot>
// 						</FormLabel>
// 						<div className={styles.inputField}>
// 							<FormControl asChild>
// 								<Input
// 									id="email"
// 									className={styles.input}
// 									type="email"
// 									required
// 									placeholder={translate(
// 										"forms.contact.field.email.placeholder"
// 									)}
// 									value={formik.values.email}
// 									onChange={formik.handleChange}
// 								/>
// 							</FormControl>
// 							<div className={styles.errorMessage}>
// 								<FormMessage
// 									className={classNames(
// 										styles.validationMessage,
// 										styles.valueMissing
// 									)}
// 									match="valueMissing"
// 								>
// 									{translate("forms.contact.field.email.validity.missingValue")}
// 								</FormMessage>
// 								<FormMessage
// 									className={classNames(
// 										styles.validationMessage,
// 										styles.typeMismatch
// 									)}
// 									match="typeMismatch"
// 								>
// 									Please provide a valid email
// 								</FormMessage>
// 							</div>
// 						</div>
// 					</FormField>
// 					<FormField className={styles.field} name="message">
// 						<FormLabel asChild>
// 							<LabelRoot className={styles.label} htmlFor="message">
// 								<ChatBubbleIcon />
// 								{translate("forms.contact.field.message.label")}
// 							</LabelRoot>
// 						</FormLabel>
// 						<div className={styles.inputField}>
// 							<FormControl asChild>
// 								<TextArea
// 									id="message"
// 									className={classNames(styles.input, styles.textarea)}
// 									required
// 									placeholder={translate(
// 										"forms.contact.field.message.placeholder"
// 									)}
// 									value={formik.values.message}
// 									onChange={formik.handleChange}
// 								/>
// 							</FormControl>
// 							<div className={styles.errorMessage}>
// 								<FormMessage
// 									className={classNames(
// 										styles.validationMessage,
// 										styles.valueMissing
// 									)}
// 									match="valueMissing"
// 								>
// 									{translate("forms.contact.field.message.validity.missingValue")}
// 								</FormMessage>
// 							</div>
// 						</div>
// 					</FormField>
// 				</div>
// 				<Recaptcha
// 					locale={locale}
// 					tabIndex={0}
// 					siteKey={recaptchaSiteKey}
// 					onChange={async (response: string) =>
// 						await formik.setFieldValue("recaptcha", response)
// 					}
// 					onExpired={() => console.log("expired")}
// 				/>
// 				<FormSubmit asChild>
// 					<Button type="submit" className={styles.submit} data-size="sm">
// 						<SunIcon />
// 						{translate("button.send")}
// 					</Button>
// 				</FormSubmit>
// 			</Form>
// 		</Card>
// 	);
// };