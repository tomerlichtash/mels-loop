import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import ContactForm from "../components/contact-form";
import { st, classes } from "./static-page.st.css";
// import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ReactThemeContext } from "../contexts/theme-context";

const Contact: NextPage<IPageProps> = () => {
	const {
		translate,
		locale,
		textDirection,
		siteTitle,
		siteSubtitle,
		pageName,
	} = useContext(ReactLocaleContext);

	const { theme } = useContext(ReactThemeContext);

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
					<ContactForm
						className={classes.contactForm}
						translate={translate}
						locale={locale}
						theme={theme}
					/>
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
								{translate("CONTACT_PAGE_BY_TWITTER_TEXT")}
							</p>
							{/* <TwitterLogoIcon /> */}
						</li>
						<li>
							<p className={classes.paragraph}>
								{/* {translate("CONTACT_PAGE_BY_GITHUB_TEXT")} */}
								Found a problem? Open an issue.
							</p>
							{/* <GitHubLogoIcon /> */}
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
