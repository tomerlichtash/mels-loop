import React, { useContext } from "react";
import Layout from "../components/site/Layout/Layout";
import { GetStaticProps, NextPage } from "next";
import type { IPageProps } from "../interfaces/models";
import { LocaleProvider } from "../locale/context/locale-context";
import ContactForm from "../components/site/ContactForm";

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(LocaleProvider);
	return (
		<Layout>
			<article className="page">
				<h1 className="topic">{translate("CONTACT_PAGE_TITLE")}</h1>
				<p className="title">{translate("CONTACT_PAGE_SUBTITLE")}</p>
				<div className="section">
					<p className="paragraph">{translate("CONTACT_PAGE_TEXT1")}</p>
					<h3 className="section-title">
						{translate("CONTACT_FORM_FORM_TITLE")}
					</h3>
					<p className="paragraph">{translate("CONTACT_FORM_FORM_SUBTITLE")}</p>
					<ContactForm className="form" translate={translate} />
				</div>
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Contact;
