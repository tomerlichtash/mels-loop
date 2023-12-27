import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import ListItem from "../NavListItem";
import { mlUtils } from "lib/ml-utils";
import classNames from "classnames";
import styles from "./HorizontalMenu.module.scss";

type HorizontalMenuProps = {
	items: Record<any, any>[];
	className?: string;
};

const HorizontalMenu = ({ items, className }: HorizontalMenuProps) => {
	return (
		<NavigationMenu.Root className={classNames(styles.root, className)}>
			<NavigationMenu.List className={styles.list}>
				{items.map((item) => (
					<NavigationMenu.Item key={item.id}>
						<NavigationMenu.Trigger className={styles.trigger}>
							{item.locale.title}
							<CaretDownIcon className={styles.caretDown} />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={styles.content}>
							<ul data-list-grid-size="1" className="list one">
								{item.items.map((item) => (
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
				<NavigationMenu.Indicator className={styles.indicator}>
					<div className={styles.arrow}></div>
				</NavigationMenu.Indicator>
			</NavigationMenu.List>
			<div className={styles.viewportPosition}>
				<NavigationMenu.Viewport className={styles.viewport} />
			</div>
		</NavigationMenu.Root>
	);
};

export default HorizontalMenu;
