'use client';

import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useIconAnimator, useLocale, useWindowSize } from 'hooks/index';
import { unique } from 'utils/unique';
import { useDrawer } from '../hooks/useDrawer';
import {
	Button,
	Container,
	Drawer,
	MenuBar,
	Link,
	List,
	ListItem,
	LocaleSelect,
	Logo,
	Scrollbar,
	Separator,
	Strip,
	Text,
	TextLink,
	ThemeSelect,
	MenuDrawer,
} from '../components/index';
import { getIcon } from 'components/icons';
import CustomHead from './customHead';
import { Analytics } from './analytics';
import { parseMenuItems } from './helpers';
import { LocaleId } from 'types/locale';
import { useRouter } from 'next/router';
import layoutConfig from './data/nav';
import classNames from 'classnames';
import styles from './Layout.module.scss';
import type { LocaleOptionProps } from 'components/locale-select/LocaleSelect';

type RootLayoutProps = {
	className?: string;
};

const IS_DEBUG = process.env.NEXT_PUBLIC_ML_DEBUG;
const MIN_DESKTOP_WIDTH = 1024;

const Layout = ({ children }: PropsWithChildren<RootLayoutProps>) => {
	const router = useRouter();

	useIconAnimator(router);

	const { menuItemsData, menuSectionData } = layoutConfig;

	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const { t, lang, locales, textDirection } = useLocale();
	const { width: screenWidth } = useWindowSize();

	const isHome = pathname === '/';
	const isMobile = screenWidth <= MIN_DESKTOP_WIDTH;

	const { open: drawerOpen, toggle: toggleDrawer } = useDrawer(isMobile);

	const setLocale = useCallback(
		async (id: LocaleId) =>
			router.push(router.asPath, router.asPath, {
				locale: id,
				scroll: true,
			}),
		[router]
	);

	const themeLabel = useMemo(() => {
		return t('common:button:toggleTheme', {
			theme: t(`common:theme:${theme === 'dark' ? 'light' : 'dark'}:name`),
		});
	}, [t, theme]);

	const navItems = useCallback(
		(id: string) => parseMenuItems(menuSectionData[id], menuItemsData, t),
		[menuItemsData, menuSectionData, t]
	);

	const localeItems: LocaleOptionProps[] = useMemo(
		() =>
			locales.map((id) => ({
				id: id,
				label: t(`locale:${id}:symbol`),
				title: t(`locale:${id}:label`),
			})),
		[locales, t]
	);

	const footerLinkSections = useMemo(
		() =>
			navItems('footer').map((section) => (
				<Container className={styles.column} key={unique.id()}>
					<List className={styles.list} label={t(section.locale.title)}>
						{section.items.map((item) => (
							<ListItem
								key={`footer-links-item-${item.id}`}
								className={styles.item}
							>
								<Link
									href={item.url}
									target={item.target}
									className={styles.link}
									asChild={true}
								>
									{t(item.locale.title)}
								</Link>
							</ListItem>
						))}
					</List>
				</Container>
			)),
		[navItems, t]
	);

	const siteLicenseCurrentYear = `${new Date().getFullYear()}`;
	const siteLicenseType = t('common:license:label');
	const siteLicenseLabel = `${siteLicenseType}-${t(
		'common:license:attributs'
	)}`;

	const siteTitle = t('common:site:title');
	const siteSubtitle = t('common:site:subtitle');
	const siteTitleWithLicense = `2021-${siteLicenseCurrentYear} ${siteLicenseLabel} ${siteTitle}`;

	const menuDrawer = useMemo(
		() => (
			<Drawer
				direction={textDirection === 'ltr' ? 'right' : 'left'}
				open={drawerOpen}
				onClose={toggleDrawer}
				className={styles.root}
			>
				<Scrollbar className={styles.root} textDirection={textDirection}>
					<Button onClick={toggleDrawer} asChild>
						{getIcon('close')}
					</Button>
					<Logo />
					<TextLink title={siteTitle} linked={!isHome} href="/">
						{siteTitle}
					</TextLink>
					<Strip />
					<LocaleSelect
						defaultValue={lang}
						options={localeItems}
						onSelect={(id) => void setLocale(id)}
					/>
					<ThemeSelect
						label={themeLabel}
						theme={theme}
						setTheme={setTheme}
					></ThemeSelect>
					<MenuDrawer items={navItems('topbar')} onClose={toggleDrawer} />
				</Scrollbar>
			</Drawer>
		),
		[
			textDirection,
			drawerOpen,
			siteTitle,
			isHome,
			lang,
			localeItems,
			themeLabel,
			theme,
			navItems,
			toggleDrawer,
			setTheme,
			setLocale,
		]
	);

	return (
		<>
			<CustomHead
				title={`${siteTitle} – ${siteSubtitle}`}
				name={siteTitle}
				description={siteSubtitle}
			/>
			<Scrollbar
				textDirection={textDirection}
				height="100vh"
				className={styles.root}
				data-locale={lang}
			>
				<Container
					asChild
					sticky
					fullWidth
					spaceBetween
					alignItemsCenter
					horizontalGutter
					position="top"
					className={styles.topbar}
				>
					<header data-testid="topbar">
						<Container alignItemsCenter className={styles.title}>
							<Logo />
							<TextLink
								variant="subtitle1"
								title={siteTitle}
								linked={!isHome}
								href="/"
							>
								{siteTitle}
							</TextLink>
							<Separator />
							<Text variant="subtitle4" className={styles.subtitle}>
								{siteSubtitle}
							</Text>
						</Container>
						{isMobile ? (
							<Button onClick={toggleDrawer} asChild>
								{getIcon('hamburger')}
							</Button>
						) : (
							<Container alignItemsCenter>
								<MenuBar items={navItems('topbar')} />
								<>
									<LocaleSelect
										defaultValue={lang}
										options={localeItems}
										onSelect={(id) => void setLocale(id)}
									/>
									<ThemeSelect
										label={themeLabel}
										theme={theme}
										setTheme={setTheme}
									></ThemeSelect>
								</>
							</Container>
						)}
					</header>
				</Container>
				<Container className={styles.page}>{children}</Container>
				<Strip />
				<Container fullWidth asChild className={styles.footer}>
					<footer className={styles.footer}>
						<div className={styles.container}>
							<div className={styles.columns}>
								<div className={classNames(styles.column)}>
									<Text variant="h1" aria-label={siteTitleWithLicense}>
										<time>2021-{siteLicenseCurrentYear}</time>
										<span>{siteLicenseType}</span>
										<span>{siteTitle}</span>
									</Text>
									<Text>{siteSubtitle}</Text>
									<Text>{t('common:site:shortSiteDescription')}</Text>
								</div>
								{footerLinkSections}
							</div>
						</div>
					</footer>
				</Container>
				{isMobile && menuDrawer}
			</Scrollbar>
			{!IS_DEBUG ?? <Analytics />}
		</>
	);
};

export default Layout;
