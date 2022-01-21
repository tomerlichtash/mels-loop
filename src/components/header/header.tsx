import Link from "next/link";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { SITE_PAGES } from "../../consts";
import { SITE_LOCALE } from "../../locales/pages";
import { classes } from "./header.st.css";

export const Header = ({
	isHome,
	name,
}: {
	isHome: boolean;
	name: string;
}): JSX.Element => {
	return (
		<header className={classes.root}>
			<div className={classes.container}>
				<div className={classes.title}>
					{isHome ? (
						<h1 className={classes.siteTitle} title={name} aria-label={name}>
							{name}
						</h1>
					) : (
						<h1 className={classes.siteTitle}>
							<Link href="/">
								<a title={name} aria-label={name}>
									{name}
								</a>
							</Link>
						</h1>
					)}
				</div>
				<Nav className={classes.headerNav} />
				<LocaleSelector className={classes.localeSelector} />
			</div>
		</header>
	);
};

export default Header;
