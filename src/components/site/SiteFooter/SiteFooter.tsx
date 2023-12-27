import React, { useContext } from "react";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { Button, Link } from "@components/ui";
import styles from "./SiteFooter.module.scss";
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../../../consts";

export const SiteFooter = (): JSX.Element => {
	const { translate, siteTitle, siteSubtitle } = useContext(LocaleProvider);
	const licenseYears = `${new Date().getFullYear()}`;
	const fullLicense = `${translate("SITE_LICENSE_LABEL")}-${translate(
		"SITE_LICENSE_ATTRS"
	)}`;
	return (
		<footer className={styles.root}>
			<div className={styles.strip}></div>
			<div className={styles.pageContainer}>
				<div className={styles.layout}>
					<div className={styles.column}>
						<div className="footer-title">
							<div
								className={styles.title}
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
									<Button asChild className={styles.link}>
										<Link href="/about">
											{translate("MENU_ITEM_LABEL_ID_ABOUT")}
										</Link>
									</Button>
								</li>
								<li className="item">
									<Button asChild className={styles.link}>
										<Link href="/posts">
											{translate("MENU_ITEM_LABEL_ID_BLOG")}
										</Link>
									</Button>
								</li>
								<li className="item">
									<Button asChild className={styles.link}>
										<Link href="/contribute">
											{translate("MENU_ITEM_LABEL_ID_CONTRIBUTE")}
										</Link>
									</Button>
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
									className={styles.link}
									href={PUBLIC_PROJECT_GITHUB_ADDRESS}
									target="_blank"
								>
									{translate("MENU_ITEM_LABEL_ID_GITHUB")}
								</Button>
							</li>
							<li className="item">
								<Button
									className={styles.link}
									href="https://twitter.com/aboutmelsloop"
									target="_blank"
								>
									{translate("MENU_ITEM_LABEL_ID_TWITTER")}
								</Button>
							</li>
							<li className="item">
								<Button className={styles.link} href="/contact">
									{translate("MENU_ITEM_LABEL_ID_CONTACT")}
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default SiteFooter;
