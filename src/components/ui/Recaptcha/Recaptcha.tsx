import React from "react";
import { default as ReCAPTCHA } from "react-google-recaptcha";
import type { ICaptchaProps } from "../../form/types";

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

const Recaptcha = ({
	onChange,
	onExpired,
	locale,
	// theme,
	tabIndex,
	// highlight,
	siteKey,
	setCaptchaError,
}: ICaptchaProps) => {
	if (setCaptchaError && !siteKey) {
		setCaptchaError("Missing captcha key");
		return;
	}
	return (
		<div className="captcha" tabIndex={tabIndex}>
			<ReCAPTCHA
				sitekey={siteKey}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={(value: string) =>
					onCaptchaChange(value, () => onChange(value))
				}
				onExpired={onExpired}
				size="normal"
				hl={locale}
				// theme={theme === "dark" ? "dark" : "light"}
			/>
		</div>
	);
};

export default Recaptcha;
