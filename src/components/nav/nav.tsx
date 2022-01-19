import { useRouter } from "next/router";
import NavButton from "./nav-button";
import { SITE_PAGES } from "../../consts";
import { SiteLocale } from "../../locales/pages";
import { classes } from "./nav.st.css";

export const Nav = (): JSX.Element => {
	const router = useRouter();
	const { locale, pathname } = router;
	const { pages } = SiteLocale;
	return (
		<nav className={classes.root}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{Object.values(SITE_PAGES).map((page) => (
						<li className={classes.listItem}>
							<NavButton
								label={pages[page][locale]}
								pageName={String(page)}
								isCurrent={pathname === page}
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
