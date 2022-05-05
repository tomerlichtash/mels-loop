import React, { useMemo } from "react";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { mlUtils } from "../../lib/ml-utils";
import Link from "next/link";
import { renderMenuItem } from "../menu-provider";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { IMenuData, IMenuItem } from "../../interfaces/menu";
import { st, classes } from "./mobile-menu.st.css";

export interface IMobileNavProps extends ComponentProps {
	right: boolean;
	items: IMenuData[];
}

const renderGroupSection = (items: IMenuData) => {
	const { meta, keys, children } = items;
	const { title } = keys;
	const { layout } = meta;
	return (
		<div key={mlUtils.uniqueId()}>
			{title}
			<ul className={st(classes.menuContent, { layout })}>
				{children.map((child) => {
					const { meta, keys, type } = child;
					const { url } = meta;
					const { author, description } = keys;
					return (
						<li key={mlUtils.uniqueId()}>
							<Link href={url}>
								<a href={url}>
									{/* {icon && MenuIcons[icon]} */}
									<span className={classes.title}>{title}</span>
									<p className={classes.text}>
										{type === "article" ? author : description}
									</p>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const renderSingleItems = (items: IMenuItem[]) => {
	return items.map((child) => {
		const { title, description, cta_label } = child.keys;
		const { url } = child.meta;

		return (
			<div key={mlUtils.uniqueId()}>
				<Link href={url}>
					<a href={url}>
						<span className={classes.title}>{title}</span>
					</a>
				</Link>
				<div>{description}</div>
				<Button label={cta_label} />
			</div>
		);
	});
};

const renderSingleSection = (items: IMenuData) => {
	const { keys, children } = items;
	const { title } = keys;
	return (
		<div key={mlUtils.uniqueId()}>
			<h3>{title}</h3>
			{renderSingleItems(children)}
		</div>
	);
};

const menuStyles = {
	bmMenuWrap: {
		position: "fixed",
		height: "100%",
		width: "300px",
		top: "0",
	},
};

export const MobileMenu = ({
	right,
	items,
	className,
}: IMobileNavProps): JSX.Element => {
	const menuItems = useMemo(
		() =>
			items.map((item) =>
				renderMenuItem(item)(renderGroupSection, renderSingleSection)
			),
		[items]
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
			<Header className={classes.header} />
			<div className={classes.strip}></div>
			<LocaleSelector className={classes.localeSelector} />
			<ThemeSelector className={classes.themeSelector} />
			{menuItems}
		</Menu>
	);
};

export default MobileMenu;
