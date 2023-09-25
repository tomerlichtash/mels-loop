import React, { useState } from "react";
import { mlUtils } from "../../../../lib/ml-utils";
import { ComponentProps } from "../../../../interfaces/models";
import { MenuItemProps } from "../../../../interfaces/menu";
import styles from "./sidebar-menu.module.scss";

import { Button, SwipeableDrawer } from "@mui/material";
import Link from "next/link";
import { getButtonIcon } from "../../utils";
import classNames from "classnames";

export interface IMobileNavProps extends ComponentProps {
	items: MenuItemProps[];
}

export const SidebarMenu = ({ items, className }): JSX.Element => {
	const [visible, setVisible] = useState(false);

	// eslint-disable-next-line react/display-name
	const ListItem = React.forwardRef(
		({ locale, icon, url, target }: any, forwardedRef) => {
			const { title, author, description } = locale;
			return (
				<Link
					className={styles.ListItemLink}
					ref={forwardedRef}
					href={url}
					target={target}
				>
					{title && <div className={styles.ListItemHeading}>{title}</div>}
					{description && <p className={styles.ListItemText}>{description}</p>}
					{author && <p className={styles.ListItemText}>{author}</p>}
					{icon && getButtonIcon(icon)}
				</Link>
			);
		}
	);

	return (
		<div className={classNames([styles.root, className])}>
			<Button onClick={() => setVisible(!visible)}>open</Button>
			<SwipeableDrawer
				anchor={"left"}
				open={visible}
				onClose={() => setVisible(false)}
				onOpen={() => setVisible(true)}
			>
				{items.map((section) => (
					<div key={mlUtils.uniqueId()}>
						{section.locale.title}
						<ul data-list-grid-size="1" className={styles.List}>
							{section.items.map(({ id, ...item }) => (
								<ListItem key={mlUtils.uniqueId()} {...item} />
							))}
						</ul>
					</div>
				))}
			</SwipeableDrawer>
		</div>
	);
};

export default SidebarMenu;
