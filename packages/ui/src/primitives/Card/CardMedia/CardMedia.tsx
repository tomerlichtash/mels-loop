import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './CardMedia.module.css';

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
	/** No image is rendered when this is empty. */
	src?: string;
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
	/*
	 * Nothing to show, so render nothing — not an empty media box. Rendering
	 * <img src=""> makes the browser re-request the current page as the image
	 * and React warns; keeping the wrapper without it just leaves a blank
	 * panel the size of the missing image. Story documents pass an empty
	 * string when a document has no thumbnail.
	 */
	if (!src && !overlay) return null;

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
			{/*
			 * Skip the <img> entirely when there is no source. Rendering
			 * src="" makes the browser re-request the current page as the
			 * image, and React warns about it. Guarded here rather than at the
			 * call sites so every caller is covered — story documents pass an
			 * empty string when a document has no thumbnail.
			 */}
			{src ? (
				<img
					className={cn(styles.image, styles[`fit-${objectFit}`])}
					src={src}
					alt={alt}
				/>
			) : null}
			{overlay && <div className={styles.overlay}>{overlay}</div>}
		</div>
	);
}
