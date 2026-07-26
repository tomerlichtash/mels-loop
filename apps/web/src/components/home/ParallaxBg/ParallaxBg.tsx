'use client';

import { useEffect, useRef } from 'react';

interface ParallaxBgProps {
	className?: string;
	/** Parallax speed factor — 0 = fixed, 1 = normal scroll, 0.5 = half speed */
	speed?: number;
}

export function ParallaxBg({ className, speed = 0.4 }: ParallaxBgProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const scrollY = window.scrollY;
				el.style.transform = `translateY(${scrollY * speed}px)`;
				ticking = false;
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [speed]);

	return <div ref={ref} className={className} aria-hidden="true" />;
}
