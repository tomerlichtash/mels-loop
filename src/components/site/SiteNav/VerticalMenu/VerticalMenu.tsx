import React from "react";
import { mlUtils } from "../../../../lib/ml-utils";
import { ComponentProps } from "../../../../interfaces/models";
import { MenuItemProps } from "../../../../interfaces/menu";
import ListItem from "../NavListItem";
import styles from "./VerticalMenu.module.scss";
import classNames from "classnames";

export interface IMobileNavProps extends ComponentProps {
	items: MenuItemProps[];
}

const VerticalMenu = ({ items, className }) => {
	return items.map((section) => (
		<div
			key={mlUtils.uniqueId()}
			className={classNames[(styles.root, className)]}
		>
			{section.locale.title}
			<ul data-list-grid-size="1" className={styles.List}>
				{section.items.map((item) => (
					<ListItem
						key={mlUtils.uniqueId()}
						className={styles.listItem}
						{...item}
					/>
				))}
			</ul>
		</div>
	));
};

export default VerticalMenu;
