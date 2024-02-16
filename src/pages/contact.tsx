import React from 'react';
import Layout from 'layout/Layout';
import ContactForm from 'contact-form/ContactForm';

import type { NextPage, GetStaticProps } from 'next';
import type { IPageProps } from 'types/models';
import { useLocale } from 'hooks/index';
// import Article from 'components/ContentPage';

// const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

const Contact: NextPage<IPageProps> = () => {
	const { t } = useLocale();
	return (
		<Layout title="Contact Us">
			{/* <Article
				title={translate('pages.contact.title')}
				subtitle={translate('pages.contact.subtitle')}
				abstract={translate('pages.contact.abstract')}
			> */}
			<ContactForm
				title={t('pages.contact.formtitle')}
				description={t('pages.contact.formsubtitle')}
				// recaptchaSiteKey={recaptchaSiteKey}
			/>
			{/* </Article> */}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export default Contact;
