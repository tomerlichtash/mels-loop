import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './CardMedia.module.css';

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
	src: string;
	alt?: string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none';
	horizontal?: boolean;
	overlay?: ReactNode;
}

export function CardMedia({
	src,
	alt = '',
	objectFit = 'cover',
	horizontal,
	overlay,
	className,
	...props
}: CardMediaProps) {
	return (
		<div
			className={cn(
				styles.root,
				{ [styles.horizontal]: horizontal },
				'ml-card-media',
				className,
			)}
			{...props}
		>
			<img
				className={cn(styles.image, styles[`fit-${objectFit}`])}
				src={src}
				alt={alt}
			/>
			{overlay && <div className={styles.overlay}>{overlay}</div>}
		</div>
	);
}
