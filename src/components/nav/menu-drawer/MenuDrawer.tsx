import React, { useMemo } from 'react';
import { unique } from 'utils/index';
import NavListItem from '../nav-item/NavListItem';
import NavItemContent from '../nav-item-content/NavItemContent';
import styles from './MenuDrawer.module.scss';
import { NavParsedNodes } from '../types';

type VerticalNavProps = {
	items: NavParsedNodes[];
	onClose: () => void;
};

const MenuDrawer = ({ items, onClose }: VerticalNavProps) =>
	useMemo(
		() =>
			items.map((section) => (
				<div key={unique.id()} className={styles.root}>
					<span className={styles.sectionTitle}>{section.locale.title}</span>
					<ul className={styles.list}>
						{section.items.map((item) => (
							<NavListItem
								{...item}
								key={unique.id()}
								className={styles.item}
								onClick={onClose}
							>
								<NavItemContent
									title={item.locale.title}
									description={item.locale.description}
									author={item.locale.author}
									icon={item.icon}
								/>
							</NavListItem>
						))}
					</ul>
				</div>
			)),
		[items, onClose]
	);

export default MenuDrawer;
export type { VerticalNavProps };
