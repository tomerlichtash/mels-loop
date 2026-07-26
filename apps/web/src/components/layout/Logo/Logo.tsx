import Image from 'next/image';
import Link from 'next/link';

import styles from './Logo.module.css';

interface LogoProps {
	isHome: boolean;
	siteTitle: string;
}

export function Logo({ isHome, siteTitle }: LogoProps) {
	const content = (
		<>
			<span className={styles.icon}>
				<Image
					src="/assets/ml-logo-light.png"
					alt=""
					width={24}
					height={24}
					className={styles.imgLight}
				/>
				<Image
					src="/assets/ml-logo-dark.png"
					alt=""
					width={24}
					height={24}
					className={styles.imgDark}
				/>
			</span>
			<span className={styles.text}>{siteTitle}</span>
		</>
	);
	return isHome ? (
		<span className={styles.root}>{content}</span>
	) : (
		<Link href="/" className={styles.link}>
			{content}
		</Link>
	);
}
