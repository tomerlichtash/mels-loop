'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

import type { NavItem } from '../types';
import { FeaturedStoryCard } from './FeaturedStoryCard';
import styles from './NavMenu.module.css';
import { StoryList } from './StoryList';

interface NavMenuProps {
	navItems: NavItem[];
}

export function NavMenu({ navItems }: NavMenuProps) {
	const { t } = useTranslation();
	const pathname = usePathname();
	const [value, setValue] = useState('');
	const skipAnimation = useRef(false);

	const close = useCallback(() => {
		skipAnimation.current = true;
		setValue('');
	}, []);

	const handleValueChange = useCallback((newValue: string) => {
		skipAnimation.current = false;
		setValue(newValue);
	}, []);

	return (
		<NavigationMenu.Root
			className={cn(styles.root, {
				[styles.noAnimation]: skipAnimation.current,
			})}
			delayDuration={0}
			value={value}
			onValueChange={handleValueChange}
		>
			<NavigationMenu.List className={styles.list}>
				{navItems.map((item) => {
					const isAbsolute =
						item.href.startsWith('http://') || item.href.startsWith('https://');
					const href = isAbsolute ? item.href : item.href || '/';
					const isActive = !isAbsolute && pathname.startsWith(href);

					if (item.hasContent) {
						const featured = item.stories?.find((s) => s.featured);
						const others = item.stories?.filter((s) => !s.featured) ?? [];

						return (
							<NavigationMenu.Item key={item.key}>
								<NavigationMenu.Trigger className={styles.trigger}>
									{t(item.key)}
								</NavigationMenu.Trigger>
								<NavigationMenu.Content className={styles.content}>
									<div className={styles.contentPanel}>
										<FeaturedStoryCard
											story={featured}
											fallbackHref={href}
											onSelect={close}
										/>
										<StoryList stories={others} onSelect={close} />
									</div>
								</NavigationMenu.Content>
							</NavigationMenu.Item>
						);
					}

					return (
						<NavigationMenu.Item key={item.key}>
							<NavigationMenu.Link asChild active={isActive}>
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
									<Link href={href} className={styles.link}>
										{t(item.key)}
									</Link>
								)}
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					);
				})}

				<NavigationMenu.Indicator className={styles.indicator}>
					<div className={styles.arrow} />
				</NavigationMenu.Indicator>
			</NavigationMenu.List>

			<div className={styles.viewportPosition}>
				<NavigationMenu.Viewport className={styles.viewport} />
			</div>
		</NavigationMenu.Root>
	);
}
