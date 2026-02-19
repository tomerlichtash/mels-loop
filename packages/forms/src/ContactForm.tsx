'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@mels-loop/i18n/client';
import { Stack, Alert, Button, Text } from '@mels-loop/ui/primitives';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './ContactForm.module.css';

interface FormValues {
	name: string;
	email: string;
	message: string;
}

export function ContactForm() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');
	const [captchaError, setCaptchaError] = useState(false);
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? '';

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		defaultValues: { name: '', email: '', message: '' },
	});

	async function onSubmit(values: FormValues) {
		setCaptchaError(false);

		if (siteKey) {
			const captchaToken = recaptchaRef.current?.getValue();
			if (!captchaToken) {
				setCaptchaError(true);
				return;
			}
		}

		setStatus('sending');
		try {
			if (siteKey) {
				const captchaToken = recaptchaRef.current?.getValue();
				const captchaRes = await fetch('/api/captcha', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token: captchaToken }),
				});
				const captchaData = await captchaRes.json();
				if (!captchaData.success) {
					setStatus('error');
					recaptchaRef.current?.reset();
					return;
				}
			}

			const res = await fetch('/api/sendgrid', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (res.ok) {
				setStatus('success');
				reset();
				recaptchaRef.current?.reset();
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	}

	if (status === 'success') {
		return (
			<Alert color="green" title={t('contact.successMessage')}>
				<Button variant="subtle" size="xs" onClick={() => setStatus('idle')}>
					{t('contact.successBackHome')}
				</Button>
			</Alert>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack gap="md">
				{status === 'error' && (
					<Alert color="red" title={t('contact.failMessage')}>
						{t('contact.failReportProblem')}
					</Alert>
				)}
				<div className={styles.field}>
					<label className={styles.label}>
						{t('contact.labelName')}
						<span className={styles.required}>*</span>
					</label>
					<input
						className={`${styles.input}${errors.name ? ` ${styles.inputError}` : ''}`}
						placeholder={t('contact.placeholderName')}
						{...register('name', {
							required: t('contact.invalidName'),
							validate: (v) => (v.trim() ? true : t('contact.invalidName')),
						})}
					/>
					{errors.name && <p className={styles.error}>{errors.name.message}</p>}
				</div>
				<div className={styles.field}>
					<label className={styles.label}>
						{t('contact.labelEmail')}
						<span className={styles.required}>*</span>
					</label>
					<input
						className={`${styles.input}${errors.email ? ` ${styles.inputError}` : ''}`}
						type="email"
						placeholder={t('contact.placeholderEmail')}
						{...register('email', {
							required: t('contact.invalidEmail'),
							pattern: {
								value: /^\S+@\S+\.\S+$/,
								message: t('contact.invalidEmail'),
							},
						})}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
				</div>
				<div className={styles.field}>
					<label className={styles.label}>
						{t('contact.labelMessage')}
						<span className={styles.required}>*</span>
					</label>
					<textarea
						className={`${styles.textarea}${errors.message ? ` ${styles.inputError}` : ''}`}
						placeholder={t('contact.placeholderMessage')}
						rows={5}
						{...register('message', {
							required: t('contact.invalidMessage'),
							validate: (v) => (v.trim() ? true : t('contact.invalidMessage')),
						})}
					/>
					{errors.message && (
						<p className={styles.error}>{errors.message.message}</p>
					)}
				</div>
				{siteKey && <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />}
				{captchaError && (
					<Text size="sm" color="error" component="span">
						{t('contact.captchaTooltip')}
					</Text>
				)}
				<Button type="submit" loading={status === 'sending'}>
					{status === 'sending' ? t('contact.sending') : t('contact.send')}
				</Button>
			</Stack>
		</form>
	);
}
