import React from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { ICaptchaProps } from "./types";
import { st, classes } from "./captcha.st.css";

export const fetchCaptcha = (value: string) =>
	fetch("/api/captcha", {
		body: JSON.stringify({ value }),
		headers: { "Content-Type": "application/json" },
		method: "POST",
	});

export const onCaptchaChange = async (
	value: string,
	onSuccess: () => void
): Promise<Response | false> => {
	const res = await fetchCaptcha(value);
	const { error } = await res.json();
	if (error) {
		console.error(error);
	}
	if (res.status === 200) {
		onSuccess();
		return res;
	}
	return false;
};

export const Captcha = ({
	onChange,
	onExpired,
	locale,
	theme,
	tabIndex,
	highlight,
	className,
}: ICaptchaProps) => (
	<div className={st(classes.root, { highlight }, className)}>
		<div className={classes.captcha} tabIndex={tabIndex}>
			<ReCAPTCHA
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={(value: string) =>
					onCaptchaChange(value, () => onChange(value))
				}
				onExpired={onExpired}
				size="normal"
				hl={locale}
				theme={theme === "dark" ? "dark" : "light"}
			/>
		</div>
	</div>
);
