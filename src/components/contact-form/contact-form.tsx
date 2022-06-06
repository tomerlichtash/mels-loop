import React, { useContext, useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactLocaleContext } from "../../contexts/locale-context";
import {
	ChatBubbleIcon,
	CheckIcon,
	EnvelopeClosedIcon,
	ExclamationTriangleIcon,
	GlobeIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import LoadingIndicator from "../loading-indicator";
import { st, classes } from "./contact-form.st.css";
// export interface ContactFormProps extends ComponentProps {}

export enum FormFieldStates {
	INITIAL = "initial",
	EMPTY = "empty",
	VALID = "valid",
	INVALID = "invalid",
}

const RegExpEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ContactForm = ({ className }: ComponentProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);

	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [loadingIndicator, toggleloadingIndicator] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	const [fieldStateName, setFieldStateName] = useState<FormFieldStates>(
		FormFieldStates.INITIAL
	);
	const [fieldStateEmail, setFieldStateEmail] = useState<FormFieldStates>(
		FormFieldStates.INITIAL
	);
	const [buttonText, setButtonText] = useState(
		translate("CONTACT_FORM_LABEL_SEND")
	);

	const handleValidation = () => {
		let tempErrors = {};
		let isValid = true;
		if (fullname.length <= 0) {
			tempErrors["fullname"] = true;
			isValid = false;
			setFieldStateName(FormFieldStates.INVALID);
		}
		if (email.length <= 0) {
			tempErrors["email"] = true;
			isValid = false;
			setFieldStateEmail(FormFieldStates.INVALID);
		}
		if (message.length <= 0) {
			tempErrors["message"] = true;
			isValid = false;
		}
		setErrors({ ...tempErrors });
		return isValid;
	};

	const onFetchError = () => {
		// console.log(error);
		setShowSuccessMessage(false);
		setShowFailureMessage(true);
		setButtonText(translate("CONTACT_FORM_LABEL_SEND"));
		toggleloadingIndicator(false);
	};

	const onFetchSuccess = () => {
		setShowSuccessMessage(true);
		setShowFailureMessage(false);
		setButtonText(translate("CONTACT_FORM_LABEL_SEND"));
		toggleloadingIndicator(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (isValidForm) {
			// setButtonText(translate("CONTACT_FORM_LABEL_SEND_ACTIVE"));
			toggleloadingIndicator(true);

			const res = await fetch("/api/sendgrid", {
				body: JSON.stringify({ email, fullname, message }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			const { error } = await res.json();

			if (error) onFetchError();
			else onFetchSuccess();
		}
	};

	const validateName = (value: string) => {
		if (!value) setFieldStateName(FormFieldStates.EMPTY);
		else setFieldStateName(FormFieldStates.VALID);
	};

	const validateEmail = (value: string) => {
		if (!value) setFieldStateEmail(FormFieldStates.EMPTY);
		else if (!email.match(RegExpEmail))
			setFieldStateEmail(FormFieldStates.INVALID);
		else setFieldStateEmail(FormFieldStates.VALID);
	};

	return (
		<div className={st(classes.root, className)}>
			{showSuccessMessage && (
				<div className={classes.info}>
					<CheckIcon />
					<p>{translate("CONTACT_FORM_SUCCESS_MESSAGE")}</p>
					<button>send another?</button>
					<button>back to home</button>
				</div>
			)}
			{showFailureMessage && (
				<div className={classes.info}>
					<ExclamationTriangleIcon />
					<p>{translate("CONTACT_FORM_SUCCESS_FAIL")}</p>
					<button>try again</button>
					<div>use email</div>
				</div>
			)}
			{!showSuccessMessage && !showFailureMessage && (
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				<form onSubmit={handleSubmit} className={classes.form}>
					<h2 className={classes.formTitle}>
						<EnvelopeClosedIcon />
						{translate("CONTACT_FORM_TITLE")}
					</h2>
					<div className={classes.field}>
						<label htmlFor="fullname" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								<span className={classes.text}>
									<PersonIcon />
									{translate("CONTACT_FORM_LABEL_FULLNAME")}
								</span>
							</span>
							<input
								type="text"
								value={fullname}
								id="fullname"
								onChange={(e) => setFullname(e.target.value)}
								onBlur={(e) => validateName(e.target.value)}
								name="fullname"
								placeholder="Enter your full name"
								className={st(classes.input, {
									type: "name",
									validation: fieldStateName,
								})}
							/>
							{fieldStateName === FormFieldStates.INVALID && (
								<p className={classes.error}>invalid name</p>
							)}
						</label>
					</div>
					<div className={classes.field}>
						<label htmlFor="email" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								<span className={classes.text}>
									<GlobeIcon />
									{translate("CONTACT_FORM_LABEL_EMAIL")}
								</span>
							</span>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={(e) => validateEmail(e.target.value)}
								placeholder="Enter your e-mail address"
								className={st(classes.input, {
									type: "email",
									validation: fieldStateEmail,
								})}
							/>
							{fieldStateEmail === FormFieldStates.INVALID && (
								<p className={classes.error}>invalid email address</p>
							)}
						</label>
					</div>
					<div className={classes.field}>
						<label htmlFor="message" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								<span className={classes.text}>
									<ChatBubbleIcon />
									{translate("CONTACT_FORM_LABEL_MESSAGE")}
								</span>
							</span>
							<textarea
								name="message"
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message here"
								className={st(classes.input, { textarea: true })}
							></textarea>
						</label>
					</div>
					<div className={classes.submit}>
						<button className={classes.button} type="submit">
							{loadingIndicator ? (
								<LoadingIndicator
									label="CONTACT_FORM_LABEL_SEND_ACTIVE"
									delay={0}
									className={classes.loadingIndicator}
								/>
							) : (
								buttonText
							)}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ContactForm;

{
	/* <div className={classes.field}>
	<label htmlFor="subject" className={classes.label}>
		<span className={st(classes.caption, { required: true })}>
			<span className={classes.text}>
				<Pencil2Icon />
				{translate("CONTACT_FORM_LABEL_SUBJECT")}
			</span>
		</span>
		<input
			type="text"
			name="subject"
			id="subject"
			value={subject}
			onChange={(e) => setSubject(e.target.value)}
			placeholder="Enter message subject"
			className={classes.input}
		/>
	</label>
</div> */
}
