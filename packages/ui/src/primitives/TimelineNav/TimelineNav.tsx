import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './TimelineNav.module.css';

/* --- Root --- */

export interface TimelineNavProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export function TimelineNav({
	children,
	className,
	...props
}: TimelineNavProps) {
	return (
		<nav className={cn(styles.root, 'ml-timeline-nav', className)} {...props}>
			{children}
		</nav>
	);
}

/* --- Section --- */

export interface TimelineSectionProps extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	labelHref?: string;
	children?: ReactNode;
}

export function TimelineSection({
	label,
	labelHref,
	children,
	className,
	...props
}: TimelineSectionProps) {
	return (
		<div
			className={cn(styles.section, 'ml-timeline-section', className)}
			{...props}
		>
			{label &&
				(labelHref ? (
					<a href={labelHref} className={styles.sectionLink}>
						<h3 className={styles.sectionHeader}>{label}</h3>
					</a>
				) : (
					<h3 className={styles.sectionHeader}>{label}</h3>
				))}
			{children && <ul className={styles.list}>{children}</ul>}
		</div>
	);
}

/* --- Item --- */

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
	active?: boolean;
	children: ReactNode;
}

export function TimelineItem({
	active,
	children,
	className,
	...props
}: TimelineItemProps) {
	return (
		<li
			className={cn(
				styles.item,
				'ml-timeline-item',
				active && [styles.itemActive, 'ml-timeline-item-active'],
				className,
			)}
			{...props}
		>
			{children}
		</li>
	);
}
