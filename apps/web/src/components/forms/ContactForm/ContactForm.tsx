'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '@mels-loop/ui/color-scheme';
import {
	Alert,
	Button,
	Container,
	Text,
	TextArea,
	TextField,
} from '@mels-loop/ui/primitives';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './ContactForm.module.css';

interface FormValues {
	name: string;
	email: string;
	message: string;
}

export function ContactForm() {
	const { t } = useTranslation();
	const { colorScheme } = useColorScheme();
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');
	const [turnstileError, setCaptchaError] = useState(false);
	const turnstileRef = useRef<TurnstileInstance>(null);

	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

	const contactSchema = z.object({
		name: z.string().trim().min(1, t('contact.invalidName')),
		email: z.email(t('contact.invalidEmail')),
		message: z.string().trim().min(1, t('contact.invalidMessage')),
	});

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
		setStatus('sending');

		try {
			if (siteKey) {
				turnstileRef.current?.execute();

				// Wait for token from onSuccess callback
				const token = await new Promise<string>((resolve, reject) => {
					const timeout = setTimeout(
						() => reject(new Error('Turnstile timeout')),
						10000,
					);
					const check = () => {
						const t = turnstileRef.current?.getResponse();
						if (t) {
							clearTimeout(timeout);
							resolve(t);
						} else {
							setTimeout(check, 100);
						}
					};
					check();
				});

				const captchaRes = await fetch('/api/turnstile', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token }),
				});
				const captchaData = await captchaRes.json();
				if (!captchaData.success) {
					setStatus('error');
					turnstileRef.current?.reset();
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
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
			setCaptchaError(true);
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
				<Text variant="h3">{t('contact.formTitle')}</Text>
				{status === 'error' && (
					<Alert status="error" title={t('contact.failMessage')}>
						{t('contact.failReportProblem')}
					</Alert>
				)}
				<TextField
					label={t('contact.labelName')}
					placeholder={t('contact.placeholderName')}
					error={!!errors.name}
					errorMessage={errors.name?.message}
					required
					fullWidth
					size="lg"
					{...register('name')}
				/>
				<TextField
					label={t('contact.labelEmail')}
					type="email"
					placeholder={t('contact.placeholderEmail')}
					error={!!errors.email}
					errorMessage={errors.email?.message}
					required
					fullWidth
					size="lg"
					{...register('email')}
				/>
				<TextArea
					label={t('contact.labelMessage')}
					placeholder={t('contact.placeholderMessage')}
					error={!!errors.message}
					errorMessage={errors.message?.message}
					required
					fullWidth
					size="lg"
					{...register('message')}
				/>
				{turnstileError && (
					<Text variant="body2" color="error" component="span">
						{t('contact.captchaTooltip')}
					</Text>
				)}
				<div className={styles.actions}>
					<Button
						type="submit"
						variant="contained"
						loading={status === 'sending'}
					>
						{status === 'sending' ? t('contact.sending') : t('contact.send')}
					</Button>
					{siteKey && (
						<Turnstile
							ref={turnstileRef}
							siteKey={siteKey}
							options={{
								theme: colorScheme as 'light' | 'dark',
								appearance: 'always',
							}}
							onError={() => setCaptchaError(true)}
						/>
					)}
				</div>
			</Container>
		</form>
	);
}
