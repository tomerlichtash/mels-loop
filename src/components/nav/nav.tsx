import React, { useContext } from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./nav.st.css";

export const Nav = ({ className }: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { pages, getPageName, isCurrentPage } = layoutContext;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{pages.map((page) => {
						const { id, targetPathname } = page;
						const isCurrent = isCurrentPage(id);
						if (!page.menuNav) {
							return;
						}
						return (
							<li
								className={style(classes.listItem, { isCurrent })}
								key={`nav-page-${id}`}
							>
								<Button
									label={getPageName(id)}
									link={targetPathname}
									selected={isCurrent}
									className={classes.button}
								/>
							</li>
						);
					})}
				</ul>
			</div>

			{/* <DropDown
				options={
					sitePages.map((page) => {
						const { label, targetPathname } = page;
						return { label, targetPathname };
					}) as IOption[]
				}
				triggerCallback={() => false}
				optionListVisible={false}
				className={classes.mobileNav}
				openLabel={"someOpenLabel"}
				closeLabel={"someCloseLabel"}
			/> */}
		</nav>
	);
};

export default Nav;
