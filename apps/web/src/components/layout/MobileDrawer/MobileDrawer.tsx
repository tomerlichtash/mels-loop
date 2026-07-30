'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { CloseButton } from '@mels-loop/ui/primitives';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption, NavItem } from '../types';
import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
	opened: boolean;
	onClose: () => void;
	navItems: NavItem[];
	locales: LocaleOption[];
}

export function MobileDrawer({
	opened,
	onClose,
	navItems,
	locales,
}: MobileDrawerProps) {
	const { t } = useTranslation();

	return (
		<Dialog.Root open={opened} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content} aria-describedby={undefined}>
					<div className={styles.header}>
						<Dialog.Title className={styles.title}>
							{t('siteTitle')}
						</Dialog.Title>
						<Dialog.Close asChild>
							<CloseButton aria-label={t('nav.closeMenu')} />
						</Dialog.Close>
					</div>
					{/* Above the links rather than below them: locale and theme are
					 * the reason a reader opens this on a phone as often as
					 * navigation is, and the list of articles grows. */}
					<div className={styles.controls}>
						<LocaleSwitcher locales={locales} />
						<ThemeSwitcher aria-label={t('theme.toggle')} />
					</div>
					<nav className={styles.nav}>
						{navItems.map((item) => {
							const isAbsolute =
								item.href.startsWith('http://') ||
								item.href.startsWith('https://');
							const href = isAbsolute ? item.href : item.href || '/';

							return isAbsolute ? (
								<a
									key={item.key}
									href={href}
									className={styles.navLink}
									onClick={onClose}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className={styles.navLabel}>
										{item.label ?? t(item.key)}
									</span>
									{item.author && (
										<span className={styles.navAuthor}>{item.author}</span>
									)}
								</a>
							) : (
								<Link
									key={item.key}
									href={href}
									className={styles.navLink}
									onClick={onClose}
								>
									<span className={styles.navLabel}>
										{item.label ?? t(item.key)}
									</span>
									{item.author && (
										<span className={styles.navAuthor}>{item.author}</span>
									)}
								</Link>
							);
						})}
					</nav>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
