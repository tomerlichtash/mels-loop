import React, { useContext } from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./nav.st.css";

export const Nav = (props: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { pages, translate, isCurrentPage } = layoutContext;
	const { className } = props;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{pages.map((option) => {
						const isCurrent = isCurrentPage(option.id);
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
