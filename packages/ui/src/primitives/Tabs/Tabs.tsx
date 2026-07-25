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
	const [animate, setAnimate] = useState(false);

	const Anchor = LinkComponent || 'a';
	const activeKey = items.find((i) => i.active)?.key;

	const positionIndicator = useCallback(() => {
		const nav = navRef.current;
		const indicator = indicatorRef.current;
		if (!nav || !indicator) return;
		const active = nav.querySelector('[aria-current="page"]');
		if (!(active instanceof HTMLElement)) {
			indicator.style.opacity = '0';
			return;
		}
		indicator.style.opacity = '1';
		indicator.style.insetInlineStart = `${active.offsetLeft}px`;
		indicator.style.width = `${active.offsetWidth}px`;
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

	useEffect(() => {
		const nav = navRef.current;
		const active = nav?.querySelector('[aria-current="page"]');
		active?.scrollIntoView({
			inline: 'center',
			block: 'nearest',
			behavior: 'smooth',
		});
	}, [activeKey]);

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
		update();
		nav.addEventListener('scroll', update, { passive: true });
		const observer = new ResizeObserver(update);
		observer.observe(nav);
		return () => {
			nav.removeEventListener('scroll', update);
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
			<button
				type="button"
				className={cn(
					styles.chevron,
					styles.chevronStart,
					fade.start && styles.chevronVisible,
				)}
				onClick={() => nudge(-1)}
				aria-hidden="true"
				tabIndex={-1}
			>
				<span className={styles.chevronGlyph}>‹</span>
			</button>

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
						{item.count != null && (
							<span className={styles.count}>({item.count})</span>
						)}
					</Anchor>
				))}
				<span
					ref={indicatorRef}
					className={cn(styles.indicator, animate && styles.indicatorAnimated)}
					aria-hidden="true"
				/>
			</nav>

			<button
				type="button"
				className={cn(
					styles.chevron,
					styles.chevronEnd,
					fade.end && styles.chevronVisible,
				)}
				onClick={() => nudge(1)}
				aria-hidden="true"
				tabIndex={-1}
			>
				<span className={styles.chevronGlyph}>›</span>
			</button>
		</div>
	);
}
