import React, { useContext } from "react";
// import { Button } from "../ui";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ComponentProps } from "../../interfaces/models";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { st, classes } from "./nav.st.css";
import NavigationMenuDemo from "./menu";

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
			{/* <NavigationMenuDemo /> */}

			{/* <NavigationMenu.Root>
				<NavigationMenu.List>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger />
						<NavigationMenu.Content>
							<NavigationMenu.Link />
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Link />
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger />
						<NavigationMenu.Content>
							<NavigationMenu.Sub>
								<NavigationMenu.List />
								<NavigationMenu.Viewport />
							</NavigationMenu.Sub>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Indicator />
				</NavigationMenu.List>

				<NavigationMenu.Viewport />
			</NavigationMenu.Root> */}

			{/* <ul className={classes.list}>
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
			</ul> */}
		</nav>
	);
};

export default Nav;
