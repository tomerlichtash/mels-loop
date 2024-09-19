'use client';

import React, { useCallback, useMemo } from 'react';
// import { useRouter } from 'next/router';
import { Link, Drawer, Scrollbar, Button, Strip, Separator } from '@melsloop/ml-components';
import { useLocale } from 'hooks/useLocale';
// import { getOppositeTheme } from '../helpers';
import Logo from 'components/Logo/Logo';
import LocaleSelect from 'components/LocaleSelect/LocaleSelect';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
// import { useTheme } from 'next-themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import styles from './SiteDrawer.module.css';

const SiteDrawer = ({ isMobile, opened, toggle }) => {
	const { t, textDirection, localeItems, lang } = useLocale();
	// const router = useRouter();

	// const setLocale = useCallback(
	// 	async (id: string) =>
	// 		router.push(router.asPath, router.asPath, {
	// 			locale: id,
	// 			scroll: true
	// 		}),
	// 	[router]
	// );

	const siteTitle = t('common:site:title');
	// const siteSubtitle = t('common:site:subtitle');
	// const siteLicense = t('common:site:license', {
	// 	toYear: new Date().getFullYear()
	// });

	// const { theme, setTheme } = useTheme();

	// const oppositeTheme = getOppositeTheme(theme);

	// const themeLabel = useMemo(() => {
	// 	return t('common:button:toggleTheme', {
	// 		theme: t(`common:theme:${getOppositeTheme(theme)}:name`)
	// 	});
	// }, [theme, t]);

	return (
		<Drawer
			customIdSuffix="yyy"
			direction={textDirection === 'ltr' ? 'right' : 'left'}
			open={opened}
			// onClose={() => toggle(false)}
			className={styles.root}
		>
			<Scrollbar
				textDirection={textDirection}
				height="100vh"
				className={styles.scrollarea}
			>
				<div className={styles.menuHeader}>
					<div className={styles.brand}>
						<Logo className={styles.logo} />
						<Link
							title={siteTitle}
							href="/"
						>
							{siteTitle}
						</Link>
					</div>
					<Button
						variant="contained"
						mode="primary"
						size="xs"
						onClick={toggle}
						asChild
						className={styles.close}
					>
						<Cross1Icon />
					</Button>
				</div>
				<Strip />
				<div className={styles.panel}>
					<LocaleSelect className={styles.localeSelect} />
					<Separator
						size="sm"
						className={styles.separator}
					/>
					<ThemeSelect className={styles.themeSelect} />
				</div>
			</Scrollbar>
		</Drawer>
	);
};

export default SiteDrawer;
