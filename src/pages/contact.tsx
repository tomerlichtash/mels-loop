import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";
import { st, classes } from "./static-page.st.css";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const Contact: NextPage<IPageProps> = () => {
	const { translate, siteTitle, siteSubtitle, pageName, textDirection } =
		useContext(ReactLocaleContext);
	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {siteSubtitle} - {pageName}
				</title>
			</Head>
			<article className={st(classes.root, { textDirection })}>
				<h1 className={st(classes.heading, { type: "h1" })}>
					{translate("CONTACT_PAGE_TITLE")}
				</h1>
				<div className={classes.section}>
					{/* <h2 className={st(classes.heading, { type: "h2" })}>
						{translate("CONTACT_BY_FORM")}
					</h2> */}
					<ContactForm className={classes.contactForm} />
				</div>
				<div className={classes.section}>
					{/* <h2 className={st(classes.heading, { type: "h2" })}>
						{translate("CONTACT_BY_MAIL_LABEL")}
					</h2> */}
					<ul>
						<li>
							<p className={classes.paragraph}>
								{translate("CONTACT_BY_MAIL_TEXT")}
							</p>
						</li>
						<li>
							<p className={classes.paragraph}>
								{translate("CONTACT_BY_TWITTER_TEXT")}
							</p>
							<TwitterLogoIcon />
						</li>
						<li>
							<p className={classes.paragraph}>
								{translate("CONTACT_BY_GITHUB_TEXT")}
							</p>
							<GitHubLogoIcon />
						</li>
					</ul>
				</div>
				{/* <div className={classes.section}>
					<h2 className={st(classes.heading, { type: "h2" })}>
						{translate("CONTACT_BY_TWITTER_LABEL")}
					</h2>
				</div>
				<div className={classes.section}>
					<h2 className={st(classes.heading, { type: "h2" })}>
						{translate("CONTACT_BY_GITHUB_LABEL")}
					</h2>
				</div> */}
			</article>
		</Layout>
	);
};

export default Contact;
