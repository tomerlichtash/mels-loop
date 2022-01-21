import React from "react";
import { useRouter } from "next/router";
import NavButton from "./nav-button";
import DropDown from "../dropdown";
import { IOption } from "../../interfaces/models";
import { t } from "../../locales/translate";
import { style, classes } from "./nav.st.css";

export const Nav = ({
	sitePages,
	className,
}: {
	sitePages: IOption[];
	className?: string;
}): JSX.Element => {
	const router = useRouter();
	const { locale, pathname } = router;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{sitePages.map((option) => (
						<li
							className={style(classes.listItem, {
								isCurrent: pathname === option.targetPathname,
							})}
							key={`page-${option.id}`}
						>
							<NavButton
								label={t(option.label, locale)}
								pageName={option.targetPathname}
								isCurrent={pathname === option.targetPathname}
								className={classes.button}
							/>
						</li>
					))}
				</ul>
			</div>
			<DropDown
				options={sitePages}
				openLabel="MOBILE_MENU_OPEN_LABEL"
				closeLabel="MOBILE_MENU_CLOSE_LABEL"
				className={classes.mobileNav}
			/>
		</nav>
	);
};

export default Nav;
