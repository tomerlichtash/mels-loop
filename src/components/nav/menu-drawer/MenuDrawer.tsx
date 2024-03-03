import React, { useMemo } from 'react';
import { unique } from 'utils/index';
import NavItem from '../nav-item/NavItem';
import List from '../../list/List';
import ListItem from '../../list-item/ListItem';
import styles from './MenuDrawer.module.scss';
import type { NavParsedNodes } from '../types';

type VerticalNavProps = {
	items: NavParsedNodes[];
	onClose?: () => void;
};

const MenuDrawer = ({ items, onClose }: VerticalNavProps) =>
	useMemo(
		() =>
			items.map((section) => (
				<div key={unique.id()} className={styles.root}>
					<span className={styles.sectionTitle}>{section.locale.title}</span>
					<List className={styles.list}>
						{section.items.map((item) => (
							<ListItem key={`menu-drawer-item-${item.id}`}>
								<NavItem
									{...item}
									onClick={onClose}
									key={unique.id()}
									className={styles.item}
									title={item.locale.title}
									description={item.locale.description}
									author={item.locale.author}
									icon={item.icon}
								/>
							</ListItem>
						))}
					</List>
				</div>
			)),
		[items, onClose]
	);

export default MenuDrawer;
export type { VerticalNavProps };
