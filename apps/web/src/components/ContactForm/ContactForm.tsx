'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useTranslation } from '@mels-loop/i18n/client';
import {
	Alert,
	Button,
	Container,
	FormField,
	Label,
	Text,
	Textarea,
	TextInput,
} from '@mels-loop/ui/primitives';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './ContactForm.module.css';

const contactSchema = z.object({
	name: z.string().trim().min(1),
	email: z.email(),
	message: z.string().trim().min(1),
});

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [captchaError, setCaptchaError] = useState(false);
	const turnstileRef = useRef<TurnstileInstance>(null);

	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: { name: '', email: '', message: '' },
	});

	async function onSubmit(values: FormValues) {
		setCaptchaError(false);

		if (siteKey && !turnstileToken) {
			setCaptchaError(true);
			return;
		}

		setStatus('sending');
		try {
			if (siteKey && turnstileToken) {
				const captchaRes = await fetch('/api/captcha', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token: turnstileToken }),
				});
				const captchaData = await captchaRes.json();
				if (!captchaData.success) {
					setStatus('error');
					turnstileRef.current?.reset();
					setTurnstileToken(null);
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
				turnstileRef.current?.reset();
				setTurnstileToken(null);
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	}

	if (status === 'success') {
		return (
			<Alert status="success" title={t('contact.successMessage')}>
				<Button variant="text" size="xs" onClick={() => setStatus('idle')}>
					{t('contact.successBackHome')}
				</Button>
			</Alert>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<Container gap="md">
				{status === 'error' && (
					<Alert status="error" title={t('contact.failMessage')}>
						{t('contact.failReportProblem')}
					</Alert>
				)}
				<FormField error={errors.name?.message}>
					<Label htmlFor="contact-name" required>
						{t('contact.labelName')}
					</Label>
					<TextInput
						id="contact-name"
						placeholder={t('contact.placeholderName')}
						error={!!errors.name}
						fullWidth
						{...register('name')}
					/>
				</FormField>
				<FormField error={errors.email?.message}>
					<Label htmlFor="contact-email" required>
						{t('contact.labelEmail')}
					</Label>
					<TextInput
						id="contact-email"
						type="email"
						placeholder={t('contact.placeholderEmail')}
						error={!!errors.email}
						fullWidth
						{...register('email')}
					/>
				</FormField>
				<FormField error={errors.message?.message}>
					<Label htmlFor="contact-message" required>
						{t('contact.labelMessage')}
					</Label>
					<Textarea
						id="contact-message"
						placeholder={t('contact.placeholderMessage')}
						error={!!errors.message}
						{...register('message')}
					/>
				</FormField>
				{siteKey && (
					<Turnstile
						ref={turnstileRef}
						siteKey={siteKey}
						onSuccess={setTurnstileToken}
						onExpire={() => setTurnstileToken(null)}
					/>
				)}
				{captchaError && (
					<Text variant="body2" color="error" component="span">
						{t('contact.captchaTooltip')}
					</Text>
				)}
				<Button
					type="submit"
					variant="contained"
					loading={status === 'sending'}
				>
					{status === 'sending' ? t('contact.sending') : t('contact.send')}
				</Button>
			</Container>
		</form>
	);
}
