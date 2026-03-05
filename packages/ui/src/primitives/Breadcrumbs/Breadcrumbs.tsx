import { ChevronRightIcon } from '@radix-ui/react-icons';
import cn from 'classnames';
import type { ComponentType, ReactNode } from 'react';

import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface LinkProps {
	href: string;
	className?: string;
	children: ReactNode;
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	linkComponent?: ComponentType<LinkProps>;
	'aria-label'?: string;
	className?: string;
}

export function Breadcrumbs({
	items,
	linkComponent: LinkComponent,
	'aria-label': ariaLabel = 'Breadcrumb',
	className,
}: BreadcrumbsProps) {
	if (items.length <= 1) return null;

	const Anchor = LinkComponent || 'a';

	return (
		<nav
			className={cn(styles.root, 'ml-breadcrumbs', className)}
			aria-label={ariaLabel}
		>
			<ol className={styles.list}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={index} className={styles.item}>
							{index > 0 && (
								<span className={styles.separator} aria-hidden>
									<ChevronRightIcon />
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
								<Anchor href={item.href} className={styles.link}>
									{item.label}
								</Anchor>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
