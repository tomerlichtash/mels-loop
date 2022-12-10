import React from "react";
/* eslint-disable import/no-named-as-default */
import ReCAPTCHA from "react-google-recaptcha";
import { ICaptchaProps } from "./types";
import { st, classes } from "./captcha.st.css";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

/**
 * Swallows errors
 * @param value
 * @returns
 */
export const fetchCaptcha = async (value: string) => {
	try {
		const res = await fetch("/api/captcha", {
			body: JSON.stringify({ value }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		if (res.status !== 200) {
			return { error: `Bad status ${res.status}` };
		}
		return await res.json();
	} catch (e) {
		return { error: String(e) };
	}
};

export const onCaptchaChange = async (
	value: string,
	onSuccess: () => void
): Promise<boolean> => {
	const { error } = await fetchCaptcha(value);
	if (error) {
		console.error(error);
		return false;
	} else {
		onSuccess();
		return true;
	}
};

export const Captcha = ({
	onChange,
	onExpired,
	locale,
	theme,
	tabIndex,
	highlight,
	setCaptchaError,
	className,
}: ICaptchaProps) => {
	if (!recaptchaSiteKey) {
		setCaptchaError("Missing captcha key");
		return;
	}
	return (
		<div className={st(classes.root, { highlight }, className)}>
			<div className={classes.captcha} tabIndex={tabIndex}>
				<ReCAPTCHA
					sitekey={recaptchaSiteKey}
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
};
