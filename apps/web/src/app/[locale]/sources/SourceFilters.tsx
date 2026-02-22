'use client';

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
	type ColumnDef,
	type ColumnOrderState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Header,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type CSSProperties, useMemo, useRef, useState } from 'react';

import styles from './page.module.css';

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
}

function parseYear(date: string | undefined): number {
	if (!date) return 0;
	const match = date.match(/\d{4}/);
	return match ? Number(match[0]) : 0;
}

function createColumns(
	columnLabels: ColumnLabels,
	typeLabels: Record<SourceType, string>,
): ColumnDef<ResolvedSource, unknown>[] {
	return [
		{
			id: 'thumb',
			header: '',
			size: 48,
			enableSorting: false,
			enableGlobalFilter: false,
			cell: ({ row }) => {
				const source = row.original;
				return source.type === 'image' && source.url ? (
					<img src={source.url} alt="" className={styles.thumbnail} />
				) : (
					<span className={styles.thumbPlaceholder}>
						{source.type.charAt(0).toUpperCase()}
					</span>
				);
			},
		},
		{
			accessorKey: 'title',
			header: columnLabels.name,
			cell: ({ row }) => (
				<a href={`/sources/${row.original.id}`} className={styles.nameLink}>
					{row.original.title}
				</a>
			),
		},
		{
			accessorKey: 'description',
			header: columnLabels.description,
			cell: ({ getValue }) => (
				<span className={styles.descText}>{(getValue() as string) ?? '—'}</span>
			),
		},
		{
			accessorKey: 'type',
			header: columnLabels.type,
			size: 90,
			cell: ({ getValue }) => {
				const type = getValue() as SourceType;
				return (
					<span className={styles.typeBadge} data-type={type}>
						{typeLabels[type] ?? type}
					</span>
				);
			},
		},
		{
			accessorKey: 'date',
			header: columnLabels.date,
			size: 80,
			sortingFn: (a, b) =>
				parseYear(a.original.date) - parseYear(b.original.date),
			cell: ({ getValue }) => (getValue() as string) ?? '—',
		},
		{
			id: 'source',
			header: columnLabels.source,
			size: 64,
			enableSorting: false,
			enableGlobalFilter: false,
			cell: ({ row }) =>
				row.original.url ? (
					<a
						href={row.original.url}
						className={styles.sourceLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						↗
					</a>
				) : (
					'—'
				),
		},
	];
}

const DEFAULT_COLUMN_IDS = [
	'thumb',
	'title',
	'description',
	'type',
	'date',
	'source',
];

function DraggableHeader({
	header,
}: {
	header: Header<ResolvedSource, unknown>;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: header.id });

	const thStyle: CSSProperties = {
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.6 : 1,
		cursor: header.column.getCanSort() ? 'pointer' : 'grab',
		userSelect: 'none',
		position: 'relative',
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<th
			ref={setNodeRef}
			className={
				header.id === 'no'
					? styles.thNo
					: header.id === 'thumb'
						? styles.thThumb
						: styles.th
			}
			style={thStyle}
			onClick={header.column.getToggleSortingHandler()}
			{...attributes}
			{...listeners}
		>
			{flexRender(header.column.columnDef.header, header.getContext())}
			{{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? ''}
		</th>
	);
}

export function SourceFilters({
	groups,
	allLabel,
	typeLabels,
	columnLabels,
	dir,
}: SourceFiltersProps) {
	const [activeType, setActiveType] = useState<SourceType | null>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [columnOrder, setColumnOrder] =
		useState<ColumnOrderState>(DEFAULT_COLUMN_IDS);
	const viewportRef = useRef<HTMLDivElement>(null);

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
		state: { sorting, globalFilter, columnOrder },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onColumnOrderChange: setColumnOrder,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const { rows } = table.getRowModel();

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => viewportRef.current,
		estimateSize: () => 52,
		overscan: 20,
	});

	const handleFilter = (type: SourceType | null) => {
		setActiveType(type);
		viewportRef.current?.scrollTo(0, 0);
	};

	const sensors = useSensors(
		useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 150, tolerance: 5 },
		}),
		useSensor(KeyboardSensor),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setColumnOrder((prev) => {
				const oldIndex = prev.indexOf(active.id as string);
				const newIndex = prev.indexOf(over.id as string);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<>
			<div className={styles.toolbar}>
				<div className={styles.filters}>
					<button
						type="button"
						className={styles.filterButton}
						data-active={activeType === null || undefined}
						onClick={() => handleFilter(null)}
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
							onClick={() => handleFilter(group.type)}
						>
							{group.label}
							<span className={styles.filterCount}>{group.sources.length}</span>
						</button>
					))}
				</div>
				<div className={styles.toolbarEnd}>
					<input
						type="search"
						className={styles.searchInput}
						placeholder={columnLabels.searchPlaceholder}
						value={globalFilter}
						onChange={(e) => {
							setGlobalFilter(e.target.value);
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
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.tableWrap} dir={dir}>
					<table className={styles.table}>
						<thead className={styles.thead}>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									<SortableContext
										items={columnOrder}
										strategy={horizontalListSortingStrategy}
									>
										{headerGroup.headers.map((header) => (
											<DraggableHeader key={header.id} header={header} />
										))}
									</SortableContext>
								</tr>
							))}
						</thead>
					</table>
					<ScrollArea.Root className={styles.scrollRoot} dir={dir}>
						<ScrollArea.Viewport
							ref={viewportRef}
							className={styles.scrollViewport}
						>
							<table className={styles.table}>
								<tbody
									className={styles.tbody}
									style={{ height: virtualizer.getTotalSize() }}
								>
									{virtualizer.getVirtualItems().map((virtualRow) => {
										const row = rows[virtualRow.index];
										return (
											<tr
												key={row.id}
												className={styles.tr}
												data-index={virtualRow.index}
												ref={virtualizer.measureElement}
												style={{
													transform: `translateY(${virtualRow.start}px)`,
												}}
											>
												{row.getVisibleCells().map((cell) => (
													<td
														key={cell.id}
														className={
															cell.column.id === 'no'
																? styles.tdNo
																: cell.column.id === 'thumb'
																	? styles.tdThumb
																	: cell.column.id === 'description'
																		? styles.tdDesc
																		: styles.td
														}
													>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</td>
												))}
											</tr>
										);
									})}
								</tbody>
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
			</DndContext>
		</>
	);
}
