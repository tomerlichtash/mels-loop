import Link from "next/link";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { IOption } from "../dropdown/option";
import { classes } from "./header.st.css";
import { ILocaleRef } from "../../locales/types";

export interface HeaderProps {
	locale: ILocaleRef;
	pathname: string;
	isHome: boolean;
	siteTitle: string;
	siteSubtitle: string;
	sitePages: IOption[];
}

export const Header = (props: HeaderProps): JSX.Element => {
	const { locale, pathname, siteTitle, siteSubtitle, isHome, sitePages } =
		props;
	return (
		<header className={classes.root}>
			<LocaleSelector className={classes.localeSelector} locale={locale} />
			<div className={classes.container}>
				<div className={classes.title}>
					{isHome ? (
						<div className={classes.titleContainer}>
							<h1
								className={classes.siteTitle}
								title={`${siteTitle} - ${siteSubtitle}`}
								aria-label={`${siteTitle} - ${siteSubtitle}`}
							>
								{siteTitle}
							</h1>
							<span className={classes.siteSubtitle}>{siteSubtitle}</span>
						</div>
					) : (
						<div className={classes.titleContainer}>
							<h1 className={classes.siteTitle}>
								<Link href="/">
									<a
										title={`${siteTitle} - ${siteSubtitle}`}
										aria-label={`${siteTitle} - ${siteSubtitle}`}
									>
										{siteTitle}
									</a>
								</Link>
							</h1>
							<span className={classes.siteSubtitle}>{siteSubtitle}</span>
						</div>
					)}
				</div>
				<Nav
					sitePages={sitePages}
					className={classes.headerNav}
					locale={locale}
					pathname={pathname}
				/>
			</div>
		</header>
	);
};

export default Header;
