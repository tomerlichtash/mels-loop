'use client';

import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { Combobox, TextField, Tooltip } from '@mels-loop/ui/primitives';
import {
	ArrowsInSimpleIcon,
	ArrowsOutSimpleIcon,
	EyeIcon,
} from '@phosphor-icons/react/ssr';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { formatSourceDate } from '@/lib/format-date';
import { isImageUrl } from '@/lib/source-media';

import styles from './SourceFilters.module.css';

interface SourceGroup {
	type: SourceType;
	label: string;
	sources: ResolvedSource[];
}

interface ColumnLabels {
	title: string;
	type: string;
	filterByType: string;
	standing: string;
	date: string;
	year: string;
	license: string;
	source: string;
	author: string;
	repository: string;
	clear: string;
	toggle: string;
	empty: string;
	searchPlaceholder: string;
	viewRecord: string;
	expand: string;
	collapse: string;
	resultsOne: string;
	resultsMany: string;
}

interface SourceFiltersProps {
	groups: SourceGroup[];
	locale: string;
	typeLabels: Record<SourceType, string>;
	columnLabels: ColumnLabels;
	dir: 'ltr' | 'rtl';
	maxHeight?: string;
}

function createColumns(
	columnLabels: ColumnLabels,
	typeLabels: Record<SourceType, string>,
): ColumnDef<ResolvedSource, unknown>[] {
	return [
		{
			accessorKey: 'title',
			header: columnLabels.title,
			cell: ({ row }) => (
				/* title attribute, not a tooltip: the cell truncates with an
				 * ellipsis and hover shows the full text natively. */
				<span className={styles.nameText} title={row.original.title}>
					{row.original.title}
				</span>
			),
		},
		{
			accessorKey: 'author',
			header: columnLabels.author,
			cell: ({ getValue }) => (
				<span className={styles.metaText}>{(getValue() as string) ?? '—'}</span>
			),
		},
		{
			accessorKey: 'date',
			header: columnLabels.year,
			/* Every date in the archive leads with its year — the full date,
			 * localized, stays in the expanded entry. */
			cell: ({ getValue }) => {
				const value = getValue() as string | undefined;
				const year = value?.match(/^\d{4}/)?.[0];
				return <span className={styles.metaText}>{year ?? '—'}</span>;
			},
		},
		{
			accessorKey: 'type',
			header: columnLabels.type,
			cell: ({ getValue }) => {
				const type = getValue() as SourceType;
				return (
					<span className={styles.metaText}>{typeLabels[type] ?? type}</span>
				);
			},
		},
	];
}

function SourceDetail({
	source,
	labels,
	locale,
}: {
	source: ResolvedSource;
	labels: ColumnLabels;
	locale: string;
}) {
	/* No catalogue data → no meta rail. An empty bordered column beside the
	 * description (the bitsavers manuals, say) reads as a rendering bug. */
	const hasMeta = Boolean(
		source.source ||
		source.author ||
		source.date ||
		source.repository ||
		(source.license && source.license !== 'unknown'),
	);
	return (
		<div className={styles.detail}>
			<div className={styles.detailBody}>
				<div className={styles.detailLeft}>
					{source.description && (
						<p className={styles.detailDesc}>{source.description}</p>
					)}
				</div>
				{isImageUrl(source.url) && (
					<div className={styles.detailPreview}>
						{/* data-zoomable hands the image to the page's lightbox; the
						 * data-source attributes give the slide its credit line and
						 * its way through to the record. */}
						<Image
							src={source.url}
							alt={source.title}
							width={120}
							height={120}
							className={styles.detailImage}
							unoptimized
							data-zoomable=""
							data-source-id={source.id}
							{...(source.author && { 'data-source-author': source.author })}
							{...(source.repository && {
								'data-source-repository': source.repository,
							})}
							{...(source.license && {
								'data-source-license': source.license,
							})}
						/>
					</div>
				)}
			</div>
			{hasMeta && (
				<div className={styles.detailMeta}>
					{source.source && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>{labels.source}</span>
							{source.source}
						</span>
					)}
					{source.date && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>{labels.date}</span>
							{formatSourceDate(source.date, locale)}
						</span>
					)}
					{source.author && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>{labels.author}</span>
							{source.author}
						</span>
					)}
					{source.repository && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>{labels.repository}</span>
							{source.repository}
						</span>
					)}
					{source.license && source.license !== 'unknown' && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>{labels.license}</span>
							{source.license}
						</span>
					)}
				</div>
			)}
		</div>
	);
}

/** Parses a comma-separated URL param against a set of known values. */
function fromParam<T extends string>(
	value: string | null,
	known: (v: string) => v is T,
): Set<T> {
	return new Set((value?.split(',') ?? []).filter(known));
}

export function SourceFilters({
	groups,
	locale,
	typeLabels,
	columnLabels,
	dir,
	maxHeight,
}: SourceFiltersProps) {
	const searchParams = useSearchParams();
	/* Filters live in the URL too, so a filtered view can be linked. State is
	 * seeded from the params once; after that the URL follows the state. */
	const [activeTypes, setActiveTypes] = useState<Set<SourceType>>(() =>
		fromParam(
			searchParams.get('type'),
			(v): v is SourceType => v in typeLabels,
		),
	);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState(
		() => searchParams.get('q') ?? '',
	);
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
	const viewportRef = useRef<HTMLDivElement>(null);
	const scrollRootRef = useRef<HTMLDivElement>(null);

	/*
	 * The box's height is "viewport minus everything above it", and what is
	 * above it differs per route (h1 on /sources, tab strip on a story) and
	 * per locale. Estimating that with CSS constants kept drifting, so the
	 * real offset is measured once and handed to the CSS calc as a variable.
	 */
	useEffect(() => {
		const el = scrollRootRef.current;
		if (!el) return;
		const measure = () => {
			const top = el.getBoundingClientRect().top + window.scrollY;
			el.style.setProperty('--table-top', `${top}px`);
		};
		measure();
		window.addEventListener('resize', measure);
		document.fonts?.ready.then(measure);
		return () => window.removeEventListener('resize', measure);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		for (const [key, value] of [
			['type', [...activeTypes].join(',')],
			['q', globalFilter.trim()],
		] as const) {
			if (value) params.set(key, value);
			else params.delete(key);
		}
		const qs = params.toString();
		/* replaceState, not router.replace: purely client-side state, no server
		 * round trip, no scroll reset, no history spam while typing. */
		window.history.replaceState(
			null,
			'',
			qs ? `?${qs}` : window.location.pathname,
		);
	}, [activeTypes, globalFilter]);

	const toggleExpanded = (id: string) => {
		setExpandedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	useEffect(() => {
		if (expandedIds.size === 0) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setExpandedIds(new Set());
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [expandedIds]);

	const columns = useMemo(
		() => createColumns(columnLabels, typeLabels),
		[columnLabels, typeLabels],
	);

	const data = useMemo(() => {
		const byType = activeTypes.size
			? groups.filter((g) => activeTypes.has(g.type))
			: groups;
		return byType.flatMap((g) => g.sources);
	}, [groups, activeTypes]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, globalFilter },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const { rows } = table.getRowModel();

	const expandAll = () => {
		setExpandedIds(new Set(rows.map((r) => r.original.id)));
	};

	const collapseAll = () => {
		setExpandedIds(new Set());
	};

	return (
		/*
		 * Filters live in a rail beside the table, not in a toolbar above it —
		 * multi-select chips grow the field vertically, and in a toolbar that
		 * growth shoved the table down the page. In a rail it costs nothing.
		 */
		<div className={styles.layout}>
			<aside className={styles.rail}>
				<div className={styles.railInner}>
					<TextField
						type="search"
						size="sm"
						fullWidth
						placeholder={columnLabels.searchPlaceholder}
						value={globalFilter}
						onChange={(e) => {
							setGlobalFilter(e.target.value);
							setExpandedIds(new Set());
							viewportRef.current?.scrollTo(0, 0);
						}}
					/>
					{/* Dropdown filters: pick one or several values, the selection
					 * renders as dismissible chips inside the field. No "All"
					 * entry — an empty selection already means everything. */}
					<Combobox
						multiple
						size="sm"
						fullWidth
						options={groups.map((group) => ({
							value: group.type,
							label: `${group.label} (${group.sources.length})`,
						}))}
						value={[...activeTypes]}
						onValueChange={(next) => {
							setActiveTypes(new Set(next as SourceType[]));
							viewportRef.current?.scrollTo(0, 0);
						}}
						placeholder={columnLabels.filterByType}
						clearLabel={columnLabels.clear}
						toggleLabel={columnLabels.toggle}
						emptyMessage={columnLabels.empty}
					/>
				</div>
			</aside>
			<div className={styles.tableWrap} dir={dir}>
				<ScrollArea.Root
					ref={scrollRootRef}
					className={styles.scrollRoot}
					dir={dir}
					style={maxHeight ? { height: maxHeight } : undefined}
				>
					<ScrollArea.Viewport
						ref={viewportRef}
						className={styles.scrollViewport}
					>
						<table className={styles.table}>
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												className={styles.th}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{{
													asc: ' ↑',
													desc: ' ↓',
												}[header.column.getIsSorted() as string] ?? ''}
											</th>
										))}
										<th className={styles.thActions}>
											{/* Acts on every row below it, so it lives above them —
											 * beside the search field it read as an input action. */}
											<Tooltip
												label={
													expandedIds.size > 0
														? columnLabels.collapse
														: columnLabels.expand
												}
											>
												<button
													type="button"
													className={styles.headerToggle}
													onClick={
														expandedIds.size > 0 ? collapseAll : expandAll
													}
													aria-label={
														expandedIds.size > 0
															? columnLabels.collapse
															: columnLabels.expand
													}
												>
													{expandedIds.size > 0 ? (
														<ArrowsInSimpleIcon />
													) : (
														<ArrowsOutSimpleIcon />
													)}
												</button>
											</Tooltip>
										</th>
									</tr>
								))}
							</thead>
							{rows.map((row) => {
								const isExpanded = expandedIds.has(row.original.id);
								return (
									<tbody
										key={row.id}
										className={[
											styles.rowGroup,
											isExpanded && styles.rowGroupExpanded,
										]
											.filter(Boolean)
											.join(' ')}
									>
										<tr
											className={styles.row}
											onClick={() => toggleExpanded(row.original.id)}
										>
											{row.getVisibleCells().map((cell) => (
												<td key={cell.id} className={styles.td}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</td>
											))}
											<td className={styles.tdActions}>
												{/* Floats over the row's end, out of the table layout —
												 * its presence never changes column widths. */}
												<Tooltip label={columnLabels.viewRecord}>
													<a
														href={`/sources/${row.original.id}`}
														className={styles.rowEye}
														aria-label={columnLabels.viewRecord}
														onClick={(e) => e.stopPropagation()}
													>
														<EyeIcon />
													</a>
												</Tooltip>
											</td>
										</tr>
										{isExpanded && (
											<tr className={styles.detailRow}>
												<td
													colSpan={columns.length + 1}
													className={styles.tdDetail}
												>
													<SourceDetail
														source={row.original}
														labels={columnLabels}
														locale={locale}
													/>
												</td>
											</tr>
										)}
									</tbody>
								);
							})}
						</table>

						<p className={styles.resultCount}>
							{rows.length === 1
								? columnLabels.resultsOne
								: columnLabels.resultsMany.replace(
										'{count}',
										String(rows.length),
									)}
						</p>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						className={styles.scrollbar}
						orientation="vertical"
					>
						<ScrollArea.Thumb className={styles.scrollThumb} />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
			</div>
		</div>
	);
}
