import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getButtonIcon } from "../../utils";
import styles from "./topbar-menu.module.scss";
import { mlUtils } from "../../../../lib/ml-utils";
import classNames from "classnames";
import { Typography } from "@mui/material";

export const TopbarMenu = ({ items: sections, className }) => {
	// eslint-disable-next-line react/display-name
	const ListItem = React.forwardRef(
		({ locale, icon, url, target }: any, forwardedRef) => {
			const { title, author, description } = locale;
			return (
				<li>
					<NavigationMenu.Link asChild>
						<Link
							className={styles.ListItemLink}
							ref={forwardedRef}
							href={url}
							target={target}
						>
							{icon && getButtonIcon(icon)}

							{title && (
								<div className={styles.ListItemHeading}>
									<Typography variant="body1">{title}</Typography>
								</div>
							)}

							{description && (
								<Typography variant="caption">{description}</Typography>
							)}

							{author && <Typography variant="caption">{author}</Typography>}
						</Link>
					</NavigationMenu.Link>
				</li>
			);
		}
	);

	return (
		<NavigationMenu.Root
			className={classNames([styles.NavigationMenuRoot, className])}
		>
			<NavigationMenu.List className={styles.NavigationMenuList}>
				{sections.map((section) => (
					<NavigationMenu.Item key={section.id}>
						<NavigationMenu.Trigger
							className={styles.NavigationMenuTrigger}
							asChild
						>
							<Typography variant="caption">
								{section.locale.title}
								<CaretDownIcon className={styles.CaretDown} aria-hidden />
							</Typography>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={styles.NavigationMenuContent}>
							<ul data-list-grid-size="1" className={styles.List}>
								{section.items.map(({ id, ...item }) => (
									<ListItem key={mlUtils.uniqueId()} {...item} />
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

export default TopbarMenu;
