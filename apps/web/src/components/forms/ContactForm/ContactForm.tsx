'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@mels-loop/i18n/client';
import {
	Alert,
	Button,
	Container,
	Text,
	TextArea,
	TextField,
} from '@mels-loop/ui/primitives';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './ContactForm.module.css';

interface FormValues {
	name: string;
	email: string;
	message: string;
	/* The honeypot. Named for what a bot expects to see, not for what it is. */
	website: string;
}

export function ContactForm() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');

	const contactSchema = z.object({
		name: z.string().trim().min(1, t('contact.invalidName')),
		email: z.email(t('contact.invalidEmail')),
		message: z.string().trim().min(1, t('contact.invalidMessage')),
		/*
		 * Unconstrained on purpose. Rejecting a filled honeypot here would tell
		 * the bot which field caught it; the server decides instead, and answers
		 * as though the message sent.
		 */
		website: z.string(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: { name: '', email: '', message: '', website: '' },
	});

	async function onSubmit(values: FormValues) {
		setStatus('sending');

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (res.ok) {
				setStatus('success');
				reset();
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
				{/*
				 * The honeypot: hidden from sight, from the tab order and from
				 * assistive technology, so no person meets it. A bot filling every
				 * field it finds trips it, and the server discards the message
				 * while answering as though it sent.
				 */}
				<input
					type="text"
					className={styles.honeypot}
					tabIndex={-1}
					autoComplete="off"
					aria-hidden="true"
					{...register('website')}
				/>
				<div className={styles.actions}>
					<Button
						type="submit"
						variant="contained"
						loading={status === 'sending'}
					>
						{status === 'sending' ? t('contact.sending') : t('contact.send')}
					</Button>
				</div>
			</Container>
		</form>
	);
}
