import React, { useContext, useMemo } from "react";
import { mlUtils } from "lib/ml-utils";
import { NavListItem } from "@components/site";
import { LocaleProvider } from "locale/context/locale-context";
import { getMenuItems } from "../helpers";
import { MenuItems as menuItems } from "@config/siteNav/items";
import { MenuSections as menuSections } from "@config/siteNav/sections";
import styles from "./VerticalNav.module.scss";
import NavItemContent from "../NavItemContent/NavItemContent";

type VerticalNavProps = {
	onClose: () => void;
};

const VerticalNav = ({ onClose }): VerticalNavProps => {
	const { translate } = useContext(LocaleProvider);

	const items = useMemo(
		() => getMenuItems(menuSections, menuItems, translate),
		[translate]
	);

	const menu = useMemo(
		() =>
			items.map((section) => (
				<div key={mlUtils.uniqueId()} className={styles.root}>
					<span className={styles.sectionTitle}>{section.locale.title}</span>
					<ul className={styles.list}>
						{section.items.map(({ locale, ...item }) => (
							<NavListItem
								url={item.url}
								target={item.target}
								key={mlUtils.uniqueId()}
								className={styles.item}
								onClick={onClose}
							>
								<NavItemContent {...item} {...locale} />
							</NavListItem>
						))}
					</ul>
				</div>
			)),
		[items, onClose]
	);

	return menu;
};

export default VerticalNav;
