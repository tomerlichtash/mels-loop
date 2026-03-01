import cn from 'classnames';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';

import styles from './Card.module.css';

type CardRadius = 'none' | 'sm' | 'md' | 'lg';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardVariant = 'outlined' | 'inset';
type CardDirection = 'vertical' | 'horizontal';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	variant?: CardVariant;
	radius?: CardRadius;
	padding?: CardPadding;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
	interactive?: boolean;
	selected?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	direction?: CardDirection;
	href?: string;
}

export function Card({
	children,
	variant = 'outlined',
	radius = 'md',
	padding = 'md',
	shadow,
	interactive,
	selected,
	disabled,
	fullWidth,
	direction = 'vertical',
	href,
	className,
	onClick,
	onKeyDown,
	...props
}: CardProps) {
	const isInteractive = interactive && !disabled;

	const handleKeyDown = isInteractive
		? (e: KeyboardEvent<HTMLDivElement>) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					e.currentTarget.click();
				}
				onKeyDown?.(e);
			}
		: onKeyDown;

	return (
		<div
			className={cn(
				styles.root,
				styles[`variant-${variant}`],
				styles[`radius-${radius}`],
				styles[`padding-${padding}`],
				styles[`direction-${direction}`],
				shadow && styles[`shadow-${shadow}`],
				{
					[styles.interactive]: isInteractive,
					[styles.selected]: selected,
					[styles.disabled]: disabled,
					[styles.fullWidth]: fullWidth,
				},
				'ml-card',
				className,
			)}
			role={interactive ? 'button' : undefined}
			tabIndex={isInteractive ? 0 : undefined}
			aria-pressed={
				interactive && selected !== undefined ? selected : undefined
			}
			aria-disabled={disabled || undefined}
			onClick={isInteractive ? onClick : undefined}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{children}
			{href && (
				<a
					href={href}
					className={styles.link}
					aria-hidden="true"
					tabIndex={-1}
				/>
			)}
		</div>
	);
}
