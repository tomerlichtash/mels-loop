import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { TextDirection } from "../../interfaces/locale-context";
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../../consts";
import styles from "./footer.module.scss";

export interface IFooterProps extends ComponentProps {
	textDirection: TextDirection;
}

export const Footer = ({ textDirection }: IFooterProps): JSX.Element => {
	const { translate, siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	const licenseYears = `${new Date().getFullYear()}`;
	const fullLicense = `${translate("SITE_LICENSE_LABEL")}-${translate(
		"SITE_LICENSE_ATTRS"
	)}`;
	return (
		<footer className={styles.footer} data-text-direction={textDirection}>
			<div className="strip"></div>
			<h1>test</h1>
			<div className="page-container">
				<div className="layout">
					<div className="column">
						<div className="footer-title">
							<div
								className="title"
								aria-label={`${licenseYears} ${fullLicense} ${siteTitle}`}
							>
								<time className="year">{licenseYears}</time>{" "}
								<span title={fullLicense} className="license">
									({translate("SITE_LICENSE_LABEL")})
								</span>{" "}
								<span className="title">{siteTitle}</span>
							</div>
							<div className="subtitle">
								<span>{siteSubtitle}</span>
							</div>
						</div>
						<p className="excerpt">{translate("MENU_ITEM_DESC_ID_ABOUT")}</p>
					</div>
					<div className="column">
						<div className="column-title">
							{translate("SECTION_LABEL_PAGES")}
						</div>
						<div className="site-pages">
							<ul className="list">
								<li className="item">
									<Button
										link="/about"
										label={translate("MENU_ITEM_LABEL_ID_ABOUT")}
										className="button"
									/>
								</li>
								<li className="item">
									<Button
										link="/posts"
										label={translate("MENU_ITEM_LABEL_ID_BLOG")}
										className="button"
									/>
								</li>
								<li className="item">
									<Button
										label={translate("MENU_ITEM_LABEL_ID_CONTRIBUTE")}
										link={"/contribute"}
										className="button"
									/>
								</li>
							</ul>
						</div>
					</div>
					<div className="column">
						<div className="column-title">
							{translate("SECTION_LABEL_LINKS")}
						</div>
						<ul className="list">
							<li className="item">
								<Button
									link={PUBLIC_PROJECT_GITHUB_ADDRESS}
									label={translate("MENU_ITEM_LABEL_ID_GITHUB")}
									className="button"
									target="_blank"
								/>
							</li>
							<li className="item">
								<Button
									link="https://twitter.com/aboutmelsloop"
									label={translate("MENU_ITEM_LABEL_ID_TWITTER")}
									className="button"
									target="_blank"
								/>
							</li>
							<li className="item">
								<Button
									label={translate("MENU_ITEM_LABEL_ID_CONTACT")}
									link={"/contact"}
									className="button"
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
