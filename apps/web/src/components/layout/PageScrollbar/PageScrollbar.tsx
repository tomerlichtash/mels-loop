'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './PageScrollbar.module.css';

/** Never let the thumb shrink to an ungrabbable sliver on a very long page. */
const MIN_THUMB_PX = 32;

/**
 * An overlay scrollbar for the page, drawn on top of the content.
 *
 * The native scrollbar cannot do this. A classic (always-visible) scrollbar
 * reserves a column and pushes the page in; an overlay scrollbar does not, but
 * fades out when idle, which is what macOS was doing. Those are the only two
 * native options, and neither is "always visible and floating above".
 *
 * The alternative — moving the page into a scroll container — is worse than it
 * looks: the browser only collapses its address bar for *document* scrolling,
 * so a phone would permanently lose that strip of viewport, and scroll
 * restoration, hash anchors and every `window.scrollY` reader would need
 * rewriting. So the document keeps scrolling natively and this draws the bar.
 *
 * Pointer-driven only. Touch platforms keep their own scrollbar, which already
 * floats and already appears while scrolling — see the media query in the CSS.
 */
export function PageScrollbar() {
	const thumbRef = useRef<HTMLDivElement>(null);
	const frame = useRef(0);
	const drag = useRef<{ startY: number; startScroll: number } | null>(null);
	const [scrollable, setScrollable] = useState(false);

	const measure = useCallback(() => {
		const el = document.documentElement;
		const thumb = thumbRef.current;
		if (!thumb) return;

		const viewport = el.clientHeight;
		const content = el.scrollHeight;
		const overflow = content - viewport;

		if (overflow <= 1) {
			setScrollable(false);
			return;
		}
		setScrollable(true);

		const height = Math.max(MIN_THUMB_PX, (viewport / content) * viewport);
		const progress = Math.min(1, Math.max(0, window.scrollY / overflow));
		const travel = viewport - height;

		thumb.style.height = `${height}px`;
		thumb.style.transform = `translateY(${progress * travel}px)`;
	}, []);

	/* Coalesced to one measurement per frame — scroll fires continuously and
	 * each pass reads layout. */
	const schedule = useCallback(() => {
		if (frame.current) return;
		frame.current = requestAnimationFrame(() => {
			frame.current = 0;
			measure();
		});
	}, [measure]);

	useEffect(() => {
		measure();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		/* The page grows and shrinks as routes and images settle, which changes
		 * both whether it scrolls at all and how tall the thumb should be. */
		const observer = new ResizeObserver(schedule);
		observer.observe(document.body);
		return () => {
			if (frame.current) cancelAnimationFrame(frame.current);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			observer.disconnect();
		};
	}, [measure, schedule]);

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.button !== 0) return;
		drag.current = { startY: e.clientY, startScroll: window.scrollY };
		e.currentTarget.setPointerCapture(e.pointerId);
		e.preventDefault();
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const state = drag.current;
		const thumb = thumbRef.current;
		if (!state || !thumb) return;
		const el = document.documentElement;
		const viewport = el.clientHeight;
		const overflow = el.scrollHeight - viewport;
		const travel = viewport - thumb.offsetHeight;
		if (travel <= 0) return;
		/* Pixels of thumb travel map onto pixels of document overflow. */
		const delta = ((e.clientY - state.startY) / travel) * overflow;
		window.scrollTo({ top: state.startScroll + delta });
	};

	const onPointerUp = () => {
		drag.current = null;
	};

	return (
		<div className={styles.track} aria-hidden="true" data-visible={scrollable}>
			<div
				ref={thumbRef}
				className={styles.thumb}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
			/>
		</div>
	);
}
