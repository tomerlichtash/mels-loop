'use client';

import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useLocale, useWindowSize } from 'hooks/index';
import { unique } from 'utils/unique';
import { useDrawer } from '../components/drawer/useDrawer';
import {
	Button,
	Container,
	Drawer,
	HorizontalNav,
	Link,
	LinkProps,
	List,
	ListItem,
	LocaleOption,
	LocaleSelect,
	Logo,
	Page,
	Scrollbar,
	Separator,
	Strip,
	Text,
	TextLink,
	ThemeSelect,
	VerticalMenuTrigger,
	VerticalNav,
} from '../components/index';
import { Head } from './customHead';
import { Analytics } from './analytics';
import { parseMenuItems } from '../components/helpers';
import { Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './Layout.module.scss';

import { default as menuItemsData } from 'config/navItems.json' assert { type: 'json' };
import { default as menuSectionData } from 'config/navSections.json' assert { type: 'json' };
import { default as footerLinksData } from 'config/layoutFooterLinks.json' assert { type: 'json' };

import type {
	NavItemDataProps,
	NavParsedNodes,
	NavSectionDataProps,
} from '../components/HorizontalMenu/types';
import type { LayoutProps, LinkSectionProps } from './types';
import { LocaleId } from 'types/locale';
import { useRouter } from 'next/router';

const IS_DEBUG = process.env.NEXT_PUBLIC_ML_DEBUG;
const MIN_DESKTOP_WIDTH = 1024;

const Layout = ({
	title,
	pageName,
	children,
}: PropsWithChildren<LayoutProps>) => {
	const router = useRouter();

	const setLocale = useCallback(
		async (id: LocaleId) =>
			router.push(router.asPath, router.asPath, {
				locale: id,
				scroll: true,
			}),
		[router]
	);

	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const { t, lang, locales, textDirection } = useLocale();
	const { width: screenWidth } = useWindowSize();

	const isHome = pathname === '/';
	const isMobile = screenWidth <= MIN_DESKTOP_WIDTH;

	const { open, toggle } = useDrawer(isMobile);

	const themeLabel = useMemo(() => {
		return t('common:button:toggleTheme', {
			theme: t(`common:theme:${theme === 'dark' ? 'light' : 'dark'}:name`),
		});
	}, [t, theme]);

	const navItems: NavParsedNodes[] = useMemo(
		() =>
			parseMenuItems(
				menuSectionData as NavSectionDataProps[],
				menuItemsData as NavItemDataProps[],
				t
			),
		[t]
	);

	const localeItems: LocaleOption[] = useMemo(
		() =>
			locales.map((id) => ({
				id: id as LocaleId,
				label: t(`locale:${id}:symbol`),
				title: t(`locale:${id}:label`),
			})),
		[locales, t]
	);

	const footerItems = useMemo(
		() =>
			(footerLinksData as LinkSectionProps[]).map(({ label, items }) => (
				<Container className={styles.column} key={unique.id()}>
					<List className={styles.list} label={t(label)}>
						{items
							.map((item: LinkProps) => {
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
		[t]
	);

	const siteLicenseCurrentYear = `${new Date().getFullYear()}`;
	const siteLicenseType = t('common:license:label');
	const siteLicenseLabel = `${siteLicenseType}-${t(
		'common:license:attributs'
	)}`;
	const siteTitleWithLicense = `2021-${siteLicenseCurrentYear} ${siteLicenseLabel} ${title}`;

	const verticalMenu = useMemo(
		() => (
			<Drawer
				direction={textDirection === 'ltr' ? 'right' : 'left'}
				open={open}
				onClose={toggle}
				className={styles.root}
			>
				<Scrollbar className={styles.root} textDirection={textDirection}>
					<Button onClick={toggle} asChild>
						<Cross2Icon />
					</Button>
					<Logo />
					<TextLink label={t('common:site:title')} linked={!isHome} />
					<Strip />
					<LocaleSelect
						defaultValue={lang}
						options={localeItems}
						onSelect={(id) => void setLocale(id)}
						// onSelect={(id) => void setLocale(id)}
					/>
					<ThemeSelect
						label={themeLabel}
						theme={theme}
						setTheme={setTheme}
					></ThemeSelect>
					<VerticalNav items={navItems} onClose={toggle} />
				</Scrollbar>
			</Drawer>
		),
		[
			textDirection,
			open,
			toggle,
			t,
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

	return (
		<>
			<Head
				siteTitle={t('common:site:title')}
				siteSubtitle={t('common:site:subtitle')}
				title={title}
				pageName={pageName}
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
				>
					<header data-testid="topbar">
						<Container alignItemsCenter className={styles.siteTitle}>
							<Logo />
							<TextLink label={t('common:site:title')} linked={!isHome} />
							<Separator />
							<Text variant="subtitle2" className={styles.subtitle}>
								{t('common:site:subtitle')}
							</Text>
						</Container>
						{isMobile ? (
							<VerticalMenuTrigger onClick={toggle} />
						) : (
							<Container alignItemsCenter>
								<HorizontalNav items={navItems} />
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
				<Page>{children}</Page>
				<Strip />
				<Container fullWidth asChild>
					<footer className={styles.footer}>
						<div className={styles.pageContainer}>
							<div className={styles.footerLayout}>
								<div className={classNames(styles.column)}>
									<Text
										variant="h1"
										uppercase={true}
										aria-label={siteTitleWithLicense}
									>
										<time className="year">2021-{siteLicenseCurrentYear}</time>
										<span className="license">{siteLicenseType}</span>
										<span className="title">{t('common:site:title')}</span>
									</Text>
									<Text italics={true}>{t('common:site:subtitle')}</Text>
									<Text lowercase>{t('common:site:shortSiteDescription')}</Text>
								</div>
								{footerItems}
							</div>
						</div>
					</footer>
				</Container>
				{isMobile && verticalMenu}
			</Scrollbar>
			{!IS_DEBUG ?? <Analytics />}
		</>
	);
};

export default Layout;
