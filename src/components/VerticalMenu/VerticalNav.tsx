import React, { useMemo } from 'react';
import { NavListItem } from '@components/index';
import NavItemContent from '../nav-item-content/NavItemContent';
import { unique } from 'lib/utils';
import { NavParsedNodes } from '@components/HorizontalMenu/types';
import styles from './VerticalNav.module.scss';

type VerticalNavProps = {
	items: NavParsedNodes[];
	onClose: () => void;
};

const VerticalNav = ({ items, onClose }: VerticalNavProps) =>
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

export default VerticalNav;
