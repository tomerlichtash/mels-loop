import Link from "next/link";
import { style, classes } from "./nav.st.css";
import { useRouter } from "next/router";

import { SiteLocale } from "../../locales/pages";

export const Nav = (): JSX.Element => {
	const router = useRouter();
	const { locale, pathname } = router;
	const { pages } = SiteLocale;
	return (
		<nav className={classes.root}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					<li>
						<Link href="/">
							<a
								className={style(classes.button, {
									current: pathname === "/",
								})}
							>
								{pages["/"][locale]}
							</a>
						</Link>
						<Link href="/about">
							<a
								className={style(classes.button, {
									current: pathname === "/about",
								})}
							>
								{pages["about"][locale]}
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
