import { useRouter } from "next/router";
import NavButton from "./nav-button";
import { SITE_PAGES } from "../../consts";
import { SITE_LOCALE } from "../../locales/pages";
import { style, classes } from "./nav.st.css";

const getPageId = (key: string): string => SITE_PAGES[key].pageId;
const getPagePath = (key: string): string => SITE_PAGES[key].pathname;
const getPageLabel = (key: string, locale: string): string => {
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
						<li
							className={style(classes.listItem, {
								isCurrent: pathname === getPagePath(pageKey),
							})}
							key={`page-${getPageId(pageKey)}`}
						>
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
