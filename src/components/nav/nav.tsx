import { useRouter } from "next/router";
import NavButton from "./nav-button";
import { SITE_PAGES } from "../../consts";
import { SITE_LOCALE } from "../../locales/pages";
import { classes } from "./nav.st.css";

const getPageId = (key: string) => SITE_PAGES[key].pageId;
const getPagePath = (key: string) => SITE_PAGES[key].pathname;
const getPageLabel = (key: string, locale: string) => {
	const { pages } = SITE_LOCALE;
	return pages[SITE_PAGES[key].pageId][locale];
};

export const Nav = (): JSX.Element => {
	const router = useRouter();
	const { locale, pathname } = router;
	return (
		<nav className={classes.root}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{Object.keys(SITE_PAGES).map((pageKey) => (
						<li className={classes.listItem} key={`page-${getPageId(pageKey)}`}>
							<NavButton
								label={getPageLabel(pageKey, locale)}
								pageName={getPagePath(pageKey)}
								isCurrent={pathname === getPagePath(pageKey)}
								className={classes.button}
							/>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
