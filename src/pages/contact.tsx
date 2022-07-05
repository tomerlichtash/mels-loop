import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";
import { classes } from "./page-base.st.css";
import { Button } from "../components/ui";

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
					We’d love to hear from you about anything and everything!
				</h2>
				<p className={classes.paragraph}>
					As our community of developers and hackers is growing we'd love to
					hear your thoguhts, ideas, recommendations and feedbacks. Use this
					contact form to deliver your message directly to us, and we will get
					back to you shortly via e-mail.
				</p>

				<div className={classes.section}>
					<h3 className={classes.heading3}>Contact Form</h3>
					<p className={classes.paragraph}>
						Please fill in this form and we will get back to you regarding any
						issue.
						{/* You're also welcome to e-mail us at{" "}
						<code className={classes.scrambleEmailAddress}>
							<em>about&#64;melsloop.com</em>
						</code>{" "}
						or{" "}
						<Button
							link="https://twitter.com/aboutmelsoop"
							target="_blank"
							className={classes.button}
						>
							message us on Twitter
						</Button>
						. */}
					</p>
					<ContactForm className={classes.form} translate={translate} />
				</div>

				{/* <p className={classes.paragraph}>
					Found a bug? A typo? Want to report a problem? You're most invited to
					participate now and <a href="#">open an issue on Github</a>.
				</p> */}
			</article>
		</Layout>
	);
};

export default Contact;
