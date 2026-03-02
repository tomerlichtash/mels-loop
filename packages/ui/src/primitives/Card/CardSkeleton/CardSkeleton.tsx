import cn from 'classnames';
import type { ComponentProps } from 'react';

import { Card } from '../Card';
import styles from './CardSkeleton.module.css';

export interface CardSkeletonProps extends ComponentProps<typeof Card> {
	lines?: number;
	withMedia?: boolean;
	withHeader?: boolean;
	withFooter?: boolean;
	withActions?: boolean;
}

export function CardSkeleton({
	lines = 3,
	withMedia,
	withHeader = true,
	withFooter,
	withActions,
	className,
	orientation,
	...cardProps
}: CardSkeletonProps) {
	const isHorizontal = orientation === 'horizontal';
	return (
		<Card
			className={cn('ml-card-skeleton', className)}
			orientation={orientation}
			aria-hidden="true"
			{...cardProps}
		>
			{withMedia && (
				<div
					className={cn(styles.media, isHorizontal && styles.mediaHorizontal)}
				/>
			)}
			{withHeader && (
				<div className={styles.header}>
					<div className={cn(styles.line, styles.title)} />
				</div>
			)}
			<div className={styles.body}>
				{Array.from({ length: lines }, (_, i) => (
					<div
						key={i}
						className={styles.line}
						style={i === lines - 1 ? { width: '60%' } : undefined}
					/>
				))}
			</div>
			{withFooter && (
				<div className={styles.footer}>
					<div className={cn(styles.line, styles.footerLine)} />
				</div>
			)}
			{withActions && (
				<div className={styles.actions}>
					<div className={cn(styles.line, styles.button)} />
					<div className={cn(styles.line, styles.button)} />
				</div>
			)}
		</Card>
	);
}
