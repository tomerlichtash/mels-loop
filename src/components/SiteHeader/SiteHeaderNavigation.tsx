'use client';

import React, { useMemo } from 'react';
import { useLocale } from 'hooks/useLocale';
import {
	Container,
	Link,
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuItemTrigger,
	NavigationMenuItemContent
} from '@melsloop/ml-components';
import { TopBarMenuItemsData } from 'data/navSections';
import styles from './SiteHeaderNavigation.module.css';
import type { NavItemProps } from 'data/types';

const itemRenderer = ({ id, title, subtitle, url, icon, targetBlank }: NavItemProps) => {
	const externalLinkAttr = targetBlank ? { target: 'blank' } : {};
	return (
		<Container key={`topbar-menu-item-${id}`}>
			<Link
				href={url}
				{...externalLinkAttr}
			>
				{icon}
				<div>{title}</div>
				<div>{subtitle}</div>
			</Link>
		</Container>
	);
};

const SiteHeaderNavigation = () => {
	const { t, textDirection } = useLocale();

	return useMemo(
		() => (
			<NavigationMenu
				direction={textDirection}
				className={styles.root}
			>
				<NavigationMenuItem>
					<NavigationMenuItemTrigger className={styles.trigger}>
						{t(TopBarMenuItemsData.articles.title)}
					</NavigationMenuItemTrigger>
					<NavigationMenuItemContent className={styles.content}>
						{TopBarMenuItemsData.articles.items.map(({ title, subtitle, ...props }) =>
							itemRenderer({ title: t(title), subtitle: t(subtitle), ...props })
						)}
					</NavigationMenuItemContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuItemTrigger>
						{t(TopBarMenuItemsData.about.title)}
					</NavigationMenuItemTrigger>
					<NavigationMenuItemContent className={styles.content}>
						{t('nav:items:pages:about:desc')}
					</NavigationMenuItemContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuItemTrigger>
						{t(TopBarMenuItemsData.contact.title)}
					</NavigationMenuItemTrigger>
					<NavigationMenuItemContent className={styles.content}>
						{TopBarMenuItemsData.contact.items.map(({ title, subtitle, ...props }) =>
							itemRenderer({
								title: t(title),
								subtitle: t(subtitle),
								...props
							})
						)}
					</NavigationMenuItemContent>
				</NavigationMenuItem>
			</NavigationMenu>
		),
		[t, textDirection]
	);
};

export default SiteHeaderNavigation;
