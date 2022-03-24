import React, { useContext } from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { st, classes } from "./nav.st.css";

export const Nav = ({ className }: ComponentProps): JSX.Element => {
	const {
		getPageRefs,
		getPagePath,
		getPageName,
		isCurrentPage,
		isPageVisible,
	} = useContext(ReactLayoutContext);
	return (
		<nav className={st(classes.root, className)}>
			<ul className={classes.list}>
				{getPageRefs().map((page) => {
					const { id } = page;
					const isCurrent = isCurrentPage(id);
					if (!isPageVisible(id)) return;
					return (
						<li
							className={st(classes.listItem, { isCurrent })}
							key={`nav-item-${id}`}
						>
							<Button
								label={getPageName(id)}
								link={getPagePath(id)}
								selected={isCurrent}
								className={classes.button}
							/>
							<div className={st(classes.marker, { isCurrent })}></div>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
