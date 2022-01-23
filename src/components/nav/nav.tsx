import React from "react";
import NavButton from "./nav-button";
import DropDown from "../dropdown";
import { t } from "../../locales/translate";
import { style, classes } from "./nav.st.css";
import { SitePage } from "../../interfaces/models";
import { ILocaleRef } from "../../locales/types";
import { NAV_LOCALE } from "../../locales/components";
import { IOption } from "../dropdown/option";
export interface NavProps {
	sitePages: SitePage[];
	locale: ILocaleRef;
	pathname: string;
	className?: string;
}

export const Nav = (props: NavProps): JSX.Element => {
	const { sitePages, locale, pathname, className } = props;
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
				options={
					sitePages.map((p) => {
						return {
							label: p.label,
							locale: locale,
							targetPathname: p.targetPathname,
						};
					}) as IOption[]
				}
				openLabel={NAV_LOCALE.openLabel}
				closeLabel={NAV_LOCALE.closeLabel}
				className={classes.mobileNav}
			/>
		</nav>
	);
};

export default Nav;
