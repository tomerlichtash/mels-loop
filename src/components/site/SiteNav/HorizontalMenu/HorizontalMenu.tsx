import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { mlUtils } from "../../../../lib/ml-utils";
import ListItem from "../NavListItem";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./HorizontalMenu.module.scss";

const HorizontalMenu = ({ items: sections }) => {
	return (
		<NavigationMenu.Root className={styles.NavigationMenuRoot}>
			<NavigationMenu.List className={styles.NavigationMenuList}>
				{sections.map((section) => (
					<NavigationMenu.Item key={section.id}>
						<NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
							{section.locale.title}
							<ChevronDownIcon className={styles.CaretDown} />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={styles.NavigationMenuContent}>
							<ul data-list-grid-size="1" className={styles.List}>
								{section.items.map((item) => (
									<NavigationMenu.Link asChild key={mlUtils.uniqueId()}>
										<ListItem
											key={mlUtils.uniqueId()}
											className={styles.listItem}
											{...item}
										/>
									</NavigationMenu.Link>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				))}
				<NavigationMenu.Indicator className={styles.NavigationMenuIndicator}>
					<div className={styles.arrow}></div>
				</NavigationMenu.Indicator>
			</NavigationMenu.List>
			<div className={styles.ViewportPosition}>
				<NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
			</div>
		</NavigationMenu.Root>
	);
};

export default HorizontalMenu;
