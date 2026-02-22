'use client';

import { usePathname } from 'next/navigation';
import { AsideSection } from './AsideSection';
import styles from './Asides.module.css';

export interface AsideItem {
	slug: string;
	title: string;
	href: string;
	author?: string;
}

export interface AsideSection {
	key: string;
	label: string;
	href: string;
	items: AsideItem[];
}

interface AsidesProps {
	sections: AsideSection[];
}

export function Asides({ sections }: AsidesProps) {
	const pathname = usePathname();

	return (
		<nav className={styles.root}>
			{sections.map((section) => (
				<AsideSection key={section.key} section={section} pathname={pathname} />
			))}
		</nav>
	);
}
