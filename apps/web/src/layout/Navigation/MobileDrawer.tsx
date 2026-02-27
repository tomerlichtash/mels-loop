'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

import type { NavItem } from '../types';
import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
	opened: boolean;
	onClose: () => void;
	navItems: NavItem[];
}

export function MobileDrawer({ opened, onClose, navItems }: MobileDrawerProps) {
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
						<Dialog.Close
							className={styles.close}
							aria-label={t('nav.closeMenu')}
						>
							&times;
						</Dialog.Close>
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
									{t(item.key)}
								</a>
							) : (
								<Link
									key={item.key}
									href={href}
									className={styles.navLink}
									onClick={onClose}
								>
									{t(item.key)}
								</Link>
							);
						})}
					</nav>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
