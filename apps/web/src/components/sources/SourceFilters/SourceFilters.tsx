'use client';

import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { Badge, Button, TextField } from '@mels-loop/ui/primitives';
import {
	ClipboardCopyIcon,
	Cross2Icon,
	DotsVerticalIcon,
	ExternalLinkIcon,
} from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Header,
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
			size: 220,
			minSize: 120,
			cell: ({ row }) => (
				<span className={styles.nameText}>{row.original.title}</span>
			),
		},
		{
			id: 'description',
			accessorFn: (row) => row.summary ?? row.description,
			header: columnLabels.description,
			minSize: 120,
			cell: ({ getValue }) => (
				<span className={styles.descText}>{(getValue() as string) ?? '—'}</span>
			),
		},
		{
			accessorKey: 'type',
			header: columnLabels.type,
			size: 110,
			minSize: 60,
			cell: ({ getValue }) => {
				const type = getValue() as SourceType;
				return (
					<Badge radius="sm" bordered>
						{typeLabels[type] ?? type}
					</Badge>
				);
			},
		},
	];
}

function SortableHeader({
	header,
}: {
	header: Header<ResolvedSource, unknown>;
}) {
	const isDesc = header.id === 'description';
	return (
		<div
			className={styles.th}
			style={{
				width: isDesc ? undefined : header.getSize(),
				flex: isDesc ? '1 1 0%' : undefined,
				cursor: header.column.getCanSort() ? 'pointer' : 'default',
				userSelect: 'none',
			}}
			onClick={header.column.getToggleSortingHandler()}
		>
			{flexRender(header.column.columnDef.header, header.getContext())}
			{{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? ''}
		</div>
	);
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
						<ClipboardCopyIcon />
						{copied ? 'Copied!' : 'Copy ID'}
					</button>
					{source.url && (
						<a
							href={source.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.detailAction}
							onClick={(e) => e.stopPropagation()}
						>
							<ExternalLinkIcon />
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
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!expandedId) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setExpandedId(null);
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [expandedId]);

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
		enableColumnResizing: false,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const { rows } = table.getRowModel();

	const handleFilter = (type: SourceType | null) => {
		setActiveType(type);
		setExpandedId(null);
		viewportRef.current?.scrollTo(0, 0);
	};

	return (
		<>
			<div className={styles.toolbar}>
				<div className={styles.filters}>
					<Button
						variant="outlined"
						size="sm"
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
							size="sm"
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
				<div className={styles.toolbarEnd}>
					<TextField
						type="search"
						size="sm"
						placeholder={columnLabels.searchPlaceholder}
						value={globalFilter}
						onChange={(e) => {
							setGlobalFilter(e.target.value);
							setExpandedId(null);
							viewportRef.current?.scrollTo(0, 0);
						}}
					/>
				</div>
			</div>
			{globalFilter.trim() && (
				<p className={styles.resultCount}>
					{rows.length} {rows.length === 1 ? 'result' : 'results'}
				</p>
			)}
			<div className={styles.tableWrap} dir={dir}>
				<div className={styles.headerRow}>
					{table
						.getHeaderGroups()
						.map((headerGroup) =>
							headerGroup.headers.map((header) => (
								<SortableHeader key={header.id} header={header} />
							)),
						)}
					<div style={{ width: 28, flexShrink: 0 }} />
				</div>
				<ScrollArea.Root
					className={styles.scrollRoot}
					dir={dir}
					style={maxHeight ? { height: maxHeight } : undefined}
				>
					<ScrollArea.Viewport
						ref={viewportRef}
						className={styles.scrollViewport}
					>
						<div className={styles.listBody}>
							{rows.map((row) => {
								const isExpanded = row.original.id === expandedId;
								return (
									<div
										key={row.id}
										className={`${styles.row} ${isExpanded ? styles.rowExpanded : ''}`}
									>
										<div
											className={styles.rowCells}
											onClick={() => setExpandedId(row.original.id)}
										>
											{row.getVisibleCells().map((cell) => {
												const isDesc = cell.column.id === 'description';
												return (
													<div
														key={cell.id}
														className={isDesc ? styles.cellDesc : styles.cell}
														style={
															isDesc
																? undefined
																: {
																		width: cell.column.getSize(),
																	}
														}
													>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</div>
												);
											})}
											{isExpanded ? (
												<button
													type="button"
													className={styles.cellClose}
													onClick={(e) => {
														e.stopPropagation();
														setExpandedId(null);
													}}
												>
													<Cross2Icon />
												</button>
											) : (
												<div className={styles.cellActions}>
													<DotsVerticalIcon />
												</div>
											)}
										</div>
										<div
											className={styles.detailWrap}
											data-open={isExpanded || undefined}
										>
											<div className={styles.detailInner}>
												<SourceDetail source={row.original} />
											</div>
										</div>
									</div>
								);
							})}
						</div>
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
