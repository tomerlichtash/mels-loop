import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import type { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(ReactLocaleContext);
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
