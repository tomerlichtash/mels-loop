import React, { useContext } from "react";
import { Button } from "../ui";
import { ComponentProps, SitePage } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./nav.st.css";

export interface NavProps extends ComponentProps {
	sitePages: SitePage[];
}

// const isCurrentPage = (
// 	source: string,
// 	id: string,
// 	parent,
// 	pages: SitePage[]
// ): boolean => {
// 	if (parent) {
// 		const pageData = pages.filter((p) => p.id === parent)[0];
// 		if (pageData.children && pageData.children.includes(source)) {
// 			return id === source;
// 		}
// 		return parent === source;
// 	}
// 	return id === source;
// };

export const Nav = (props: NavProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, pageParent, pageId, pages, isCurrentPage } = layoutContext;
	const { sitePages, className } = props;
	return (
		<nav className={style(classes.root, className)}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					{sitePages.map((option) => {
						const isCurrent = isCurrentPage(
							option.id,
							pageId,
							pageParent,
							pages
						);
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
