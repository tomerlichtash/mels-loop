'use client';

import React, { useMemo } from 'react';
import { Container } from '@melsloop/ml-components';
import SiteTitle from 'components/SiteTitle/SiteTitle';
import LocaleSelect from 'components/LocaleSelect/LocaleSelect';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import DrawerTrigger from 'components/DrawerTrigger/DrawerTrigger';
import SiteHeaderNavigation from './SiteHeaderNavigation';
import classNames from 'classnames';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
	isMobile?: boolean;
	toggleDrawer?: () => void;
	className?: boolean;
};
const SiteHeader = ({ isMobile, toggleDrawer, className }: SiteHeaderProps) =>
	useMemo(
		() => (
			<Container
				sticky
				stickyPosition="top"
				className={classNames(styles.root, className)}
				horizontalPadding="0.75em"
				verticalPadding="0.25em"
				asChild
			>
				<header data-testid="topbar">
					<SiteTitle />
					{isMobile ? (
						<DrawerTrigger onClick={toggleDrawer} />
					) : (
						<Container justifyContent="end">
							<SiteHeaderNavigation />
							<LocaleSelect className={styles.localeSelect} />
							<ThemeSelect className={styles.themeSelect} />
						</Container>
					)}
				</header>
			</Container>
		),
		[className, isMobile, toggleDrawer]
	);

export default SiteHeader;
