import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { st, classes } from "./page-base.st.css";
import Link from "next/link";
import { Button } from "../components/ui";
// import { st, classes } from "./contact.st.css";

const Contact: NextPage<IPageProps> = () => {
	const { translate, siteTitle, siteSubtitle, pageName } =
		useContext(ReactLocaleContext);

	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {siteSubtitle} - {pageName}
				</title>
			</Head>
			<article className={classes.root}>
				<h1 className={classes.heading3}>{translate("CONTACT_PAGE_TITLE")}</h1>

				<h2 className={classes.title}>
					We’d love to hear from you about anything and everything
				</h2>
				<p className={classes.paragraph}>
					Use this contact form to deliver your message straight to us, and we
					will get back to you shortly via email. We haven’t missed a single
					message yet!
					{/* Or maybe the answer to your question is on our FAQ and
					useful information Page. */}
				</p>

				<div className={classes.section}>
					<h3 className={classes.heading3}>Contact Form</h3>
					<p className={classes.paragraph}>
						Please fill in this form and we will get back to you regarding any
						issue. Alternately, you can e-mail us at{" "}
						<code className={classes.code}>
							<strong>aboutmelsloop</strong>[at]<strong>gmail</strong>[dot]
							<strong>com</strong>
						</code>
						, or message us over Twitter at{" "}
						<Button
							link="https://twitter.com/aboutmelsoop"
							target="_blank"
							className={classes.button}
						>
							@aboutmelsloop
						</Button>
					</p>
					<ContactForm className={classes.form} translate={translate} />
				</div>

				<p className={classes.paragraph}>
					Found a bug? A typo? A problem? Please <GitHubLogoIcon />
					<a href="#">open an issue on Github</a>.
				</p>
			</article>
		</Layout>
	);
};

export default Contact;
