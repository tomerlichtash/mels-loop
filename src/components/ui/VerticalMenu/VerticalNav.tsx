import React, { useMemo } from "react";
import { mlUtils } from "lib/ml-utils";
import { NavListItem } from "@components/ui";
import NavItemContent from "../NavItemContent/NavItemContent";
import styles from "./VerticalNav.module.scss";

type VerticalNavProps = {
	items: any[];
	onClose: () => void;
};

const VerticalNav = ({ items, onClose }: VerticalNavProps) =>
	useMemo(
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

export default VerticalNav;
