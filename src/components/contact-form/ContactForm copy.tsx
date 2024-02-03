// import React, { useContext, useEffect } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { LabelRoot } from "@components/primitives/Label";
// import {
// 	Form,
// 	FormField,
// 	FormLabel,
// 	FormMessage,
// 	FormControl,
// 	FormSubmit,
// } from "@components/primitives/Form";
// import { LocaleProvider } from "locale/context/locale-context";
// import Recaptcha from "@components/ui/Recaptcha";
// import {
// 	ChatBubbleIcon,
// 	EnvelopeClosedIcon,
// 	PersonIcon,
// 	SunIcon,
// } from "@radix-ui/react-icons";
// import { Button, Card, Input, TextArea } from "@components/ui";
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
// 								{translate("CONTACT_FORM_LABEL_FULLNAME")}
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
// 										"CONTACT_FORM_LABEL_FULLNAME_PLACEHOLDER"
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
// 									{translate("CONTACT_FORM_INVALID_NAME")}
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
// 								{translate("CONTACT_FORM_LABEL_EMAIL")}
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
// 										"CONTACT_FORM_LABEL_EMAIL_PLACEHOLDER"
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
// 									{translate("CONTACT_FORM_INVALID_EMAIL")}
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
// 								{translate("CONTACT_FORM_LABEL_MESSAGE")}
// 							</LabelRoot>
// 						</FormLabel>
// 						<div className={styles.inputField}>
// 							<FormControl asChild>
// 								<TextArea
// 									id="message"
// 									className={classNames(styles.input, styles.textarea)}
// 									required
// 									placeholder={translate(
// 										"CONTACT_FORM_LABEL_MESSAGE_PLACEHOLDER"
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
// 									{translate("CONTACT_FORM_INVALID_MESSAGE")}
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
// 						{translate("CONTACT_FORM_LABEL_SEND")}
// 					</Button>
// 				</FormSubmit>
// 			</Form>
// 		</Card>
// 	);
// };

// export default ContactForm;
