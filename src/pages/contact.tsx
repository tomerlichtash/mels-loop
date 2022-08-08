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
					<h3>{translate("CONTACT_FORM_FORM_TITLE")}</h3>
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
	/**
	 * Yep, it's empty, but needed to force reading cookies and request
	 * headers on server-side so _document can read it
	 *
	 * See references:
	 * https://github.com/vercel/next.js/discussions/18235
	 * https://eric-schaefer.com/til/2022/02/05/next.js-unexpected-missing-ctx.req-in-_document/
	 */
	return { props: {} };
};

export default Contact;
