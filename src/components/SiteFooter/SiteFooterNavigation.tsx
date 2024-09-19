'use client';

import React, { useMemo } from 'react';
import { useLocale } from 'hooks/useLocale';
import { Container, Link, List, Heading, ListItem } from '@melsloop/ml-components';
import { FooterLinksItemsData } from 'data/navSections';
import styles from './SiteFooterNavigation.module.css';
import type { NavItemProps } from 'data/types';

const itemRenderer = ({ id, title, subtitle, url, targetBlank }: NavItemProps) => {
	const externalLinkAttr = targetBlank ? { target: 'blank' } : {};
	return (
		<ListItem
			className={styles.item}
			key={`footer-link-item-${id}`}
		>
			<Link
				href={url}
				title={subtitle}
				{...externalLinkAttr}
			>
				{title}
			</Link>
		</ListItem>
	);
};

const SiteFooterNavigation = () => {
	const { t } = useLocale();

	return useMemo(
		() => (
			<Container>
				<Container flexDirection="column">
					<Heading level={5}>{FooterLinksItemsData.pages.title}</Heading>
					<List className={styles.list}>
						{FooterLinksItemsData.pages.items.map(({ title, subtitle, ...props }) =>
							itemRenderer({ title: t(title), subtitle: t(subtitle), ...props })
						)}
					</List>
				</Container>
				<Container flexDirection="column">
					<Heading level={5}>{FooterLinksItemsData.links.title}</Heading>
					<List className={styles.list}>
						{FooterLinksItemsData.links.items.map(({ title, subtitle, ...props }) =>
							itemRenderer({ title: t(title), subtitle: t(subtitle), ...props })
						)}
					</List>
				</Container>
			</Container>
		),
		[t]
	);
};

export default SiteFooterNavigation;
