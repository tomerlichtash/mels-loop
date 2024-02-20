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
import layoutConfig from './layoutConfig';
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

	const { menuItemsData, menuSectionData, footerLinksData } = layoutConfig;

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

	const navItems = useMemo(
		() => parseMenuItems(menuSectionData, menuItemsData, t),
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

	const footerItems = useMemo(
		() =>
			footerLinksData.map(({ label, items }) => (
				<Container className={styles.column} key={unique.id()}>
					<List className={styles.list} label={t(label)}>
						{items
							.map((item) => {
								return { ...item, label: t(item.label) };
							})
							.map(({ label, target, href }) => {
								return (
									<ListItem key={unique.id()} className={styles.item}>
										{href ? (
											<Link href={href} target={target} className={styles.link}>
												{label}
											</Link>
										) : (
											label
										)}
									</ListItem>
								);
							})}
					</List>
				</Container>
			)),
		[footerLinksData, t]
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
					<MenuDrawer items={navItems} onClose={toggleDrawer} />
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
							<TextLink title={siteTitle} linked={!isHome} href="/">
								{siteTitle}
							</TextLink>
							<Separator />
							<Text variant="subtitle2" className={styles.subtitle}>
								{siteSubtitle}
							</Text>
						</Container>
						{isMobile ? (
							<Button onClick={toggleDrawer} asChild>
								{getIcon('hamburger')}
							</Button>
						) : (
							<Container alignItemsCenter>
								<MenuBar items={navItems} />
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
									<Text
										variant="h1"
										uppercase={true}
										aria-label={siteTitleWithLicense}
									>
										<time>2021-{siteLicenseCurrentYear}</time>
										<span>{siteLicenseType}</span>
										<span>{siteTitle}</span>
									</Text>
									<Text italics={true}>{siteSubtitle}</Text>
									<Text lowercase>{t('common:site:shortSiteDescription')}</Text>
								</div>
								{footerItems}
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
