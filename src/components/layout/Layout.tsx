import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { unique } from 'utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useIconAnimator, useLocale, useWindowSize } from 'hooks';
import { useDrawer } from '../drawer/useDrawer';
import {
	Button,
	Container,
	Drawer,
	HorizontalNav,
	Link,
	List,
	ListItem,
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
} from '../index';
import { Head } from './customHead';
import { Analytics } from './analytics';
import { parseMenuItems } from '../helpers';
import { Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './Layout.module.scss';

import { default as menuItemsData } from 'config/navItems.json' assert { type: 'json' };
import { default as menuSectionData } from 'config/navSections.json' assert { type: 'json' };
import { default as footerLinksData } from 'config/layoutFooterLinks.json' assert { type: 'json' };

import type { LocaleId } from 'types/locale';
import type {
	NavItemDataProps,
	NavParsedNodes,
	NavSectionDataProps,
} from '../HorizontalMenu/types';
import type { LayoutProps, LinkSectionProps } from './types';

const IS_DEBUG = process.env.NEXT_PUBLIC_ML_DEBUG;
const MIN_DESKTOP_WIDTH = 1024;

const Layout = ({
	title,
	pageName,
	children,
}: PropsWithChildren<LayoutProps>) => {
	const router = useRouter();
	const { width: screenWidth } = useWindowSize();

	const isMobile = screenWidth <= MIN_DESKTOP_WIDTH;
	const isHome = router.pathname === '/';

	const { theme, setTheme } = useTheme();
	const { open, toggle } = useDrawer(isMobile);

	const {
		locale,
		locales,
		textDirection,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
	} = useLocale();

	const onLocaleChange = useCallback(
		(id: LocaleId) =>
			router.push(router.asPath, router.asPath, {
				locale: id,
				scroll: true,
			}),
		[router]
	);

	useIconAnimator(router, locale);

	const getThemeName = (theme: string) => {
		return theme === 'dark' ? 'light' : 'dark';
	};

	const themeLabel = useMemo(() => {
		return `${translate(
			'site.layout.components.themeSelector.switchTo'
		)} ${translate(
			`site.layout.components.themeSelector.theme.${getThemeName(theme)}`
		)}`;
	}, [theme, translate]);

	const navItems: NavParsedNodes[] = useMemo(
		() =>
			parseMenuItems(
				menuSectionData as NavSectionDataProps[],
				menuItemsData as NavItemDataProps[],
				translate
			),
		[translate]
	);

	const localeItems = useMemo(
		() =>
			locales.map((id) => ({
				id,
				label: getLocaleSymbol(id),
				title: getLocaleLabel(id),
			})),
		[getLocaleLabel, getLocaleSymbol, locales]
	);

	const footerItems = useMemo(
		() =>
			(footerLinksData as LinkSectionProps[]).map(({ label, items }) => (
				<Container className={styles.column} key={unique.id()}>
					<List className={styles.list} label={translate(label)}>
						{items
							.map((item) => {
								return { ...item, label: translate(item.label) };
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
		[translate]
	);

	const siteLicenseCurrentYear = `${new Date().getFullYear()}`;
	const siteLicenseType = translate('site.license.label');
	const siteLicenseLabel = `${siteLicenseType}-${translate(
		'site.license.attributs'
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
					<TextLink label={translate('site.title')} linked={!isHome} />
					<Strip />
					<LocaleSelect
						defaultValue={locale}
						options={localeItems}
						onSelect={(id) => void onLocaleChange(id)}
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
			isHome,
			locale,
			localeItems,
			themeLabel,
			theme,
			navItems,
			toggle,
			translate,
			setTheme,
			onLocaleChange,
		]
	);

	return (
		<>
			<Head
				siteTitle={translate('site.title')}
				siteSubtitle={translate('site.subtitle')}
				title={title}
				pageName={pageName}
			/>
			<Scrollbar
				textDirection={textDirection}
				height="100vh"
				className={styles.root}
				data-locale={locale}
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
					<header>
						<Container alignItemsCenter className={styles.siteTitle}>
							<Logo />
							<TextLink label={translate('site.title')} linked={!isHome} />
							<Separator />
							<Text variant="subtitle2" className={styles.subtitle}>
								{translate('site.subtitle')}
							</Text>
						</Container>
						{isMobile ? (
							<VerticalMenuTrigger onClick={toggle} />
						) : (
							<Container alignItemsCenter>
								<HorizontalNav items={navItems} />
								<>
									<LocaleSelect
										defaultValue={locale}
										options={localeItems}
										onSelect={(id) => void onLocaleChange(id)}
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
										<span className="title">{translate('site.title')}</span>
									</Text>
									<Text italics={true}>{translate('site.subtitle')}</Text>
									<Text lowercase>{translate('footer.siteDescription')}</Text>
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
