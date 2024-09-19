'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { useLocale, useWindowSize, useDrawer } from 'hooks';
import { useIconAnimator } from 'favicon-animator';
import { Container, Scrollbar, Strip } from '@melsloop/ml-components';
import { MIN_DESKTOP_WIDTH, MIN_SCROLLBAR_HEIGHT } from '../consts';
import CustomHead from 'components/CustomHead/CustomHead';
import SiteHeader from 'components/SiteHeader/SiteHeader';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import SiteDrawer from 'components/SiteDrawer/SiteDrawer';
import styles from './Layout.module.css';
import Analytics from 'components/Analytics/Analytics';

const Layout = ({ children }) => {
	const router = useRouter();
	const { textDirection } = useLocale();
	const { width: screenWidth } = useWindowSize();
	const isMobile = screenWidth <= MIN_DESKTOP_WIDTH;
	const { open: drawerOpen, toggle: toggleDrawer } = useDrawer(isMobile);

	useIconAnimator(router);

	return (
		<>
			<CustomHead />
			<Scrollbar
				textDirection={textDirection}
				height={MIN_SCROLLBAR_HEIGHT}
				className={styles.root}
			>
				<SiteHeader
					isMobile={isMobile}
					toggleDrawer={toggleDrawer}
				/>
				<Container>
					<Container className={styles.page}>{children}</Container>
				</Container>
				<Strip />
				<SiteFooter className={styles.footer} />
				<SiteDrawer
					isMobile={isMobile}
					opened={drawerOpen}
					toggle={toggleDrawer}
				/>
			</Scrollbar>
			<Analytics />
		</>
	);
};

export default Layout;
