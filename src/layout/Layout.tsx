'use client';

import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useIconAnimator, useLocale, useWindowSize } from 'hooks/index';
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
import navData, { NavSectionId } from './data/nav';
import classNames from 'classnames';
import styles from './Layout.module.scss';
import type { LocaleOptionProps } from 'layout/locale-select/LocaleSelect';

type RootLayoutProps = {
	className?: string;
};

const IS_DEBUG = process.env.NEXT_PUBLIC_ML_DEBUG;
const MIN_DESKTOP_WIDTH = 1024;

const Layout = ({ children }: PropsWithChildren<RootLayoutProps>) => {
	const router = useRouter();

	useIconAnimator(router);

	const { menuItemsData, menuSectionData } = navData;

	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const { t, lang, locales, textDirection } = useLocale();
	const { width: screenWidth } = useWindowSize();

	const isHome = pathname === '/';
	const isMobile = screenWidth <= MIN_DESKTOP_WIDTH;
	const oppositeTheme = theme === 'dark' ? 'light' : 'dark';

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
			theme: t(`common:theme:${oppositeTheme}:name`),
		});
	}, [oppositeTheme, t]);

	const navItems = useCallback(
		(id: NavSectionId) => parseMenuItems(menuSectionData[id], menuItemsData, t),
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

	const footerLinks = useMemo(
		() =>
			navItems(NavSectionId.FOOTER).map((section) => (
				<Container
					className={styles.column}
					key={`container-${section.id}`}
				>
					<List
						className={styles.list}
						label={section.locale.title}
					>
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
									{item.locale.title}
								</Link>
							</ListItem>
						))}
					</List>
				</Container>
			)),
		[navItems]
	);

	const siteTitle = t('common:site:title');
	const siteSubtitle = t('common:site:subtitle');
	const siteLicense = t('common:site:license', {
		toYear: new Date().getFullYear(),
	});

	const menuDrawer = useMemo(
		() => (
			<Drawer
				direction={textDirection === 'ltr' ? 'right' : 'left'}
				open={drawerOpen}
				onClose={toggleDrawer}
				className={styles.drawer}
			>
				<Scrollbar
					textDirection={textDirection}
					height="100vh"
				>
					<Button
						onClick={toggleDrawer}
						asChild
					>
						{getIcon('close')}
					</Button>
					<div className={styles.menuHeader}>
						<Logo
							mode={oppositeTheme}
							className={styles.logo}
						/>
						<TextLink
							title={siteTitle}
							linked={!isHome}
							href="/"
							variant="h1"
						>
							{siteTitle}
						</TextLink>
					</div>
					<Strip />
					<div className={styles.panel}>
						<LocaleSelect
							defaultValue={lang}
							options={localeItems}
							onSelect={(id) => id !== lang && void setLocale(id)}
							className={styles.localeSelect}
						/>
						<Separator className={styles.separator} />
						<ThemeSelect
							label={themeLabel}
							theme={theme}
							setTheme={setTheme}
							className={styles.themeSelect}
						/>
					</div>
					<MenuDrawer
						items={navItems(NavSectionId.SIDEBAR)}
						onClose={toggleDrawer}
						className={styles.menu}
					/>
				</Scrollbar>
			</Drawer>
		),
		[
			textDirection,
			drawerOpen,
			toggleDrawer,
			oppositeTheme,
			siteTitle,
			isHome,
			lang,
			localeItems,
			themeLabel,
			theme,
			setTheme,
			navItems,
			setLocale,
		]
	);

	const mobileMenutrigger = (
		<Button
			onClick={toggleDrawer}
			asChild
		>
			{getIcon('hamburger')}
		</Button>
	);

	const panel = (
		<Container alignItemsCenter>
			<Container className={styles.panel}>
				<MenuBar
					items={navItems(NavSectionId.TOPBAR)}
					textDirection={textDirection}
				/>
				<LocaleSelect
					defaultValue={lang}
					options={localeItems}
					onSelect={(id) => void setLocale(id)}
					className={styles.localeSelect}
				/>
				<ThemeSelect
					label={themeLabel}
					theme={theme}
					setTheme={setTheme}
					className={styles.themeSelect}
				/>
			</Container>
		</Container>
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
						<Container
							alignItemsCenter
							className={styles.title}
						>
							<Logo
								mode={theme || 'light'}
								className={styles.logo}
							/>
							<TextLink
								variant="subtitle1"
								title={siteTitle}
								linked={!isHome}
								href="/"
							>
								{siteTitle}
							</TextLink>
							<Separator />
							<Text
								variant="subtitle4"
								className={styles.subtitle}
							>
								{siteSubtitle}
							</Text>
						</Container>
						{isMobile ? mobileMenutrigger : panel}
					</header>
				</Container>
				<Container className={styles.page}>{children}</Container>
				<Strip />
				<Container
					fullWidth
					asChild
					className={styles.footer}
				>
					<footer className={styles.footer}>
						<div className={styles.container}>
							<div className={styles.columns}>
								<div className={classNames(styles.column)}>
									<Text
										variant="h1"
										aria-label={siteLicense}
									>
										{siteLicense}
									</Text>
									<Text>{siteSubtitle}</Text>
									<Text>{t('common:site:shortSiteDescription')}</Text>
								</div>
								{footerLinks}
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
