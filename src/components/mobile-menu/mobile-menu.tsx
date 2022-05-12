import React, { useMemo } from "react";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { mlUtils } from "../../lib/ml-utils";
import { renderMenuItem } from "../menu-provider";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { IMenuData, IMenuItem } from "../../interfaces/menu";
import { st, classes } from "./mobile-menu.st.css";
import { TextDirection } from "../../interfaces/locale-context";

export interface IMobileNavProps extends ComponentProps {
	right: boolean;
	items: IMenuData[];
	textDirection: TextDirection;
}

const groupChild = (child: IMenuItem) => {
	const { meta, keys, type } = child;
	const { url } = meta;
	const { title, author, description } = keys;
	const subtitle = type === "article" ? author : description;
	return (
		<Button
			link={url}
			label={title}
			key={mlUtils.uniqueId()}
			className={classes.menuItemButton}
		>
			<div className={classes.subtitle}>{subtitle}</div>
		</Button>
	);
};

const renderSingleItems = (children: IMenuItem[]) => {
	return children.map((child) => {
		const { title, description } = child.keys;
		const { url } = child.meta;
		return (
			<Button
				link={url}
				label={title}
				key={mlUtils.uniqueId()}
				className={classes.menuItemButton}
			>
				<div>{description}</div>
			</Button>
		);
	});
};

const renderGroupSection = (item: IMenuData) => {
	const { keys, children } = item;
	const { title } = keys;
	return (
		<div key={mlUtils.uniqueId()} className={classes.section}>
			<div className={classes.sectionTitle}>{title}</div>
			{children.map((item) => (
				<div key={mlUtils.uniqueId()}>{groupChild(item)}</div>
			))}
		</div>
	);
};

const renderSingleSection = (items: IMenuData) => {
	const { keys, children } = items;
	const { title } = keys;
	return (
		<div key={mlUtils.uniqueId()} className={classes.section}>
			<div className={classes.sectionTitle}>{title}</div>
			{renderSingleItems(children)}
		</div>
	);
};

const menuStyles = {
	bmMenuWrap: {
		position: "fixed",
		height: "100%",
		width: "360px",
		top: "0",
		overflow: "hidden",
	},
};

export const MobileMenu = ({
	right,
	items,
	textDirection,
	className,
}: IMobileNavProps): JSX.Element => {
	const menuItems = useMemo(
		() =>
			items.map((item) =>
				renderMenuItem(item, textDirection)(
					renderGroupSection,
					renderSingleSection
				)
			),
		[items, textDirection]
	);

	const side = right ? "right" : "left";

	return (
		<Menu
			pageWrapId={"page-wrap"}
			outerContainerId={"outer-container"}
			burgerButtonClassName={st(classes.burgerButton, { side })}
			menuClassName={classes.burgerMenu}
			burgerBarClassName={classes.burgerBars}
			crossButtonClassName={st(classes.crossButton, { side })}
			crossClassName={classes.burgerCross}
			overlayClassName={classes.overlay}
			itemListClassName={classes.itemList}
			styles={menuStyles}
			right={right}
			className={st(classes.root, { side }, className)}
		>
			<div className={classes.menu}>
				<div className={classes.menuHeader}>
					<Header className={classes.header} />
					<div className={classes.strip}></div>
					<div className={classes.toolbar}>
						<LocaleSelector
							className={st(classes.toolbarItem, classes.localeSelector)}
						/>
						<ThemeSelector
							className={st(classes.toolbarItem, classes.themeSelector)}
						/>
					</div>
				</div>
				<div className={classes.content}>{menuItems}</div>
			</div>
		</Menu>
	);
};

export default MobileMenu;
