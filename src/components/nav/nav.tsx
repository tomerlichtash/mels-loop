import React, { useContext } from "react";
import { Button } from "../ui";
import { ComponentProps, SitePage } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./nav.st.css";

export interface NavProps extends ComponentProps {
	sitePages: SitePage[];
	pageId: string;
}

export const Nav = (props: NavProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const { sitePages, pageId, className } = props;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{sitePages.map((option) => {
						const isCurrent = pageId === option.id;
						const { label, id, targetPathname } = option;
						return (
							option.menuNav && (
								<li
									className={style(classes.listItem, { isCurrent })}
									key={`page-${id}`}
								>
									<Button
										label={translate(label)}
										link={targetPathname}
										selected={isCurrent}
										className={classes.button}
									/>
								</li>
							)
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
