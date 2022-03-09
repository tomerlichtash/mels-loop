import React, { useState, useContext } from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./nav.st.css";
import { getDisplayName } from "next/dist/shared/lib/utils";

export const Nav = ({ className }: ComponentProps): JSX.Element => {
	const {
		getPageRefs,
		getPagePath,
		getPageName,
		isCurrentPage,
		isPageVisible,
	} = useContext(ReactLayoutContext);
	const [marker, setMarker] = useState("");
	return (
		<nav className={style(classes.root, className)}>
			<div className={style(classes.menu, { marker })}>
				{/* <div className={classes.markerStrip}></div> */}
				<ul className={classes.list}>
					{getPageRefs().map((page) => {
						const { id } = page;
						const isCurrent = isCurrentPage(id);
						if (!isPageVisible(id)) return;
						return (
							<li
								className={style(classes.listItem, { isCurrent, marker })}
								key={`nav-item-${id}`}
								onMouseOver={() => setMarker(id)}
							>
								{/* <span className={classes.markerPointer}></span> */}
								<Button
									label={getPageName(id)}
									link={getPagePath(id)}
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
