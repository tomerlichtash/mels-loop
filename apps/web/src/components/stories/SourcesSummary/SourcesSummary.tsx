import Link from 'next/link';

import styles from './SourcesSummary.module.css';

export interface SourceSummaryItem {
	label: string;
	count: number;
}

interface SourcesSummaryProps {
	label: string;
	items: SourceSummaryItem[];
	href: string;
}

export function SourcesSummary({ label, items, href }: SourcesSummaryProps) {
	return (
		<div className={styles.root}>
			<Link href={href} className={styles.label}>
				{label}
				<span className={styles.chevron}>›</span>
			</Link>
			<div className={styles.items}>
				{items.map((item) => (
					<span key={item.label} className={styles.item}>
						<span>{item.label}</span>
						<span className={styles.count}>{item.count}</span>
					</span>
				))}
			</div>
		</div>
	);
}
