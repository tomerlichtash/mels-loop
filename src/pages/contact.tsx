import React, { useContext } from "react";
import { LocaleProvider } from "../locale/context/locale-context";
import Layout from "@components/site/Layout";
import ContactForm from "@components/site/ContactForm";

import type { NextPage, GetStaticProps } from "next";
import type { IPageProps } from "../interfaces/models";
import Article from "@components/site/ContentPage";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(LocaleProvider);
	return (
		<Layout>
			<Article
				title={translate("CONTACT_PAGE_TITLE")}
				subtitle={translate("CONTACT_PAGE_SUBTITLE")}
				abstract={translate("CONTACT_PAGE_TEXT1")}
			>
				<ContactForm
					className="form"
					title={translate("CONTACT_FORM_FORM_TITLE")}
					description={translate("CONTACT_FORM_FORM_SUBTITLE")}
					recaptchaSiteKey={recaptchaSiteKey}
				/>
			</Article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Contact;
