import NextImage from 'next/image';

import styles from './Image.module.css';

const OPTIMIZED_HOSTS = ['mels-loop-media.s3.eu-north-1.amazonaws.com'];

function isOptimizedRemote(src: string): boolean {
	try {
		const url = new URL(src);
		return OPTIMIZED_HOSTS.includes(url.hostname);
	} catch {
		return false;
	}
}

interface ImageProps {
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
	[key: string]: unknown;
}

export function Image({ src, alt = '', width, height, ...props }: ImageProps) {
	if (!src) return null;

	const optimized =
		!src.endsWith('.svg') &&
		(!src.startsWith('http') || isOptimizedRemote(src));

	return (
		<NextImage
			/*
			 * The hook ImageViewer listens for. Every image in the prose is
			 * openable, and the page's images together form one gallery.
			 */
			data-zoomable=""
			src={src}
			alt={alt}
			width={width || 720}
			height={height || 400}
			className={styles.root}
			unoptimized={!optimized}
			{...props}
		/>
	);
}
