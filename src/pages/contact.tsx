import React, { useState } from 'react';
import Layout from 'layout/Layout';
import * as yup from 'yup';
import { useLocale } from 'hooks/index';
import { GenericContentLayout } from 'custom-layouts/generic-content-layout/GenericContentLayout';
import { Form, ErrorMessage, Link, Text } from 'components/index';
import type { NextPage, GetStaticProps } from 'next';
import type { IPageProps } from 'types/models';
import type { FormFieldProps } from 'components/form/Form';

export const MAX_FULL_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 256;
export const MAX_MESSAGE_LENGTH = 4096;

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

const VALID_EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const EMAIL_NOT_ALLOWED_REGEXP = /^(?![a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$).*$/;

const fieldLocalePrefix = 'contact:form:fields';

const issueTrackerUrl =
	'https://github.com/tomerlichtash/mels-loop/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=Contact%20form%20error&labels=bug';

const Contact: NextPage<IPageProps> = () => {
	const [error, setError] = useState('');
	const [completed, setCompleted] = useState(false);

	const { t } = useLocale();

	const contactFormFields: FormFieldProps[] = [
		{
			name: 'fullName',
			initialValue: '',
			required: true,
			label: t(`${fieldLocalePrefix}:fullName:label`),
			placeholder: t(`${fieldLocalePrefix}:fullName:placeholder`),
			icon: 'person',
			component: 'input',
			type: 'text',
			validation: yup
				.string()
				.max(
					MAX_FULL_NAME_LENGTH,
					t(`${fieldLocalePrefix}:fullName:validity:maxLength`, {
						maxLength: MAX_FULL_NAME_LENGTH,
					})
				)
				.matches(EMAIL_NOT_ALLOWED_REGEXP, t(`${fieldLocalePrefix}:fullName:validity:typeMismatch`))
				.required(t(`${fieldLocalePrefix}:fullName:validity:valueMissing`)),
		},
		{
			name: 'email',
			initialValue: '',
			required: true,
			label: t(`${fieldLocalePrefix}:email:label`),
			placeholder: t(`${fieldLocalePrefix}:email:placeholder`),
			icon: 'closed-envelope',
			component: 'input',
			type: 'email',
			validation: yup
				.string()
				.matches(VALID_EMAIL_REGEXP, t(`${fieldLocalePrefix}:email:validity:typeMismatch`))
				.max(
					MAX_EMAIL_LENGTH,
					t(`${fieldLocalePrefix}:email:validity:maxLength`, {
						maxLength: MAX_EMAIL_LENGTH,
					})
				)
				.required(t(`${fieldLocalePrefix}:email:validity:valueMissing`)),
		},
		{
			name: 'message',
			initialValue: '',
			required: true,
			label: t(`${fieldLocalePrefix}:message:label`),
			placeholder: t(`${fieldLocalePrefix}:message:placeholder`),
			icon: 'file-text',
			component: 'textarea',
			type: 'textarea',
			validation: yup
				.string()
				.max(
					MAX_MESSAGE_LENGTH,
					t(`${fieldLocalePrefix}:message:validity:maxLength`, {
						maxLength: MAX_MESSAGE_LENGTH,
					})
				)
				.required(t(`${fieldLocalePrefix}:message:validity:valueMissing`)),
		},
	];

	return (
		<Layout>
			<GenericContentLayout
				caption={t('contact:page:title')}
				title={t('contact:page:subtitle')}
				abstract={t('contact:page:abstract')}
			>
				{completed ? (
					<div>
						<Text>{t('contact:form:success:title')}</Text>
						<Link href="/">{t('contact:nav:backToHomepage')}</Link>
					</div>
				) : (
					<>
						<Text>{t('contact:form:title')}</Text>
						<Form
							name="contact"
							fields={contactFormFields}
							recaptchaSiteKey={recaptchaSiteKey}
							submitButtonIcon="light"
							onSuccess={() => setCompleted(true)}
							submitButtonLabel={t('contact:form:submit:button:label')}
							submitButtonLabelActive={t('contact:form:submit:button:label:active')}
							onError={(e: string) => setError(e)}
						/>
					</>
				)}

				{error && (
					<ErrorMessage
						message={t('contact:form:error:message')}
						label={t('contact:form:error:report:label')}
						issueTrackerUrl={issueTrackerUrl}
					/>
				)}
			</GenericContentLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => ({
	props: {},
});

export default Contact;
