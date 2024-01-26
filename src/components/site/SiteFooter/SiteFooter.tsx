import React, { useContext } from "react";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { Button, Link } from "@components/ui";
import { Strip } from "@components/site";
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../../../consts";
import classNames from "classnames";
import styles from "./SiteFooter.module.scss";

export const SiteFooter = (): JSX.Element => {
	const { translate, siteTitle, siteSubtitle } = useContext(LocaleProvider);
	const licenseYears = `${new Date().getFullYear()}`;
	const fullLicense = `${translate("site.license.label")}-${translate(
		"site.license.attributs"
	)}`;
	return (
		<footer className={styles.root}>
			<Strip />
			<div className={styles.pageContainer}>
				<div className={styles.layout}>
					<div className={classNames(styles.column, styles.large)}>
						<div className="footer-title">
							<div
								className={styles.title}
								aria-label={`2021-${licenseYears} ${fullLicense} ${siteTitle}`}
								title={`2021-${licenseYears} ${fullLicense} ${siteTitle}`}
							>
								<time className="year">2021-{licenseYears}</time>{" "}
								<span className="license">
									({translate("site.license.label")})
								</span>{" "}
								<span className="title">{siteTitle}</span>
							</div>
							<div className="subtitle">
								<span>{siteSubtitle}</span>
							</div>
						</div>
						<div className={styles.excerpt}>
							<p>{translate("MENU_ITEM_DESC_ID_ABOUT")}</p>
						</div>
					</div>

					<div className={styles.column}>
						<div className="column-title">
							{translate("SECTION_LABEL_PAGES")}
						</div>
						<div className="site-pages">
							<ul className={styles.list}>
								<li className={styles.item}>
									<Button className={styles.link} asChild>
										<Link href="/about">
											{translate("MENU_ITEM_LABEL_ID_ABOUT")}
										</Link>
									</Button>
								</li>
								<li className={styles.item}>
									<Button className={styles.link} asChild>
										<Link href="/posts">
											{translate("MENU_ITEM_LABEL_ID_BLOG")}
										</Link>
									</Button>
								</li>
								<li className={styles.item}>
									<Button className={styles.link} asChild>
										<Link href="/contribute">
											{translate("MENU_ITEM_LABEL_ID_CONTRIBUTE")}
										</Link>
									</Button>
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.column}>
						<div className="column-title">
							{translate("SECTION_LABEL_LINKS")}
						</div>
						<ul className={styles.list}>
							<li className={styles.item}>
								<Button className={styles.link} asChild>
									<Link href={PUBLIC_PROJECT_GITHUB_ADDRESS} target="_blank">
										{translate("MENU_ITEM_LABEL_ID_GITHUB")}
									</Link>
								</Button>
							</li>
							<li className={styles.item}>
								<Button className={styles.link} asChild>
									<Link
										href="https://twitter.com/aboutmelsloop"
										target="_blank"
									>
										{translate("MENU_ITEM_LABEL_ID_TWITTER")}
									</Link>
								</Button>
							</li>
							<li className={styles.item}>
								<Button className={styles.link} asChild>
									<Link href="/contact">
										{translate("MENU_ITEM_LABEL_ID_CONTACT")}
									</Link>
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
