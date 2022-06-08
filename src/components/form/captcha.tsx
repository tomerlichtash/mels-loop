/* eslint-disable import/no-named-as-default */
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const fetchCaptcha = (value: string) =>
	fetch("/api/captcha", {
		body: JSON.stringify({ value }),
		headers: { "Content-Type": "application/json" },
		method: "POST",
	});

export const onCaptchaChange = async (value: string, onSuccess: () => void) => {
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

export interface ICaptchaProps {
	onChange: (value) => void;
	locale: string;
	theme: "light" | "dark";
}
export const Captcha = ({ onChange, locale, theme }: ICaptchaProps) => (
	<ReCAPTCHA
		sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		onChange={(value) => onCaptchaChange(value, () => onChange(value))}
		size="normal"
		hl={locale}
		theme={theme}
		// tabIndex={4}
	/>
);
