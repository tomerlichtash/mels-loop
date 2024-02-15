import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { unique } from 'utils/unique';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Button from 'components/button/Button';
import NavListItem from 'components/nav-item/NavListItem';
import NavItemContent from 'components/nav-item-content/NavItemContent';
import styles from './HorizontalNav.module.scss';
import type { NavItemDataProps, NavParsedNodes, NavProps } from './types';

const renderItems = (items: NavItemDataProps[]) =>
	items.map((item) => (
		<NavigationMenu.Link asChild key={unique.id()}>
			<li className={styles.listItem}>
				<NavListItem key={unique.id()} className={styles.item} {...item}>
					<NavItemContent
						title={item.locale.title}
						description={item.locale.description}
						author={item.locale.author}
						icon={item.icon}
					/>
				</NavListItem>
			</li>
		</NavigationMenu.Link>
	));

const getSections = (sections: NavParsedNodes[]) =>
	sections.map((section) => (
		<NavigationMenu.Item key={section.id}>
			<Button asChild className={styles.trigger}>
				<NavigationMenu.Trigger>
					{section.locale.title}
					<CaretDownIcon className={styles.caretDown} />
				</NavigationMenu.Trigger>
			</Button>
			<NavigationMenu.Content className={styles.content}>
				<ul data-list-grid-size="1" className={styles.items}>
					{renderItems(section.items)}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	));

const HorizontalNav = ({ items }: NavProps) => (
	<NavigationMenu.Root className={styles.root}>
		<NavigationMenu.List className={styles.list}>
			{getSections(items)}
			<NavigationMenu.Indicator className={styles.indicator}>
				<div className={styles.arrow}></div>
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div className={styles.viewportPosition}>
			<NavigationMenu.Viewport className={styles.viewport} />
		</div>
	</NavigationMenu.Root>
);

export default HorizontalNav;
