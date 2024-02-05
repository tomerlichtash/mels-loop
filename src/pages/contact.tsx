import React, { useContext } from 'react';
import { LocaleProvider } from '../locale/context/locale-context';
import { Layout, ContactForm } from 'components';

import type { NextPage, GetStaticProps } from 'next';
import type { IPageProps } from 'types/models';
// import Article from 'components/ContentPage';

// const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(LocaleProvider);
	return (
		<Layout>
			{/* <Article
				title={translate('CONTACT_PAGE_TITLE')}
				subtitle={translate('CONTACT_PAGE_SUBTITLE')}
				abstract={translate('CONTACT_PAGE_TEXT1')}
			> */}
			<ContactForm
				title={translate('CONTACT_FORM_FORM_TITLE')}
				description={translate('CONTACT_FORM_FORM_SUBTITLE')}
				// recaptchaSiteKey={recaptchaSiteKey}
			/>
			{/* </Article> */}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Contact;
