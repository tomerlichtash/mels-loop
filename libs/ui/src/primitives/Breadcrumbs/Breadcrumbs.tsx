import cn from 'classnames';

import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
	if (items.length <= 1) return null;

	return (
		<nav
			className={cn(styles.root, 'ml-breadcrumbs', className)}
			aria-label="Breadcrumb"
		>
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
