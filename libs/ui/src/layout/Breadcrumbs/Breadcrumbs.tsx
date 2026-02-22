import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
	if (items.length <= 1) return null;

	return (
		<nav className={styles.root} aria-label="Breadcrumb">
			<ol className={styles.list}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={index} className={styles.item}>
							{index > 0 && (
								<span className={styles.separator} aria-hidden>
									/
								</span>
							)}
							{isLast || !item.href ? (
								<span
									className={styles.current}
									aria-current={isLast ? 'page' : undefined}
								>
									{item.label}
								</span>
							) : (
								<a href={item.href} className={styles.link}>
									{item.label}
								</a>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
