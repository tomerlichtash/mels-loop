import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { TextDirection } from "../../interfaces/locale-context";
import { st, classes } from "./footer.st.css";

export interface IFooterProps extends ComponentProps {
	textDirection: TextDirection;
}

export const Footer = ({
	textDirection,
	className,
}: IFooterProps): JSX.Element => {
	const { translate, siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	const licenseYears = `${new Date().getFullYear()}`;
	const fullLicense = `${translate("SITE_LICENSE_LABEL")}-${translate(
		"SITE_LICENSE_ATTRS"
	)}`;
	return (
		<footer className={st(classes.root, { textDirection }, className)}>
			<div className={classes.strip}></div>
			<div className={classes.pageContainer}>
				<div className={classes.layout}>
					<div className={st(classes.column, { size: 3 })}>
						<div className={classes.footerTitle}>
							<div className={classes.title}>
								<time className={classes.year}>{licenseYears}</time>{" "}
								<span
									title={fullLicense}
									arial-label={fullLicense}
									className={classes.license}
								>
									({translate("SITE_LICENSE_LABEL")})
								</span>{" "}
								<span className={classes.title}>{siteTitle}</span>
							</div>
							<div className={classes.subtitle}>
								<span>{siteSubtitle}</span>
							</div>
						</div>
						<p className={classes.excerpt}>
							{translate("MENU_ITEM_DESC_ID_ABOUT")}
						</p>
					</div>
					<div className={st(classes.column, { size: 1 })}>
						<div className={classes.columnTitle}>
							{translate("SECTION_LABEL_PAGES")}
						</div>
						<div className={classes.sitePages}>
							<ul className={classes.itemList}>
								<li className={classes.item}>
									<Button
										link="/about"
										label={translate("MENU_ITEM_LABEL_ID_ABOUT")}
										className={classes.button}
									/>
								</li>
								<li className={classes.item}>
									<Button
										link="/posts"
										label={translate("MENU_ITEM_LABEL_ID_BLOG")}
										className={classes.button}
									/>
								</li>
								<li className={st(classes.item)}>
									<Button
										label={translate("MENU_ITEM_LABEL_ID_CONTRIBUTE")}
										link={"/contribute"}
										className={classes.button}
									/>
								</li>
							</ul>
						</div>
					</div>
					<div className={st(classes.column, { size: 1 })}>
						<div className={classes.columnTitle}>
							{translate("SECTION_LABEL_LINKS")}
						</div>
						<ul className={classes.itemList}>
							<li className={st(classes.item)}>
								<Button
									link="https://github.com/tomerlichtash/mels-loop-nextjs"
									label={translate("MENU_ITEM_LABEL_ID_GITHUB")}
									className={classes.button}
									target="_blank"
								/>
							</li>
							<li className={st(classes.item)}>
								<Button
									link="https://twitter.com/aboutmelsloop"
									label={translate("MENU_ITEM_LABEL_ID_TWITTER")}
									className={classes.button}
									target="_blank"
								/>
							</li>
							<li className={st(classes.item)}>
								<Button
									label={translate("MENU_ITEM_LABEL_ID_CONTACT")}
									link={"/contact"}
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
