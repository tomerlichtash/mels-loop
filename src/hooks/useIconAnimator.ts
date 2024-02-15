import { useEffect } from 'react';
import { NextRouter } from 'next/router';
import { FavIconAnimator } from '../layout/favicon-animator/faviconAnimator';
import type { IFavIconProps } from '../layout/favicon-animator/types';

const ICON_ANIMATOR_PROPS: IFavIconProps = {
	type: 'rotate',
	durationSeconds: 2,
	height: 32,
	width: 32,
	debug: true,
	// TODO: Use light logo when dark mode is enabled
	image: '/assets/logo/ml-logo-dark.png',
};

export const useIconAnimator = (router: NextRouter) => {
	useEffect(() => {
		new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
	}, [router.asPath]);

	useEffect(() => {
		const handleRouteChange = () => {
			new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
		};
		router.events.on('routeChangeStart', handleRouteChange);
		return () => router.events.off('routeChangeStart', handleRouteChange);
	}, [router.events]);

	return {};
};
