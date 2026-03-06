import { Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import type { AsideSection } from '../Asides/Asides';
import styles from '../Asides/Asides.module.css';

interface AsideSectionProps {
	section: AsideSection;
	pathname: string;
}

export function AsideSection({ section, pathname }: AsideSectionProps) {
	const isSectionActive = pathname.endsWith(section.href);

	return (
		<div className={styles.section}>
			<Text component="h3" variant="label" className={styles.sectionTitle}>
				<Link
					href={section.href}
					className={[styles.sectionLink, isSectionActive ? styles.active : '']
						.filter(Boolean)
						.join(' ')}
					aria-current={isSectionActive ? 'page' : undefined}
				>
					{section.label}
				</Link>
			</Text>
			{section.items.length > 0 && (
				<ul className={styles.list}>
					{section.items.map((item) => {
						const isActive = pathname.endsWith(item.href);
						return (
							<li
								key={item.slug}
								className={[styles.item, isActive ? styles.itemActive : '']
									.filter(Boolean)
									.join(' ')}
							>
								<Link
									href={item.href}
									className={[styles.link, isActive ? styles.active : '']
										.filter(Boolean)
										.join(' ')}
									aria-current={isActive ? 'page' : undefined}
								>
									{item.title}
								</Link>
								{item.author && (
									<span className={styles.author}>{item.author}</span>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
