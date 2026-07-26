'use client';

import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { Badge, Button, TextField } from '@mels-loop/ui/primitives';
import {
	ArrowSquareOutIcon,
	CopyIcon,
	DotsThreeVerticalIcon,
	RowsIcon,
	XIcon,
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
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './SourceFilters.module.css';

interface SourceGroup {
	type: SourceType;
	label: string;
	sources: ResolvedSource[];
}

interface ColumnLabels {
	name: string;
	description: string;
	type: string;
	date: string;
	license: string;
	tags: string;
	source: string;
	searchPlaceholder: string;
}

interface SourceFiltersProps {
	groups: SourceGroup[];
	allLabel: string;
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
			header: columnLabels.source,
			cell: ({ row }) => (
				<span className={styles.nameText}>{row.original.title}</span>
			),
		},
		{
			id: 'description',
			accessorFn: (row) => row.summary ?? row.description,
			header: columnLabels.description,
			cell: ({ getValue }) => (
				<span className={styles.descText}>{(getValue() as string) ?? '—'}</span>
			),
		},
		{
			accessorKey: 'type',
			header: columnLabels.type,
			cell: ({ getValue }) => {
				const type = getValue() as SourceType;
				return (
					<Badge radius="sm" bordered>
						{typeLabels[type] ?? type}
					</Badge>
				);
			},
		},
		{
			accessorKey: 'date',
			header: columnLabels.date,
			cell: ({ getValue }) => (
				<span className={styles.metaText}>{(getValue() as string) ?? '—'}</span>
			),
		},
		{
			accessorKey: 'license',
			header: columnLabels.license,
			cell: ({ getValue }) => {
				const license = getValue() as string | undefined;
				return (
					<span className={styles.metaText}>
						{license && license !== 'unknown' ? license : '—'}
					</span>
				);
			},
		},
		{
			id: 'tags',
			accessorFn: (row) => row.tags?.join(', ') ?? '',
			header: columnLabels.tags,
			cell: ({ row }) => {
				const tags = row.original.tags;
				if (!tags || tags.length === 0)
					return <span className={styles.metaText}>—</span>;
				return (
					<div className={styles.cellTags}>
						{tags.map((tag) => (
							<span key={tag} className={styles.cellTag}>
								{tag}
							</span>
						))}
					</div>
				);
			},
		},
	];
}

function SourceDetail({ source }: { source: ResolvedSource }) {
	const [copied, setCopied] = useState(false);

	const handleCopyId = (e: React.MouseEvent) => {
		e.stopPropagation();
		navigator.clipboard.writeText(source.id);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className={styles.detail} onClick={(e) => e.stopPropagation()}>
			{source.type === 'image' && source.url && (
				<div className={styles.detailPreview}>
					<Image
						src={source.url}
						alt={source.title}
						width={120}
						height={120}
						className={styles.detailImage}
						unoptimized
					/>
				</div>
			)}
			<div className={styles.detailLeft}>
				<h4 className={styles.detailTitle}>{source.title}</h4>
				{source.description && (
					<p className={styles.detailDesc}>{source.description}</p>
				)}
				<div className={styles.detailActions}>
					<button
						type="button"
						className={styles.detailAction}
						onClick={handleCopyId}
					>
						<CopyIcon />
						{copied ? 'Copied!' : 'Copy ID'}
					</button>
					{/*
					 * originUrl first, and nothing at all for an image without one:
					 * url holds the copy we host, so this opened a bare file on S3
					 * with no title, no credit and no way back.
					 */}
					{(source.originUrl ??
						(source.type !== 'image' ? source.url : null)) && (
						<a
							href={source.originUrl ?? source.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.detailAction}
							onClick={(e) => e.stopPropagation()}
						>
							<ArrowSquareOutIcon />
							Open source
						</a>
					)}
				</div>
			</div>
			<div className={styles.detailRight}>
				<div className={styles.detailMeta}>
					{source.author && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>Author</span>
							{source.author}
						</span>
					)}
					{source.date && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>Date</span>
							{source.date}
						</span>
					)}
					{source.credit && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>Credit</span>
							{source.credit}
						</span>
					)}
					{source.license && source.license !== 'unknown' && (
						<span className={styles.detailField}>
							<span className={styles.detailLabel}>License</span>
							{source.license}
						</span>
					)}
				</div>
				{source.tags && source.tags.length > 0 && (
					<div className={styles.detailTags}>
						{source.tags.map((tag) => (
							<span key={tag} className={styles.detailTag}>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export function SourceFilters({
	groups,
	allLabel,
	typeLabels,
	columnLabels,
	dir,
	maxHeight,
}: SourceFiltersProps) {
	const [activeType, setActiveType] = useState<SourceType | null>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
	const viewportRef = useRef<HTMLDivElement>(null);

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

	const totalCount = groups.reduce((sum, g) => sum + g.sources.length, 0);

	const data = useMemo(() => {
		if (!activeType) return groups.flatMap((g) => g.sources);
		return groups
			.filter((g) => g.type === activeType)
			.flatMap((g) => g.sources);
	}, [groups, activeType]);

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

	const handleFilter = (type: SourceType | null) => {
		setActiveType(type);
		viewportRef.current?.scrollTo(0, 0);
	};

	const expandAll = () => {
		setExpandedIds(new Set(rows.map((r) => r.original.id)));
	};

	const collapseAll = () => {
		setExpandedIds(new Set());
	};

	return (
		<>
			<div className={styles.toolbar}>
				<div className={styles.toolbarInner}>
					<div className={styles.toolbarStart}>
						<TextField
							type="search"
							size="sm"
							placeholder={columnLabels.searchPlaceholder}
							value={globalFilter}
							onChange={(e) => {
								setGlobalFilter(e.target.value);
								setExpandedIds(new Set());
								viewportRef.current?.scrollTo(0, 0);
							}}
						/>
					</div>
					<div className={styles.filters}>
						<Button
							variant="outlined"
							size="xs"
							active={activeType === null}
							onClick={() => handleFilter(null)}
						>
							{allLabel}
							<span className={styles.filterCount}>({totalCount})</span>
						</Button>
						{groups.map((group) => (
							<Button
								key={group.type}
								variant="outlined"
								size="xs"
								active={activeType === group.type}
								onClick={() => handleFilter(group.type)}
							>
								{group.label}
								<span className={styles.filterCount}>
									({group.sources.length})
								</span>
							</Button>
						))}
					</div>
					<Button
						variant="outlined"
						size="xs"
						onClick={expandedIds.size > 0 ? collapseAll : expandAll}
					>
						{expandedIds.size > 0 ? <RowsIcon /> : <RowsIcon />}
						{expandedIds.size > 0 ? 'Collapse' : 'Expand'}
					</Button>
				</div>
			</div>
			{globalFilter.trim() && (
				<p className={styles.resultCount}>
					{rows.length} {rows.length === 1 ? 'result' : 'results'}
				</p>
			)}
			<div className={styles.tableWrap} dir={dir}>
				<ScrollArea.Root
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
										<th className={styles.thActions} />
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
												{isExpanded ? (
													<button
														type="button"
														className={styles.cellClose}
														onClick={(e) => {
															e.stopPropagation();
															toggleExpanded(row.original.id);
														}}
													>
														<XIcon />
													</button>
												) : (
													<div className={styles.cellActions}>
														<DotsThreeVerticalIcon />
													</div>
												)}
											</td>
										</tr>
										{isExpanded && (
											<tr className={styles.detailRow}>
												<td
													colSpan={columns.length + 1}
													className={styles.tdDetail}
												>
													<SourceDetail source={row.original} />
												</td>
											</tr>
										)}
									</tbody>
								);
							})}
						</table>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						className={styles.scrollbar}
						orientation="vertical"
					>
						<ScrollArea.Thumb className={styles.scrollThumb} />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
			</div>
		</>
	);
}
