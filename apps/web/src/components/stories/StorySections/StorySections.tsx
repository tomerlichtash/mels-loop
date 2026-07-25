'use client';

import { Button, Text, TextField, ToggleGroup } from '@mels-loop/ui/primitives';
import { Cross1Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
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
	allLabel: string;
	types: { value: string; label: string }[];
	searchPlaceholder: string;
	filterLabel: string;
	filterByLabel: string;
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
	const [filtersOpen, setFiltersOpen] = useState(false);

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

	const toggleItems = sourceFilters
		? [
				{
					value: 'all',
					label: <Text variant="caption">{sourceFilters.allLabel}</Text>,
				},
				...sourceFilters.types.map((t) => ({
					...t,
					label: <Text variant="caption">{t.label}</Text>,
				})),
			]
		: [];

	return (
		<>
			<div ref={sentinelRef} className={styles.sentinel} />
			<div
				className={[styles.root, stuck && styles.stuck]
					.filter(Boolean)
					.join(' ')}
			>
				<div className={styles.inner}>
					<nav className={styles.nav} aria-label="Story sections">
						{sections.map((section) => {
							const isActive = section.key === activeKey;
							return (
								<Link
									key={section.key}
									href={section.href}
									className={[styles.section, isActive && styles.sectionActive]
										.filter(Boolean)
										.join(' ')}
								>
									{section.label}
									{section.count != null && (
										<span className={styles.count}>({section.count})</span>
									)}
								</Link>
							);
						})}
					</nav>
					{showFilters && (
						<Button
							variant={filtersOpen ? 'outlined' : 'text'}
							size="xs"
							className={[
								styles.filterToggle,
								filtersOpen && styles.filterToggleOpen,
							]
								.filter(Boolean)
								.join(' ')}
							onClick={() => setFiltersOpen((v) => !v)}
							aria-label={sourceFilters.filterLabel}
							aria-expanded={filtersOpen}
						>
							<MixerHorizontalIcon className={styles.filterIconDefault} />
							<Cross1Icon className={styles.filterIconClose} />
						</Button>
					)}
				</div>
				<div className={styles.divider} />
				{showFilters && filtersOpen && (
					<div className={styles.filterPanel}>
						<div className={styles.filterPanelInner}>
							<Text variant="caption" className={styles.filterByLabel}>
								{sourceFilters.filterByLabel}
							</Text>
							<ToggleGroup
								value={activeType}
								items={toggleItems}
								onValueChange={(v) =>
									updateParams({ type: v === 'all' ? null : v })
								}
								aria-label={sourceFilters.filterByLabel}
							/>
							<TextField
								type="search"
								size="sm"
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
