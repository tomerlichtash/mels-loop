'use client';

import { useEffect } from 'react';

import { animateFavicon } from './favicon-animator';

const ANIMATOR_OPTIONS = {
	durationSeconds: 2,
	width: 32,
	height: 32,
	image: '/assets/ml-logo-light.png',
};

export function FaviconAnimator() {
	useEffect(() => {
		const abort = animateFavicon(ANIMATOR_OPTIONS);
		return abort;
	}, []);

	return null;
}
