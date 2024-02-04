import classNames from 'classnames';
import { unique } from 'lib/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
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
import { footerLinks } from '@config/footer';
import { MenuItems } from '@config/siteNav/items';
import { MenuSections } from '@config/siteNav/sections';
import { Cross2Icon } from '@radix-ui/react-icons';
import { LocaleProvider } from '../../locale/context/locale-context';
import { parseMenuItems } from '../helpers';
import { Analytics } from './analytics';
import { Head } from './customHead';
import styles from './Layout.module.scss';
import { useIconAnimator } from './useIconAnimator';
import { useWindowSize } from './useWindowSize';
import type { NavParsedNodes } from '../HorizontalMenu';
import type { LocaleId } from 'locale/locale-context';

type LayoutProps = {
	title?: string;
};

const IS_DEBUG = process.env.NEXT_PUBLIC_ML_DEBUG;
const MIN_DESKTOP_WIDTH = 1024;

const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
	const router = useRouter();
	const size = useWindowSize();
	const { theme, setTheme } = useTheme();
	const isMobile = size.width <= MIN_DESKTOP_WIDTH;
	const { open, toggle } = useDrawer(isMobile);
	const isHome = router.pathname === '/';

	const {
		siteTitle,
		siteSubtitle,
		textDirection,
		pageName,
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(LocaleProvider);

	useIconAnimator(router, locale);

	const getThemeName = (theme: string) => {
		return theme === 'dark' ? 'light' : 'dark';
	};

	const themeLabel = useMemo(() => {
		return `${translate('site.components.themeSelector.switchTo')} ${translate(
			`site.components.themeSelector.theme.${getThemeName(theme)}`
		)}`;
	}, [theme, translate]);

	const navItems: NavParsedNodes[] = useMemo(
		() => parseMenuItems(MenuSections, MenuItems, translate),
		[translate]
	);

	const localeItems = useMemo(
		() =>
			locales.map((id) => ({
				id,
				label: getLocaleSymbol(id),
				title: translate(`${getLocaleLabel(id)}_LABEL`),
			})),
		[getLocaleLabel, getLocaleSymbol, locales, translate]
	);

	const footerItems = useMemo(
		() =>
			Object.keys(footerLinks).map((sectionLabel) => (
				<Container className={styles.column} key={unique.id()}>
					<List className={styles.list} label={translate(sectionLabel)}>
						{footerLinks[sectionLabel]
							.map((item) => {
								return { ...item, label: translate(item.label) };
							})
							.map(({ label, target, url }) => {
								return (
									<ListItem key={unique.id()} className={styles.item}>
										{url ? (
											<Link href={url} target={target} className={styles.link}>
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
					<TextLink label={siteTitle} linked={!isHome} />
					<Strip />
					<LocaleSelect
						defaultValue={locale}
						options={localeItems}
						onSelect={(id: LocaleId) => void onLocaleChange(id)}
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
			localeItems,
			navItems,
			isHome,
			locale,
			textDirection,
			siteTitle,
			theme,
			themeLabel,
			open,
			onLocaleChange,
			setTheme,
			toggle,
		]
	);

	return (
		<>
			<Head
				siteTitle={siteTitle}
				siteSubtitle={siteSubtitle}
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
							<TextLink label={siteTitle} linked={!isHome} />
							<Separator />
							<Text variant="subtitle2" className={styles.subtitle}>
								{siteSubtitle}
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
										onSelect={(id: LocaleId) => void onLocaleChange(id)}
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
										<span className="title">{siteTitle}</span>
									</Text>
									<Text italics={true}>{siteSubtitle}</Text>
									<Text lowercase>{translate('MENU_ITEM_DESC_ID_ABOUT')}</Text>
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
