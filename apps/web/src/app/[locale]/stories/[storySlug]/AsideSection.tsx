import type { AsideSection } from './Asides';
import styles from './Asides.module.css';

interface AsideSectionProps {
	section: AsideSection;
	pathname: string;
}

export function AsideSection({ section, pathname }: AsideSectionProps) {
	const isSectionActive = pathname.endsWith(section.href);

	return (
		<div className={styles.section}>
			<h3 className={styles.sectionTitle}>
				<a
					href={section.href}
					className={[styles.sectionLink, isSectionActive ? styles.active : '']
						.filter(Boolean)
						.join(' ')}
					aria-current={isSectionActive ? 'page' : undefined}
				>
					{section.label}
				</a>
			</h3>
			{section.items.length > 0 && (
				<ul className={styles.list}>
					{section.items.map((item) => {
						const isActive = pathname.endsWith(item.href);
						return (
							<li key={item.slug}>
								<a
									href={item.href}
									className={[styles.link, isActive ? styles.active : '']
										.filter(Boolean)
										.join(' ')}
									aria-current={isActive ? 'page' : undefined}
								>
									{item.title}
								</a>
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
