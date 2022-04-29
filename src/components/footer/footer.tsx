import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import {
	// InfoCircledIcon,
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./footer.st.css";

export const Footer = ({ className }: ComponentProps): JSX.Element => {
	const { translate, siteTitle, siteSubtitle, siteLicense } =
		useContext(ReactLocaleContext);
	const licenseYears = `${new Date().getFullYear()}`;
	return (
		<footer className={st(classes.root, className)}>
			<div className={classes.strip}></div>
			<div className={classes.pageContainer}>
				<div className={classes.layout}>
					<div className={st(classes.column, { size: 3 })}>
						<div className={classes.footerTitle}>
							<div className={classes.title}>
								<time className={classes.year}>{licenseYears}</time>{" "}
								<span
									title={siteLicense}
									arial-label={siteLicense}
									className={classes.license}
								>
									({siteLicense})
								</span>{" "}
								<span className={classes.title}>{siteTitle}</span>
							</div>
							<div className={classes.subtitle}>
								<span>{siteSubtitle}</span>
							</div>
						</div>
						<p className={classes.excerpt}>
							{translate("FOOTER_META_SHORT_DESCRIPTION")}
						</p>
					</div>
					<div className={classes.section}>
						<div className={st(classes.column, { size: 1 })}>
							<div className={classes.sitePages}>
								<ul>
									<li>
										{/* <InfoCircledIcon /> */}
										<Button
											link="/about"
											label={translate("FOOTER_LINK_ABOUT")}
										/>
									</li>
									<li>
										<Button
											link="/posts"
											label={translate("FOOTER_LINK_BLOG")}
										/>
									</li>
								</ul>
							</div>
						</div>
						<div className={st(classes.column, { size: 1 })}>
							<ul className={classes.social}>
								<li className={st(classes.item, { icon: "github" })}>
									<GitHubLogoIcon />
									<Button
										target="_blank"
										link="https://github.com/tomerlichtash/mels-loop-nextjs"
										label={translate("FOOTER_LINK_GITHUB")}
										className={classes.button}
									/>
								</li>
								<li className={st(classes.item, { icon: "twitter" })}>
									<TwitterLogoIcon scale={230} />
									<Button
										target="_blank"
										link="https://twitter.com/aboutmelsloop"
										label={translate("FOOTER_LINK_TWITTER")}
									/>
								</li>
								<li className={st(classes.item, { icon: "contact" })}>
									<EnvelopeClosedIcon />
									<Button
										link="/contact"
										label={translate("FOOTER_LINK_CONTACT")}
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
