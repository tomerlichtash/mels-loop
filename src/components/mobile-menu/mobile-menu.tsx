import React, { useMemo } from "react";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
// import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { mlUtils } from "../../lib/ml-utils";
import { renderMenuItem } from "../menu-provider";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { IMenuData, IMenuItem } from "../../interfaces/menu";
import { TextDirection } from "../../interfaces/locale-context";

export interface IMobileNavProps extends ComponentProps {
	right: boolean;
	items: IMenuData[];
	textDirection: TextDirection;
}

const groupChild = (child: IMenuItem) => {
	const { id, meta, keys, type } = child;
	const { url } = meta;
	const { title, author, description } = keys;
	const subtitle = type === "article" ? author : description;
	return (
		<Button
			link={url}
			label={title}
			key={mlUtils.uniqueId()}
			// className={st(classes.menuItemButton, { id })}
		>
			<div className="subtitle">{subtitle}</div>
		</Button>
	);
};

const renderSingleItems = (children: IMenuItem[]) => {
	return children.map((child) => {
		const { id } = child;
		const { title, description } = child.keys;
		const { url } = child.meta;
		return (
			<Button
				link={url}
				label={title}
				key={mlUtils.uniqueId()}
				className="menu-item-button"
				data-item-id={id}
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
		<div key={mlUtils.uniqueId()} className="section">
			<div className="section-title">{title}</div>
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
		<div key={mlUtils.uniqueId()} className="section">
			<div className="section-title">{title}</div>
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
		<></>
		// <Menu
		// 	pageWrapId={"page-wrap"}
		// 	outerContainerId={"outer-container"}
		// 	burgerButtonClassName={`buger-button-${side}`}
		// 	menuClassName="burger-menu"
		// 	burgerBarClassName="data-burger-bars"
		// 	crossButtonClassName={`cross-button-${side}`}
		// 	crossClassName="burger-cross"
		// 	overlayClassName="overlay"
		// 	itemListClassName="item-list"
		// 	styles={menuStyles}
		// 	right={right}
		// 	className="mobile-menu"
		// ></Menu>
	);
};

export default MobileMenu;
/**
<div className="menu">
<div className="container">
	<Header className="menu-header" />
	<div className="strip"></div>
	<div className="toolbar">
		<LocaleSelector
		// className={st(classes.toolbarItem, classes.localeSelector)}
		/>
		{/* <ThemeSelector
			className={st(classes.toolbarItem, classes.themeSelector)}
		/> 
	</div>
</div>
<div className="content">{menuItems}</div>
</div>

*/
