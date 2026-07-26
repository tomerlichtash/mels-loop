'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavItem } from '../types';
import styles from './NavMenu.module.css';

interface NavMenuProps {
	navItems: NavItem[];
}

/**
 * The site header's navigation.
 *
 * Plain links. This was a Radix navigation menu built around a single dropdown
 * listing the site's stories — a portalled panel, an animated indicator and a
 * viewport, plus the open-state machinery driving them, for a site with one
 * story in it. With the dropdown gone none of that had anything left to do,
 * and a menu with no menus is a list of links.
 */
export function NavMenu({ navItems }: NavMenuProps) {
	const { t } = useTranslation();
	const pathname = usePathname();

	return (
		<nav className={styles.root}>
			<ul className={styles.list}>
				{navItems.map((item) => {
					const isAbsolute =
						item.href.startsWith('http://') || item.href.startsWith('https://');
					const href = isAbsolute ? item.href : item.href || '/';
					const isActive = !isAbsolute && pathname.startsWith(href);

					return (
						<li key={item.key}>
							{isAbsolute ? (
								<a
									href={href}
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{t(item.key)}
								</a>
							) : (
								<Link
									href={href}
									className={styles.link}
									aria-current={isActive ? 'page' : undefined}
								>
									{t(item.key)}
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
