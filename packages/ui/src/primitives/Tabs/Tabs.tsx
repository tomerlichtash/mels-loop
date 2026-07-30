'use client';

import cn from 'classnames';
import {
	type ComponentType,
	type ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import { Badge } from '../Badge/Badge';
import styles from './Tabs.module.css';

export interface TabItem {
	key: string;
	href: string;
	label: ReactNode;
	/** Rendered after the label, de-emphasised. */
	count?: number;
	active?: boolean;
}

interface LinkProps {
	href: string;
	className?: string;
	'aria-current'?: 'page';
	children: ReactNode;
}

export interface TabsProps {
	items: TabItem[];
	/** Framework link (e.g. next/link). Falls back to a plain anchor. */
	linkComponent?: ComponentType<LinkProps>;
	'aria-label'?: string;
	className?: string;
}

/**
 * A horizontal tab strip that survives not fitting.
 *
 * Centred while the row fits, scrollable when it doesn't. The active tab is
 * marked by a single underline element that slides between tabs rather than a
 * per-tab border — a per-tab border cannot be animated between positions, and
 * changing the active tab's font weight instead would reflow the whole row on
 * every navigation.
 *
 * Edge fades and scroll chevrons appear **only on a side that actually has
 * content off-screen**, so a strip that fits shows neither. Fading both edges
 * unconditionally clips the first tab's underline for no reason.
 */
export function Tabs({
	items,
	linkComponent: LinkComponent,
	'aria-label': ariaLabel,
	className,
}: TabsProps) {
	const navRef = useRef<HTMLElement>(null);
	const indicatorRef = useRef<HTMLSpanElement>(null);
	const [fade, setFade] = useState({ start: false, end: false });
	const [overflowing, setOverflowing] = useState(false);
	const [animate, setAnimate] = useState(false);

	const Anchor = LinkComponent || 'a';
	const activeKey = items.find((i) => i.active)?.key;

	/*
	 * Writes are guarded on change. This runs from a scroll handler and a
	 * ResizeObserver, and an unconditional style write on every event turns
	 * into read/write layout thrashing.
	 */
	const positionIndicator = useCallback(() => {
		const nav = navRef.current;
		const indicator = indicatorRef.current;
		if (!nav || !indicator) return;
		const active = nav.querySelector('[aria-current="page"]');
		if (!(active instanceof HTMLElement)) {
			if (indicator.style.opacity !== '0') indicator.style.opacity = '0';
			return;
		}
		/*
		 * Physical `left`, deliberately, against the project's logical-property
		 * rule — see the note on .indicator in the stylesheet. offsetLeft is a
		 * distance from the left whatever the writing direction, and this pins
		 * an overlay onto a measured position rather than laying anything out,
		 * so the measurement and the property have to agree on which edge they
		 * mean. Feeding offsetLeft to inset-inline-start put the Hebrew
		 * underline under the wrong tab.
		 */
		const start = `${active.offsetLeft}px`;
		const width = `${active.offsetWidth}px`;
		if (indicator.style.opacity !== '1') indicator.style.opacity = '1';
		if (indicator.style.left !== start) indicator.style.left = start;
		if (indicator.style.width !== width) indicator.style.width = width;
	}, []);

	useLayoutEffect(() => {
		positionIndicator();
	}, [activeKey, items, positionIndicator]);

	/* Hold the transition back until after first paint, or the indicator
	 * visibly slides in from the left edge on load. */
	useEffect(() => {
		const frame = requestAnimationFrame(() => setAnimate(true));
		return () => cancelAnimationFrame(frame);
	}, []);

	/*
	 * Scrolls the strip only — deliberately not scrollIntoView, which also
	 * scrolls every ancestor scroll container including the document. This
	 * strip sits inside a sticky bar whose stuck state is driven by an
	 * IntersectionObserver, so a page scroll here feeds back into a re-render.
	 *
	 * Depends on `overflowing` as well as the active tab. On mount the strip
	 * has not laid out yet — widths are provisional until fonts settle — so
	 * scrollWidth still equals clientWidth and an effect keyed only on the
	 * active tab bails out and never retries. Re-running once the observer
	 * reports real overflow is what makes the active tab visible on load.
	 *
	 * Instant on the first pass: animating a scroll the reader never asked
	 * for, before the page has even settled, reads as a glitch.
	 */
	const hasScrolled = useRef(false);
	useEffect(() => {
		const nav = navRef.current;
		if (!nav || !overflowing) return;
		const active = nav.querySelector('[aria-current="page"]');
		if (!(active instanceof HTMLElement)) return;
		/*
		 * Centred by scrolling the measured gap between the two centres, rather
		 * than by computing an absolute scrollLeft. scrollLeft's origin and
		 * sign in RTL differ between engines — the reason the overflow check
		 * below reads rectangles too — while scrollBy takes a plain physical
		 * delta and needs no direction branch.
		 */
		const navRect = nav.getBoundingClientRect();
		const activeRect = active.getBoundingClientRect();
		const delta =
			activeRect.left +
			activeRect.width / 2 -
			(navRect.left + navRect.width / 2);
		nav.scrollBy({
			left: delta,
			behavior: hasScrolled.current ? 'smooth' : 'auto',
		});
		hasScrolled.current = true;
	}, [activeKey, overflowing]);

	/* Which side overflows is derived from the tab rectangles rather than
	 * scrollLeft, whose sign and origin differ across browsers in RTL. */
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;
		const update = () => {
			const navRect = nav.getBoundingClientRect();
			const tabs = nav.querySelectorAll(':scope > a');
			const first = tabs[0]?.getBoundingClientRect();
			const last = tabs[tabs.length - 1]?.getBoundingClientRect();
			if (!first || !last) return;
			setOverflowing(nav.scrollWidth - nav.clientWidth > 1);
			const rtl = getComputedStyle(nav).direction === 'rtl';
			setFade(
				rtl
					? {
							start: first.right - navRect.right > 1,
							end: navRect.left - last.left > 1,
						}
					: {
							start: navRect.left - first.left > 1,
							end: last.right - navRect.right > 1,
						},
			);
			positionIndicator();
		};
		/* Coalesced to one measurement per frame. Smooth scrolling fires scroll
		 * events continuously, and each one reads layout. */
		let frame = 0;
		const schedule = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				update();
			});
		};

		update();
		nav.addEventListener('scroll', schedule, { passive: true });
		const observer = new ResizeObserver(schedule);
		observer.observe(nav);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			nav.removeEventListener('scroll', schedule);
			observer.disconnect();
		};
	}, [items, positionIndicator]);

	const nudge = (direction: 1 | -1) => {
		const nav = navRef.current;
		nav?.scrollBy({
			left: direction * nav.clientWidth * 0.7,
			behavior: 'smooth',
		});
	};

	return (
		<div className={cn(styles.wrap, 'ml-tabs', className)}>
			{overflowing && (
				<button
					type="button"
					className={cn(styles.chevron, fade.start && styles.chevronEnabled)}
					onClick={() => nudge(-1)}
					aria-hidden="true"
					tabIndex={-1}
				>
					<span className={styles.chevronGlyph}>‹</span>
				</button>
			)}

			<nav
				ref={navRef}
				className={styles.root}
				aria-label={ariaLabel}
				data-fade-start={fade.start || undefined}
				data-fade-end={fade.end || undefined}
			>
				{items.map((item) => (
					<Anchor
						key={item.key}
						href={item.href}
						className={cn(styles.tab, item.active && styles.tabActive)}
						aria-current={item.active ? 'page' : undefined}
					>
						<span>{item.label}</span>
						{item.count != null && <Badge variant="count">{item.count}</Badge>}
					</Anchor>
				))}
				<span
					ref={indicatorRef}
					className={cn(styles.indicator, animate && styles.indicatorAnimated)}
					aria-hidden="true"
				/>
			</nav>

			{overflowing && (
				<button
					type="button"
					className={cn(styles.chevron, fade.end && styles.chevronEnabled)}
					onClick={() => nudge(1)}
					aria-hidden="true"
					tabIndex={-1}
				>
					<span className={styles.chevronGlyph}>›</span>
				</button>
			)}
		</div>
	);
}
