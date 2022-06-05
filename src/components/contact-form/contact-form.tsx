import React, { useContext, useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./contact-form.st.css";

// export interface ContactFormProps extends ComponentProps {}

export const ContactForm = ({ className }: ComponentProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [buttonText, setButtonText] = useState(
		translate("CONTACT_FORM_LABEL_SEND")
	);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	const handleValidation = () => {
		let tempErrors = {};
		let isValid = true;

		if (fullname.length <= 0) {
			tempErrors["fullname"] = true;
			isValid = false;
		}

		if (email.length <= 0) {
			tempErrors["email"] = true;
			isValid = false;
		}

		if (subject.length <= 0) {
			tempErrors["subject"] = true;
			isValid = false;
		}

		if (message.length <= 0) {
			tempErrors["message"] = true;
			isValid = false;
		}

		setErrors({ ...tempErrors });
		// console.log("errors", errors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (isValidForm) {
			setButtonText(translate("CONTACT_FORM_LABEL_SEND_ACTIVE"));
			const res = await fetch("/api/sendgrid", {
				body: JSON.stringify({ email, fullname, subject, message }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			const { error } = await res.json();
			if (error) {
				// console.log(error);
				setShowSuccessMessage(false);
				setShowFailureMessage(true);
				setButtonText(translate("CONTACT_FORM_LABEL_SEND"));
				return;
			}
			setShowSuccessMessage(true);
			setShowFailureMessage(false);
			setButtonText(translate("CONTACT_FORM_LABEL_SEND"));
		}
		// console.log(fullname, email, subject, message);
	};

	return (
		<div className={classes.root}>
			{showSuccessMessage && (
				<div>
					<p>{translate("CONTACT_FORM_SUCCESS_MESSAGE")}</p>
					<button>send another?</button>
					<button>back to home</button>
				</div>
			)}
			{showFailureMessage && (
				<div>
					<p>{translate("CONTACT_FORM_SUCCESS_FAIL")}</p>
					<button>try again</button>
					<div>use email</div>
				</div>
			)}

			{!showSuccessMessage && (
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				<form onSubmit={handleSubmit} className={classes.form}>
					<h2 className={classes.formTitle}>
						{translate("CONTACT_FORM_TITLE")}
					</h2>

					<div className={classes.field}>
						<label htmlFor="fullname" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								{translate("CONTACT_FORM_LABEL_FULLNAME")}
							</span>
							<input
								type="text"
								value={fullname}
								id="fullname"
								onChange={(e) => setFullname(e.target.value)}
								name="fullname"
								className={classes.input}
							/>
						</label>
					</div>

					<div className={classes.field}>
						<label htmlFor="email" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								{translate("CONTACT_FORM_LABEL_EMAIL")}
							</span>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={classes.input}
							/>
						</label>
					</div>

					<div className={classes.field}>
						<label htmlFor="subject" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								{translate("CONTACT_FORM_LABEL_SUBJECT")}
							</span>
							<input
								type="text"
								name="subject"
								id="subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className={classes.input}
							/>
						</label>
					</div>

					<div className={classes.field}>
						<label htmlFor="message" className={classes.label}>
							<span className={st(classes.caption, { required: true })}>
								{translate("CONTACT_FORM_LABEL_MESSAGE")}
							</span>
							<textarea
								name="message"
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className={st(classes.input, { textarea: true })}
							></textarea>
						</label>
					</div>

					<div className={classes.submit}>
						<button className={classes.button} type="submit">
							{buttonText}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ContactForm;
