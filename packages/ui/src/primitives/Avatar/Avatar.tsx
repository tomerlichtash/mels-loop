'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import cn from 'classnames';
import { type HTMLAttributes, type ReactNode, useRef, useState } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Avatar.module.css';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: AvatarSize;
	/**
	 * A ready-made image element, rendered instead of the plain `<img>` that
	 * `src` produces. Takes precedence over `src`.
	 *
	 * This exists so an app can hand in a framework's optimising image
	 * component — `next/image`, say — without this package taking a dependency
	 * on that framework. The story header did exactly that: a 2 MB portrait
	 * downloaded in full to fill a 92px circle, on every page of the story,
	 * because the avatar was the one image on the site that never reached the
	 * image optimiser.
	 *
	 * A slot rather than `asChild`, which looks like the obvious answer and is
	 * not: `AvatarPrimitive.Image` tracks loading by calling
	 * `new window.Image()` with the `src` it is given, so the original would
	 * still be fetched no matter what the child rendered. The slot skips that
	 * component altogether, and with it Radix's fade-in and loader — neither of
	 * which an optimised image needs, since it arrives in a few kilobytes and
	 * brings its own placeholder handling.
	 */
	image?: ReactNode;
}

export function Avatar({
	src,
	alt,
	fallback,
	size = 'md',
	image,
	className,
	...props
}: AvatarProps) {
	const [loaded, setLoaded] = useState(false);
	const hasLoaded = useRef(false);

	const initials =
		fallback ||
		(alt
			? alt
					.split(' ')
					.map((w) => w[0])
					.join('')
					.slice(0, 2)
					.toUpperCase()
			: '?');

	const handleLoad = () => {
		if (!hasLoaded.current) {
			hasLoaded.current = true;
			setLoaded(true);
		}
	};

	return (
		<AvatarPrimitive.Root
			className={cn(
				styles.root,
				styles[`size-${size}`],
				'ml-avatar',
				className,
			)}
			{...props}
		>
			{image && <span className={styles.imageSlot}>{image}</span>}
			{!image && src && (
				<>
					<AvatarPrimitive.Image
						className={cn(styles.image, {
							[styles.imageLoaded]: loaded || hasLoaded.current,
						})}
						src={src}
						alt={alt}
						onLoadingStatusChange={(status) => {
							if (status === 'loaded') handleLoad();
						}}
					/>
					{!loaded && !hasLoaded.current && (
						<Loader
							size="sm"
							color="primary"
							label="Loading avatar"
							className={styles.loader}
						/>
					)}
				</>
			)}
			{!image && !src && (
				<AvatarPrimitive.Fallback className={styles.fallback}>
					{initials}
				</AvatarPrimitive.Fallback>
			)}
		</AvatarPrimitive.Root>
	);
}
