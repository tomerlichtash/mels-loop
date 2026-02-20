import Image from 'next/image';
import styles from './OptimizedImage.module.css';

const OPTIMIZED_HOSTS = ['mels-loop-media.s3.eu-north-1.amazonaws.com'];

function isOptimizedRemote(src: string): boolean {
	try {
		const url = new URL(src);
		return OPTIMIZED_HOSTS.includes(url.hostname);
	} catch {
		return false;
	}
}

interface OptimizedImageProps {
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
	[key: string]: unknown;
}

export function OptimizedImage({
	src,
	alt = '',
	width,
	height,
	...props
}: OptimizedImageProps) {
	if (!src) return null;

	if (src.endsWith('.svg')) {
		return <img src={src} alt={alt} {...props} />;
	}

	if (!src.startsWith('http') || isOptimizedRemote(src)) {
		return (
			<Image
				src={src}
				alt={alt}
				width={width || 720}
				height={height || 400}
				className={styles.responsive}
				{...props}
			/>
		);
	}

	return <img src={src} alt={alt} {...props} />;
}
