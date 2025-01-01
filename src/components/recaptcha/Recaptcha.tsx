// eslint-disable @typescript-eslint/no-floating-promises
import Script from 'next/script';
import React from 'react';

type RecaptchaProps = {
	siteKey: string;
};

type RecaptchaHandleSubmitProps = {
	siteKey: string;
	action: string;
	path: string;
	values: Record<string, unknown>;
	onResponseSuccess?: (res: Record<string, string>) => void;
	onResponseFail?: (res: Response) => void;
	onError?: (e: unknown) => void;
};

const handleSubmit = ({
	siteKey,
	action,
	path,
	values,
	onResponseSuccess,
	onResponseFail,
	onError,
}: RecaptchaHandleSubmitProps) => {
	window.grecaptcha.ready(() => {
		try {
			void window.grecaptcha.execute(siteKey, { action }).then(async () => {
				try {
					const response = await fetch(path, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json;charset=utf-8' },
						body: JSON.stringify(values),
					});
					if (response.ok) {
						const json = (await response.json()) as Record<string, string>;
						onResponseSuccess?.({ ...json });
					} else {
						onResponseFail?.(response);
						throw new Error(response.statusText);
					}
				} catch (e: unknown) {
					console.error('Recaptcha error', e);
					onError(e);
				}
			});
		} catch (e: unknown) {
			console.error('Recaptcha error', e);
			onError?.(e);
		}
	});
};

const Recaptcha = ({ siteKey }: RecaptchaProps) => {
	return (
		<Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} />
	);
};

export default Recaptcha;
export { handleSubmit };
export type { RecaptchaProps };
