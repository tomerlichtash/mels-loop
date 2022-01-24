import React from "react";
import NavButton from "./nav-button";
import DropDown from "../dropdown";
import { style, classes } from "./nav.st.css";
import { ComponentProps, SitePage } from "../../interfaces/models";
import { NAV_MENU_DROPDOWN_LOCALE } from "../../locales/components";
import { IOption } from "../dropdown/option";

export interface NavProps extends ComponentProps {
	sitePages: SitePage[];
	pathname: string;
	translate: (key: string) => string;
}

export const Nav = (props: NavProps): JSX.Element => {
	const { sitePages, locale, translate, pathname, className } = props;
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
								label={translate(option.label)}
								pageName={option.targetPathname}
								isCurrent={pathname === option.targetPathname}
								className={classes.button}
							/>
						</li>
					))}
				</ul>
			</div>
			<DropDown
				options={
					sitePages.map((p) => {
						return {
							label: p.label,
							locale: locale,
							targetPathname: p.targetPathname,
						};
					}) as IOption[]
				}
				compKeys={NAV_MENU_DROPDOWN_LOCALE}
				translate={translate}
				className={classes.mobileNav}
			/>
		</nav>
	);
};

export default Nav;
