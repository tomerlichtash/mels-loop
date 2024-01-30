import React, { useContext } from "react";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { Link, Strip } from "@components/ui";
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../../../consts";
import classNames from "classnames";
import styles from "./SiteFooter.module.scss";

const footerData = {
	license: "",
};
const footerPages = [
	{
		label: "SECTION_LABEL_PAGES",
		items: [
			{
				type: "link",
				href: "/about",
				label: "MENU_ITEM_LABEL_ID_ABOUT",
			},
			{
				type: "link",
				href: "/blog",
				label: "MENU_ITEM_LABEL_ID_BLOG",
			},
			{
				type: "link",
				href: "/contribute",
				label: "MENU_ITEM_LABEL_ID_CONTRIBUTE",
			},
		],
	},
];

const footerLinks = [
	{
		label: "SECTION_LABEL_LINKS",
		items: [
			{
				type: "link",
				href: PUBLIC_PROJECT_GITHUB_ADDRESS,
				target: "_blank",
				label: "MENU_ITEM_LABEL_ID_GITHUB",
			},
			{
				type: "link",
				href: "https://twitter.com/aboutmelsloop",
				target: "_blank",
				label: "MENU_ITEM_LABEL_ID_TWITTER",
			},
			{
				type: "link",
				href: "/contact",
				target: "_blank",
				label: "MENU_ITEM_LABEL_ID_CONTACT",
			},
		],
	},
];
type FooterProps = {
	title: string;
	subtitle: string;
};
export const SiteFooter = ({ title, subtitle }: FooterProps): JSX.Element => {
	const { translate } = useContext(LocaleProvider);
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
						<div
							className={styles.title}
							aria-label={`2021-${licenseYears} ${fullLicense} ${title}`}
							title={`2021-${licenseYears} ${fullLicense} ${title}`}
						>
							<time className="year">2021-{licenseYears}</time>
							<span className="license">
								({translate("site.license.label")})
							</span>
							<span className="title">{title}</span>
						</div>

						<span>{subtitle}</span>

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
									<Link href="/about" className={styles.link}>
										{translate("MENU_ITEM_LABEL_ID_ABOUT")}
									</Link>
								</li>
								<li className={styles.item}>
									<Link href="/posts" className={styles.link}>
										{translate("MENU_ITEM_LABEL_ID_BLOG")}
									</Link>
								</li>
								<li className={styles.item}>
									<Link href="/contribute" className={styles.link}>
										{translate("MENU_ITEM_LABEL_ID_CONTRIBUTE")}
									</Link>
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
								<Link
									href={PUBLIC_PROJECT_GITHUB_ADDRESS}
									target="_blank"
									className={styles.link}
								>
									{translate("MENU_ITEM_LABEL_ID_GITHUB")}
								</Link>
							</li>
							<li className={styles.item}>
								<Link
									href="https://twitter.com/aboutmelsloop"
									target="_blank"
									className={styles.link}
								>
									{translate("MENU_ITEM_LABEL_ID_TWITTER")}
								</Link>
							</li>
							<li className={styles.item}>
								<Link href="/contact" className={styles.link}>
									{translate("MENU_ITEM_LABEL_ID_CONTACT")}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default SiteFooter;
