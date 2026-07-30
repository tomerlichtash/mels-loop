'use client';

import { Button, Tabs, TextField } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import {
	usePathname,
	useRouter,
	useSearchParams,
	useSelectedLayoutSegment,
} from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './StorySections.module.css';

export interface StorySection {
	key: string;
	label: string;
	count?: number;
	href: string;
}

export interface SourceFilterConfig {
	searchPlaceholder: string;
	clearLabel: string;
}

interface StorySectionsProps {
	sections: StorySection[];
	sourceFilters?: SourceFilterConfig;
}

export function StorySections({ sections, sourceFilters }: StorySectionsProps) {
	const segment = useSelectedLayoutSegment();
	// Match the URL segment to a tab key; fall back to 'codex' for the story root
	const activeKey = segment ?? 'codex';
	const sentinelRef = useRef<HTMLDivElement>(null);
	const [stuck, setStuck] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const activeType = searchParams.get('type') ?? 'all';
	const search = searchParams.get('q') ?? '';

	const updateParams = useCallback(
		(updates: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams.toString());
			for (const [key, val] of Object.entries(updates)) {
				if (val === null || val === '') {
					params.delete(key);
				} else {
					params.set(key, val);
				}
			}
			const qs = params.toString();
			router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
		},
		[searchParams, pathname, router],
	);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) =>
			setStuck(!entry.isIntersecting),
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const showFilters = activeKey === 'sources' && sourceFilters;

	if (sections.length === 0) return null;

	return (
		<>
			<div ref={sentinelRef} className={styles.sentinel} />
			<div
				className={[styles.root, stuck && styles.stuck]
					.filter(Boolean)
					.join(' ')}
			>
				<div className={styles.inner}>
					<Tabs
						className={styles.nav}
						aria-label="Story sections"
						linkComponent={Link}
						items={sections.map((section) => ({
							key: section.key,
							href: section.href,
							label: section.label,
							count: section.count ?? undefined,
							active: section.key === activeKey,
						}))}
					/>
				</div>
				<div className={styles.divider} />
				{showFilters && (
					<div>
						<div className={styles.filterPanelInner}>
							<TextField
								type="search"
								size="md"
								placeholder={sourceFilters.searchPlaceholder}
								value={search}
								onChange={(e) => updateParams({ q: e.target.value })}
								className={styles.filterSearch}
							/>
							{(activeType !== 'all' || search) && (
								<Button
									variant="text"
									size="xs"
									onClick={() => updateParams({ type: null, q: null })}
								>
									{sourceFilters.clearLabel}
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
