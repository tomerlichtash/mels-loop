import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";
import PageSEO from "../components/page-seo";
import { classes } from "./page-base.st.css";

const Contact: NextPage<IPageProps> = () => {
	const { translate } = useContext(ReactLocaleContext);
	return (
		<Layout>
			<PageSEO />
			<article className={classes.root}>
				<h1 className={classes.heading3}>{translate("CONTACT_PAGE_TITLE")}</h1>
				<h2 className={classes.title}>{translate("CONTACT_PAGE_SUBTITLE")}</h2>
				<p className={classes.paragraph}>{translate("CONTACT_PAGE_TEXT1")}</p>
				<div className={classes.section}>
					<h3 className={classes.heading3}>
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

export default Contact;
