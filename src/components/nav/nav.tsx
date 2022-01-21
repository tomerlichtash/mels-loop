import React, { useState } from "react";
import { useRouter } from "next/router";
import NavButton from "./nav-button";
import DropDown from "../dropdown";
import { sitePagesOptions } from "../../consts";
import { SITE_LOCALE } from "../../locales/pages";
import { style, classes } from "./nav.st.css";

export const Nav = ({ className }: { className?: string }): JSX.Element => {
	const [showMobileNav, setMobileNavVisibility] = useState(false);
	const router = useRouter();
	const { locale, pathname } = router;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{sitePagesOptions.map((option) => (
						<li
							className={style(classes.listItem, {
								isCurrent: pathname === option.targetPathname,
							})}
							key={`page-${option.id}`}
						>
							<NavButton
								label={SITE_LOCALE.PAGES[option.id][locale]}
								pageName={option.targetPathname}
								isCurrent={pathname === option.targetPathname}
								className={classes.button}
							/>
						</li>
					))}
				</ul>
			</div>
			<DropDown
				options={sitePagesOptions}
				openLabel="Menu"
				closeLabel="Close"
				className={classes.mobileNav}
			/>
		</nav>
	);
};

export default Nav;
