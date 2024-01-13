import React, { useContext, useMemo } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { mlUtils } from "lib/ml-utils";
import { Button } from "@components/ui";
import { NavListItem } from "@components/site";
import { MenuSections } from "@config/siteNav/sections";
import { MenuItems } from "@config/siteNav/items";
import { getMenuItems } from "../helpers";
import { LocaleProvider } from "locale/context/locale-context";
import styles from "./HorizontalNav.module.scss";

type HorizontalMenuProps = {
	items: Record<any, any>[];
};

const HorizontalNav = () => {
	const { translate } = useContext(LocaleProvider);

	const items = useMemo(
		() => getMenuItems(MenuSections, MenuItems, translate),
		[translate]
	);
	console.log(styles);

	return (
		<div className={styles.section}>
			<NavigationMenu.Root className={styles.root}>
				<NavigationMenu.List className={styles.list}>
					{items.map((item) => (
						<NavigationMenu.Item key={item.id}>
							<Button asChild>
								<NavigationMenu.Trigger className={styles.trigger}>
									{item.locale.title}
									<CaretDownIcon className={styles.caretDown} />
								</NavigationMenu.Trigger>
							</Button>
							<NavigationMenu.Content className={styles.content}>
								<ul data-list-grid-size="1" className={styles.items}>
									{item.items.map((item) => (
										<NavigationMenu.Link asChild key={mlUtils.uniqueId()}>
											<li className={styles.listItem}>
												<NavListItem
													key={mlUtils.uniqueId()}
													className={styles.item}
													{...item}
												/>
											</li>
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
		</div>
	);
};

export default HorizontalNav;
