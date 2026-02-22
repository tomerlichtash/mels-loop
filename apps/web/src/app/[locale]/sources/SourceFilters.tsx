'use client';

import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import { SourceCard } from '@mels-loop/ui/content';
import { useState } from 'react';

import styles from './page.module.css';

interface SourceGroup {
	type: SourceType;
	label: string;
	sources: ResolvedSource[];
}

interface SourceFiltersProps {
	groups: SourceGroup[];
	allLabel: string;
}

export function SourceFilters({ groups, allLabel }: SourceFiltersProps) {
	const [activeType, setActiveType] = useState<SourceType | null>(null);

	const totalCount = groups.reduce((sum, g) => sum + g.sources.length, 0);
	const visibleGroups = activeType
		? groups.filter((g) => g.type === activeType)
		: groups;

	return (
		<>
			<div className={styles.filters}>
				<button
					type="button"
					className={styles.filterButton}
					data-active={activeType === null || undefined}
					onClick={() => setActiveType(null)}
				>
					{allLabel}
					<span className={styles.filterCount}>{totalCount}</span>
				</button>
				{groups.map((group) => (
					<button
						key={group.type}
						type="button"
						className={styles.filterButton}
						data-active={activeType === group.type || undefined}
						onClick={() => setActiveType(group.type)}
					>
						{group.label}
						<span className={styles.filterCount}>{group.sources.length}</span>
					</button>
				))}
			</div>
			{visibleGroups.map((group) => (
				<section key={group.type} className={styles.group}>
					<h2 className={styles.groupHeading}>{group.label}</h2>
					<div className={styles.cards}>
						{group.sources.map((source) => (
							<SourceCard key={source.id} source={source} />
						))}
					</div>
				</section>
			))}
		</>
	);
}
