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

export default function Image({
	src,
	alt = '',
	width,
	height,
	...props
}: ImageProps) {
	if (!src) return null;

	if (src.endsWith('.svg')) {
		return <img src={src} alt={alt} {...props} />;
	}

	if (!src.startsWith('http') || isOptimizedRemote(src)) {
		return (
			<NextImage
				src={src}
				alt={alt}
				width={width || 720}
				height={height || 400}
				className={styles.root}
				{...props}
			/>
		);
	}

	return <img src={src} alt={alt} {...props} />;
}
