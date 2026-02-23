'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { type AnyOrama, create, load, type Result, search } from '@orama/orama';
import * as Dialog from '@radix-ui/react-dialog';
import {
	FileIcon,
	FileTextIcon,
	ImageIcon,
	Link2Icon,
	SpeakerLoudIcon,
	VideoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './SearchDialog.module.css';

interface SearchDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

interface SearchDoc {
	type: string;
	subtype: string;
	slug: string;
	url: string;
	title: string;
	body: string;
	locale: string;
}

const schema = {
	type: 'string' as const,
	subtype: 'string' as const,
	slug: 'string' as const,
	url: 'string' as const,
	title: 'string' as const,
	body: 'string' as const,
	locale: 'string' as const,
};

const CATEGORY_ORDER = [
	'story',
	'article',
	'source',
	'glossary',
	'post',
	'page',
] as const;

const SOURCE_ICONS: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	image: ImageIcon,
	pdf: FileTextIcon,
	text: FileTextIcon,
	audio: SpeakerLoudIcon,
	video: VideoIcon,
	link: Link2Icon,
	archive: FileIcon,
	other: FileIcon,
};

function groupByType(
	hits: Result<SearchDoc>[],
): Map<string, Result<SearchDoc>[]> {
	const map = new Map<string, Result<SearchDoc>[]>();
	for (const hit of hits) {
		const type = hit.document.type;
		if (!map.has(type)) map.set(type, []);
		map.get(type)!.push(hit);
	}
	const sorted = new Map<string, Result<SearchDoc>[]>();
	for (const cat of CATEGORY_ORDER) {
		if (map.has(cat)) sorted.set(cat, map.get(cat)!);
	}
	return sorted;
}

function Highlight({ text, term }: { text: string; term: string }) {
	if (!term.trim()) return <>{text}</>;
	const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const parts = text.split(new RegExp(`(${escaped})`, 'ig'));
	return (
		<>
			{parts.map((part, i) =>
				part.toLowerCase() === term.toLowerCase() ? (
					<mark key={i} className={styles.highlight}>
						{part}
					</mark>
				) : (
					part
				),
			)}
		</>
	);
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
	const { t, locale } = useTranslation();
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Result<SearchDoc>[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const dbRef = useRef<AnyOrama | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	// Load index on first open
	useEffect(() => {
		if (!open || dbRef.current) return;
		let cancelled = false;
		setLoading(true);
		fetch(`/search-index.${locale}.json`)
			.then((res) => res.json())
			.then((raw) => {
				if (cancelled) return;
				const db = create({ schema });
				load(db, raw);
				dbRef.current = db;
				setLoading(false);
			})
			.catch(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [open, locale]);

	// Focus input on open
	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 0);
		}
	}, [open]);

	// Reset state when closed
	useEffect(() => {
		if (!open) {
			setQuery('');
			setResults([]);
			setHasSearched(false);
			setActiveIndex(-1);
		}
	}, [open]);

	// Debounced search
	const doSearch = useCallback((term: string) => {
		clearTimeout(timerRef.current);
		if (!term.trim()) {
			setResults([]);
			setHasSearched(false);
			setActiveIndex(-1);
			return;
		}
		timerRef.current = setTimeout(() => {
			if (!dbRef.current) return;
			const res = search(dbRef.current, {
				term,
				limit: 50,
			}) as { hits: Result<SearchDoc>[] };
			setResults(res.hits);
			setHasSearched(true);
			setActiveIndex(-1);
		}, 150);
	}, []);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.target.value;
		setQuery(val);
		doSearch(val);
	}

	// Flatten results for keyboard nav
	const flatResults: Result<SearchDoc>[] = [];
	for (const [, items] of groupByType(results)) {
		flatResults.push(...items);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveIndex((i) => {
				const next = Math.min(i + 1, flatResults.length - 1);
				resultRefs.current[next]?.scrollIntoView({ block: 'nearest' });
				return next;
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIndex((i) => {
				const next = Math.max(i - 1, 0);
				resultRefs.current[next]?.scrollIntoView({ block: 'nearest' });
				return next;
			});
		} else if (e.key === 'Enter' && activeIndex >= 0) {
			e.preventDefault();
			resultRefs.current[activeIndex]?.click();
		}
	}

	let flatIndex = 0;
	const grouped = groupByType(results);

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content
					className={styles.dialog}
					aria-describedby={undefined}
					onKeyDown={handleKeyDown}
				>
					<Dialog.Title className={styles.visuallyHidden}>
						{t('search.title')}
					</Dialog.Title>

					<div className={styles.inputWrap}>
						<svg
							className={styles.searchIcon}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
						<input
							ref={inputRef}
							className={styles.input}
							type="text"
							value={query}
							onChange={handleInputChange}
							placeholder={t('search.placeholder')}
						/>
						<button
							type="button"
							className={styles.escBadge}
							onClick={() => onOpenChange(false)}
							aria-label={t('search.close')}
						>
							ESC
						</button>
					</div>

					<div className={styles.results}>
						{loading && <div className={styles.empty}>{t('loading')}</div>}

						{!loading && hasSearched && results.length === 0 && (
							<div className={styles.empty}>{t('search.noResults')}</div>
						)}

						{!loading &&
							Array.from(grouped.entries()).map(([type, items]) => (
								<div key={type}>
									<h3 className={styles.resultGroup}>
										{t(`search.categories.${type}`)}
										<span className={styles.resultCount}>{items.length}</span>
									</h3>
									{items.map((hit) => {
										const idx = flatIndex++;
										const SourceIcon =
											hit.document.type === 'source'
												? (SOURCE_ICONS[hit.document.subtype] ?? FileIcon)
												: null;
										return (
											<Link
												key={hit.document.url}
												ref={(el) => {
													resultRefs.current[idx] = el;
												}}
												href={`/${locale}${hit.document.url}`}
												className={styles.resultItem}
												data-active={idx === activeIndex}
												onClick={() => onOpenChange(false)}
											>
												{SourceIcon && (
													<SourceIcon className={styles.sourceIcon} />
												)}
												<div className={styles.resultContent}>
													<div className={styles.resultTitle}>
														<Highlight text={hit.document.title} term={query} />
													</div>
													{hit.document.body && (
														<div className={styles.resultSnippet}>
															<Highlight
																text={hit.document.body.slice(0, 200)}
																term={query}
															/>
														</div>
													)}
												</div>
											</Link>
										);
									})}
								</div>
							))}
					</div>
					<div
						className={`${styles.footer}${hasSearched ? '' : ` ${styles.footerNoBorder}`}`}
					>
						{hasSearched && results.length > 0 && (
							<span className={styles.footerResults}>
								{results.length} {t('search.resultsFound')}
							</span>
						)}
						<span className={styles.footerHint}>
							<kbd className={styles.footerKbd}>&uarr;</kbd>
							<kbd className={styles.footerKbd}>&darr;</kbd>
							{t('search.navigate')}
						</span>
						<span className={styles.footerHint}>
							<kbd className={styles.footerKbd}>&crarr;</kbd>
							{t('search.openHint')}
						</span>
						<span className={styles.footerHint}>
							<kbd className={styles.footerKbd}>esc</kbd>
							{t('search.closeHint')}
						</span>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
