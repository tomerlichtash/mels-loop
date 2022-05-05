import React from "react";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { mlUtils } from "../../lib/ml-utils";
import Link from "next/link";
import { renderMenuItem } from "../menu-provider";
import { st, classes } from "./mobile-menu.st.css";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { IMenuData, IMenuItem } from "../../interfaces/menu";

export interface IMobileNavProps extends ComponentProps {
	right: boolean;
	items: IMenuData[];
}

const renderGroupSection = (items: IMenuData) => {
	const { meta, keys, children } = items;
	const { title } = keys;
	const { layout } = meta;
	return (
		<div>
			{title}

			<ul className={st(classes.menuContent, { layout })}>
				{children.map((child) => {
					const { meta: childMeta, keys: childKeys, type } = child;
					const { url } = childMeta;
					const { author, description } = childKeys;
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
		<div>
			<h3>{title}</h3>
			{renderSingleItems(children)}
		</div>
	);
};

export const MobileMenu = ({
	right,
	items,
	className,
}: IMobileNavProps): JSX.Element => {
	return (
		<Menu
			pageWrapId={"page-wrap"}
			outerContainerId={"outer-container"}
			burgerButtonClassName={st(
				classes.burgerButton,
				{ right }
				// "mobileNavTrigger"
			)}
			menuClassName={classes.burgerMenu}
			burgerBarClassName={classes.burgerBars}
			crossButtonClassName={st(classes.crossButton, { right })}
			crossClassName={classes.burgerCross}
			overlayClassName={classes.overlay}
			itemListClassName={classes.itemList}
			styles={{
				bmMenuWrap: {
					position: "fixed",
					height: "100%",
					width: "300px",
					top: "0",
				},
			}}
			right={right}
			className={st(
				classes.root,
				{ side: right ? "right" : "left" },
				className
			)}
		>
			<Header className={classes.header} />
			<div className={classes.strip}>xxx</div>
			<LocaleSelector className={classes.localeSelector} />
			<ThemeSelector className={classes.themeSelector} />
			{items.map((item) =>
				renderMenuItem(item)(renderGroupSection, renderSingleSection)
			)}
		</Menu>
	);
};

export default MobileMenu;
