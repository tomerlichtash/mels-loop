import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { getIcon } from '../../icons';
import ListItem from '../../list-item/ListItem';
import Button from '../../button/Button';
import List from '../../list/List';
import NavItem from '../nav-item/NavItem';
import styles from './MenuBar.module.scss';
import type { NavItemDataProps, NavParsedNodes, NavProps } from '../types';
import classNames from 'classnames';

const renderItems = (items: NavItemDataProps[]) =>
	items.map((item) => (
		<NavigationMenu.Link
			asChild
			key={`list-item-${item.id}`}
		>
			<ListItem className={styles.menuListItem}>
				<NavItem
					{...item}
					title={item.locale.title}
					description={item.locale.description}
					author={item.locale.author}
					icon={item.icon}
				/>
			</ListItem>
		</NavigationMenu.Link>
	));

const renderSections = (sections: NavParsedNodes[]) =>
	sections.map((section) => (
		<NavigationMenu.Item
			key={section.id}
			asChild
		>
			<ListItem
				className={styles.menuSectionTriggerItem}
				key={`list-item-${section.id}`}
			>
				<>
					<Button
						className={styles.menuSectionTriggerButton}
						asChild
					>
						<NavigationMenu.Trigger>
							{section.locale.title}
							{getIcon('caretDown', styles.caret)}
						</NavigationMenu.Trigger>
					</Button>
					<NavigationMenu.Content className={styles.content}>
						<List className={styles.sectionItemsList}>{renderItems(section.items)}</List>
					</NavigationMenu.Content>
				</>
			</ListItem>
		</NavigationMenu.Item>
	));

const MenuBar = ({ items, textDirection, className }: NavProps) => (
	<NavigationMenu.Root
		className={classNames(styles.root, className)}
		data-direction={textDirection}
	>
		<NavigationMenu.List className={styles.menuSectionTriggers}>
			{renderSections(items)}
			<NavigationMenu.Indicator className={styles.indicator}>
				<div className={styles.arrow}></div>
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div className={styles.viewportPosition}>
			<NavigationMenu.Viewport className={styles.viewport} />
		</div>
	</NavigationMenu.Root>
);

export default MenuBar;
