'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import cn from 'classnames';
import { type HTMLAttributes, useRef, useState } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Avatar.module.css';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: AvatarSize;
}

export function Avatar({
	src,
	alt,
	fallback,
	size = 'md',
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
			{src && (
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
			{!src && (
				<AvatarPrimitive.Fallback className={styles.fallback}>
					{initials}
				</AvatarPrimitive.Fallback>
			)}
		</AvatarPrimitive.Root>
	);
}
