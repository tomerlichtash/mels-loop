import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import { ContactForm } from "../components/contact-form/contact-form";
import { classes } from "./page-base.st.css";

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(ReactLocaleContext);
	return (
		<Layout>
			<article className={classes.root}>
				<h1 className={classes.topic}>{translate("CONTACT_PAGE_TITLE")}</h1>
				<p className={classes.title}>{translate("CONTACT_PAGE_SUBTITLE")}</p>
				<div className={classes.section}>
					<p className={classes.paragraph}>{translate("CONTACT_PAGE_TEXT1")}</p>
					<h3 className={classes.sectionTitle}>
						{translate("CONTACT_FORM_FORM_TITLE")}
					</h3>
					<p className={classes.paragraph}>
						{translate("CONTACT_FORM_FORM_SUBTITLE")}
					</p>
					<ContactForm className={classes.form} translate={translate} />
				</div>
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Contact;
