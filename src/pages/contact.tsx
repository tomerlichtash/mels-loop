import React, { useContext } from 'react';
import { LocaleContext } from '../context/locale/localeContext';
import Layout from 'components/layout/Layout';
import ContactForm from 'components/contact-form/ContactForm';

import type { NextPage, GetStaticProps } from 'next';
import type { IPageProps } from 'types/models';
// import Article from 'components/ContentPage';

// const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(LocaleContext);
	return (
		<Layout title="Contact Us">
			{/* <Article
				title={translate('pages.contact.title')}
				subtitle={translate('pages.contact.subtitle')}
				abstract={translate('pages.contact.abstract')}
			> */}
			<ContactForm
				title={translate('pages.contact.formtitle')}
				description={translate('pages.contact.formsubtitle')}
				// recaptchaSiteKey={recaptchaSiteKey}
			/>
			{/* </Article> */}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export default Contact;
