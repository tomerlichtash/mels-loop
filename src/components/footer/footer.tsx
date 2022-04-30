import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { TextDirection } from "../../interfaces/locale-context";
import { st, classes } from "./footer.st.css";

export interface IFooterProps extends ComponentProps {
	direction: TextDirection;
}

export const Footer = ({ direction, className }: IFooterProps): JSX.Element => {
	const { translate, siteTitle, siteSubtitle, siteLicense } =
		useContext(ReactLocaleContext);
	const licenseYears = `${new Date().getFullYear()}`;
	return (
		<footer className={st(classes.root, { direction }, className)}>
			<div className={classes.strip}></div>
			<div className={classes.pageContainer}>
				<div className={classes.layout}>
					<div className={st(classes.column, { size: 3 })}>
						<div className={classes.footerTitle}>
							<div className={classes.title}>
								<time className={classes.year}>{licenseYears}</time>{" "}
								<span
									title={translate("FOOTER_FULL_LICENSE")}
									arial-label={translate("FOOTER_FULL_LICENSE")}
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
					<div className={st(classes.column, { size: 1 })}>
						<div className={classes.columnTitle}>
							{translate("FOOTER_COLUMN_TITLE_PAGES")}
						</div>
						<div className={classes.sitePages}>
							<ul className={classes.itemList}>
								<li className={classes.item}>
									<Button
										link="/about"
										label={translate("FOOTER_LINK_ABOUT")}
										className={classes.button}
									/>
								</li>
								<li className={classes.item}>
									<Button
										link="/posts"
										label={translate("FOOTER_LINK_BLOG")}
										className={classes.button}
									/>
								</li>
							</ul>
						</div>
					</div>
					<div className={st(classes.column, { size: 1 })}>
						<div className={classes.columnTitle}>
							{translate("FOOTER_COLUMN_TITLE_LINKS")}
						</div>
						<ul className={classes.itemList}>
							<li className={st(classes.item, { icon: "github" })}>
								<Button
									target="_blank"
									icon={<GitHubLogoIcon />}
									link="https://github.com/tomerlichtash/mels-loop-nextjs"
									label={translate("FOOTER_LINK_GITHUB")}
									className={classes.button}
								/>
							</li>
							<li className={st(classes.item, { icon: "twitter" })}>
								<Button
									icon={<TwitterLogoIcon scale={230} />}
									target="_blank"
									link="https://twitter.com/aboutmelsloop"
									label={translate("FOOTER_LINK_TWITTER")}
									className={classes.button}
								/>
							</li>
							<li className={st(classes.item, { icon: "contact" })}>
								<Button
									icon={<EnvelopeClosedIcon />}
									link="/contact"
									label={translate("FOOTER_LINK_CONTACT")}
									className={classes.button}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
