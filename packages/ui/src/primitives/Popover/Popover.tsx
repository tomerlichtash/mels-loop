'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixPopover from '@radix-ui/react-popover';
import cn from 'classnames';
import {
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
	type Ref,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import { CloseButton } from '../CloseButton/CloseButton';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import styles from './Popover.module.css';

type Side = 'top' | 'bottom' | 'left' | 'right';

/** How far the sheet must be dragged down before release dismisses it. */
const DISMISS_THRESHOLD_PX = 96;

/** Kept between the trigger and the top of the viewport when scrolling it clear. */
const SCROLL_MARGIN_PX = 96;

export interface PopoverProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	trigger: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	triggerRef?: Ref<any>;
	children: ReactNode;
	side?: Side;
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	/** Gap kept between the popover and the viewport edge. */
	collisionPadding?: number;
	/**
	 * Accessible name for the mobile sheet, which is a dialog and needs one.
	 * Ignored by the anchored popover, which is named by its trigger.
	 */
	title?: string;
	/**
	 * Rendered in the panel's toolbar, beside the close control — a trail, a
	 * back button, anything that acts on the panel rather than living in it.
	 *
	 * The toolbar is always present, even when this is empty, because the
	 * close control lives there. It sits above the scrolling region, so it
	 * stays put while the content moves under it.
	 */
	toolbar?: ReactNode;
	closeLabel?: string;
	className?: string;
}

/**
 * Anchored popover on a pointer device, bottom sheet on a phone.
 *
 * These are not a style variation of each other. Anchoring positions content
 * beside a word in a line of prose, which only works when there is room beside
 * that word — on a phone there is not, so the content either runs off-screen or
 * gets squeezed into an unreadable column. A sheet drops the anchor entirely
 * and takes the full width, which is why mobile platforms use one for this job.
 *
 * The sheet keeps `data-popover-content`, so consumers that close their
 * popovers by detecting pointer events outside that selector work unchanged.
 */
export function Popover({
	open,
	defaultOpen,
	onOpenChange,
	trigger,
	triggerRef,
	children,
	side = 'bottom',
	align = 'center',
	sideOffset = 8,
	collisionPadding = 8,
	title,
	toolbar,
	closeLabel = 'Close',
	className,
}: PopoverProps) {
	/*
	 * Starts false so the server render and the first client render agree on
	 * the anchored variant; the effect is client-only. Matches --ml-bp-mobile.
	 */
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia('(max-width: 767px)');
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	/*
	 * Swipe to dismiss, from the grab bar only. Dragging the body as well would
	 * mean disputing every touch with the scroll area underneath — the sheet
	 * would have to guess whether a downward drag meant "scroll up" or "close",
	 * and it guesses wrong exactly when the content is long enough to matter.
	 * The bar is the affordance anyway; it is what the handle is drawn for.
	 *
	 * The offset travels as a custom property rather than an inline transform,
	 * matching how Badge passes a colour through.
	 */
	/*
	 * The sheet is docked over the bottom of the page, so the word or marker
	 * that opened it is often underneath it — the reader loses the thing they
	 * just tapped, and with it the sentence giving it context. Scroll it into
	 * the band left above the sheet.
	 *
	 * The trigger is found through the sheet's own id rather than a ref.
	 * Consumers spread their own `ref` onto the trigger element, which competes
	 * with the one `asChild` composes, so a ref here is not dependable — but
	 * aria-controls points at exactly this sheet by construction.
	 */
	const sheetNode = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isMobile || !open) return;
		/* After the sheet has mounted, so its real height is measurable rather
		 * than assumed from the stylesheet. */
		const frame = requestAnimationFrame(() => {
			const sheet = sheetNode.current;
			if (!sheet?.id) return;
			const el = document.querySelector(
				`[aria-controls="${CSS.escape(sheet.id)}"]`,
			);
			if (!el) return;
			const rect = el.getBoundingClientRect();
			/*
			 * Derived from the sheet's layout height, not its current position.
			 * At this point the entry animation is still running, so the sheet
			 * is measured mid-slide near the bottom of the screen — every
			 * trigger then looks clear of it and nothing ever scrolled. Height
			 * is not animated, only the transform, so this is the resting top.
			 */
			const sheetTop = window.innerHeight - sheet.offsetHeight;
			const clear = rect.top >= SCROLL_MARGIN_PX && rect.bottom <= sheetTop;
			/* Already in the clear — moving the page under the reader for no
			 * reason is worse than leaving it alone. */
			if (clear) return;
			/* Centred in the band above the sheet, clamped so it can never end
			 * up under the sticky chrome at the top. */
			const desiredTop = Math.max(
				SCROLL_MARGIN_PX,
				(sheetTop - rect.height) / 2,
			);
			window.scrollBy({
				top: rect.top - desiredTop,
				behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
					? 'auto'
					: 'smooth',
			});
		});
		return () => cancelAnimationFrame(frame);
	}, [isMobile, open]);

	const dragStart = useRef<number | null>(null);
	const [dragY, setDragY] = useState(0);
	const [dragging, setDragging] = useState(false);

	const onDragStart = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		dragStart.current = e.clientY;
		setDragging(true);
		e.currentTarget.setPointerCapture(e.pointerId);
	}, []);

	const onDragMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
		if (dragStart.current === null) return;
		/* Downward only — an upward drag should not lift the sheet off the
		 * bottom edge and expose a gap beneath it. */
		setDragY(Math.max(0, e.clientY - dragStart.current));
	}, []);

	const onDragEnd = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (dragStart.current === null) return;
			const travelled = e.clientY - dragStart.current;
			dragStart.current = null;
			setDragging(false);
			setDragY(0);
			if (travelled > DISMISS_THRESHOLD_PX) onOpenChange?.(false);
		},
		[onOpenChange],
	);

	if (isMobile) {
		return (
			<RadixDialog.Root
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
			>
				<RadixDialog.Trigger asChild ref={triggerRef}>
					{trigger}
				</RadixDialog.Trigger>
				<RadixDialog.Portal>
					<RadixDialog.Overlay className={styles.sheetOverlay} />
					<RadixDialog.Content
						ref={sheetNode}
						className={cn(
							styles.sheet,
							dragging && styles.sheetDragging,
							'ml-popover-content',
							className,
						)}
						data-popover-content
						aria-describedby={undefined}
						style={{ '--ml-popover-sheet-drag': `${dragY}px` } as CSSProperties}
					>
						<RadixDialog.Title className={styles.visuallyHidden}>
							{title ?? closeLabel}
						</RadixDialog.Title>
						<div
							className={styles.sheetBar}
							onPointerDown={onDragStart}
							onPointerMove={onDragMove}
							onPointerUp={onDragEnd}
							onPointerCancel={onDragEnd}
						>
							<span className={styles.sheetHandle} aria-hidden="true" />
							{/* The same slot the anchored panel gives its toolbar, so a
							    trail follows the reader onto a phone too. */}
							<div className={styles.toolbarSlot}>{toolbar}</div>
							<RadixDialog.Close asChild>
								<CloseButton
									size="sm"
									aria-label={closeLabel}
									className={styles.sheetClose}
								/>
							</RadixDialog.Close>
						</div>
						<ScrollArea
							type="auto"
							className={styles.sheetScroll}
							viewportClassName={styles.sheetViewport}
						>
							{children}
						</ScrollArea>
					</RadixDialog.Content>
				</RadixDialog.Portal>
			</RadixDialog.Root>
		);
	}

	return (
		<RadixPopover.Root
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
		>
			<RadixPopover.Trigger asChild ref={triggerRef}>
				{trigger}
			</RadixPopover.Trigger>
			<RadixPopover.Portal>
				<RadixPopover.Content
					className={cn(styles.content, 'ml-popover-content', className)}
					data-popover-content
					side={side}
					align={align}
					sideOffset={sideOffset}
					collisionPadding={collisionPadding}
				>
					{/*
					 * The panel's toolbar: always present, above the scrolling
					 * region so it holds while the content moves under it.
					 *
					 * The close control used to float over the content, absolutely
					 * positioned, which meant it overlapped whatever happened to
					 * scroll beneath it and the trail sat somewhere else entirely —
					 * inside the scrolling body, so navigating between terms
					 * scrolled the way back out of sight.
					 */}
					<div className={styles.toolbar}>
						<div className={styles.toolbarSlot}>{toolbar}</div>
						<RadixPopover.Close asChild>
							<CloseButton
								size="sm"
								aria-label={closeLabel}
								className={styles.close}
							/>
						</RadixPopover.Close>
					</div>
					<ScrollArea
						type="auto"
						className={styles.scrollArea}
						viewportClassName={styles.scrollViewport}
					>
						{children}
					</ScrollArea>
					<RadixPopover.Arrow className={styles.arrow} width={14} height={7} />
				</RadixPopover.Content>
			</RadixPopover.Portal>
		</RadixPopover.Root>
	);
}
