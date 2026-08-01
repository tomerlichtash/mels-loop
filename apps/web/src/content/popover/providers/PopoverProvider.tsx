'use client';

import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from 'react';

import type { EntityCard } from '@/actions/entities';

export interface NavStackEntry {
	type: 'glossary' | 'annotation' | 'source';
	key: string;
	label: string;
}

// ---- Active popover store (ref-based, no context re-renders) ----

type Listener = () => void;

function createPopoverStore() {
	let active: string | null = null;
	const listeners = new Set<Listener>();

	return {
		getActive: () => active,
		open: (id: string) => {
			if (active === id) return;
			active = id;
			listeners.forEach((l) => l());
		},
		close: () => {
			active = null;
			listeners.forEach((l) => l());
		},
		subscribe: (listener: Listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
	};
}

type PopoverStore = ReturnType<typeof createPopoverStore>;

const defaultStore = createPopoverStore();

const PopoverStoreContext = createContext<PopoverStore>(defaultStore);

/** Returns true only when this specific popover is the active one. */
export function usePopoverOpen(popoverId: string): boolean {
	const store = useContext(PopoverStoreContext);
	return useSyncExternalStore(
		store.subscribe,
		() => store.getActive() === popoverId,
		() => false,
	);
}

// ---- Data context (annotations, glossary, sources, loading) ----

interface PopoverDataContextValue {
	annotations: Record<string, ProcessedContent>;
	glossary: Record<string, ProcessedContent>;
	sources: Record<string, ResolvedSource>;
	entities: Record<string, EntityCard>;
	loadingKeys: Set<string>;
	loadAnnotation: (key: string) => void;
	loadGlossaryTerm: (key: string) => void;
	loadResolvedSource: (id: string) => void;
	loadResolvedEntity: (id: string) => void;
	openPopover: (id: string) => void;
	closePopover: () => void;
	registerTrigger: (id: string, el: HTMLElement | null) => void;
	navStack: NavStackEntry[];
	pushNav: (entry: NavStackEntry) => void;
	popNavTo: (index: number) => void;
}

const PopoverDataContext = createContext<PopoverDataContextValue>({
	annotations: {},
	glossary: {},
	sources: {},
	entities: {},
	loadingKeys: new Set(),
	loadAnnotation: () => {},
	loadGlossaryTerm: () => {},
	loadResolvedSource: () => {},
	loadResolvedEntity: () => {},
	openPopover: () => {},
	closePopover: () => {},
	registerTrigger: () => {},
	navStack: [],
	pushNav: () => {},
	popNavTo: () => {},
});

// ---- Provider ----

interface PopoverProviderProps {
	annotations?: Record<string, ProcessedContent>;
	glossary?: Record<string, ProcessedContent>;
	sources?: Record<string, ResolvedSource>;
	fetchAnnotation?: (key: string) => Promise<ProcessedContent | null>;
	fetchGlossary?: (key: string) => Promise<ProcessedContent | null>;
	fetchResolvedSource?: (id: string) => Promise<ResolvedSource | null>;
	fetchResolvedEntity?: (id: string) => Promise<EntityCard | null>;
	fetchAllAnnotations?: () => Promise<Record<string, ProcessedContent>>;
	fetchAllGlossary?: () => Promise<Record<string, ProcessedContent>>;
	children: ReactNode;
}

export function PopoverProvider({
	annotations: initialAnnotations = {},
	glossary: initialGlossary = {},
	sources: initialResolvedSources = {},
	fetchAnnotation,
	fetchGlossary,
	fetchResolvedSource,
	fetchResolvedEntity,
	fetchAllAnnotations,
	fetchAllGlossary,
	children,
}: PopoverProviderProps) {
	const [annotations, setAnnotations] =
		useState<Record<string, ProcessedContent>>(initialAnnotations);
	const [glossary, setGlossary] =
		useState<Record<string, ProcessedContent>>(initialGlossary);
	const [sources, setResolvedSources] = useState<
		Record<string, ResolvedSource>
	>(initialResolvedSources);
	const [entities, setEntities] = useState<Record<string, EntityCard>>({});
	const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());
	const [navStack, setNavStack] = useState<NavStackEntry[]>([]);
	const triggersRef = useRef<Map<string, HTMLElement>>(new Map());
	const prefetchedRef = useRef(false);

	const [store] = useState(createPopoverStore);

	// Always-fresh refs — stable function identities without stale closures
	const stateRef = useRef({
		annotations,
		glossary,
		sources,
		entities,
		loadingKeys,
	});
	stateRef.current = { annotations, glossary, sources, entities, loadingKeys };

	const fetchAnnotationRef = useRef(fetchAnnotation);
	fetchAnnotationRef.current = fetchAnnotation;

	const fetchGlossaryRef = useRef(fetchGlossary);
	fetchGlossaryRef.current = fetchGlossary;

	const fetchResolvedSourceRef = useRef(fetchResolvedSource);
	const fetchResolvedEntityRef = useRef(fetchResolvedEntity);
	fetchResolvedSourceRef.current = fetchResolvedSource;
	fetchResolvedEntityRef.current = fetchResolvedEntity;

	const fetchAllAnnotationsRef = useRef(fetchAllAnnotations);
	fetchAllAnnotationsRef.current = fetchAllAnnotations;

	const fetchAllGlossaryRef = useRef(fetchAllGlossary);
	fetchAllGlossaryRef.current = fetchAllGlossary;

	const prefetchAll = useCallback(() => {
		if (prefetchedRef.current) return;
		prefetchedRef.current = true;

		console.debug('[PopoverProvider] prefetching all annotations + glossary');

		fetchAllAnnotationsRef
			.current?.()
			.then((all) => {
				console.debug(
					'[PopoverProvider] prefetched annotations:',
					Object.keys(all).length,
				);
				setAnnotations((prev) => ({ ...all, ...prev }));
			})
			.catch((err) =>
				console.error('[PopoverProvider] prefetch annotations failed:', err),
			);

		fetchAllGlossaryRef
			.current?.()
			.then((all) => {
				console.debug(
					'[PopoverProvider] prefetched glossary:',
					Object.keys(all).length,
				);
				setGlossary((prev) => ({ ...all, ...prev }));
			})
			.catch((err) =>
				console.error('[PopoverProvider] prefetch glossary failed:', err),
			);
	}, []);

	const loadAnnotation = useCallback(
		(key: string) => {
			const { annotations: ann, loadingKeys: lk } = stateRef.current;
			if (ann[key] || lk.has(key) || !fetchAnnotationRef.current) return;
			const t0 = performance.now();
			setLoadingKeys((prev) => new Set(prev).add(key));
			fetchAnnotationRef.current(key).then((content) => {
				console.debug(
					`[PopoverProvider] fetched annotation "${key}": ${(performance.now() - t0).toFixed(0)}ms`,
				);
				if (content) setAnnotations((prev) => ({ ...prev, [key]: content }));
				setLoadingKeys((prev) => {
					const next = new Set(prev);
					next.delete(key);
					return next;
				});
				prefetchAll();
			});
		},
		[prefetchAll],
	);

	const loadGlossaryTerm = useCallback(
		(key: string) => {
			const { glossary: gl, loadingKeys: lk } = stateRef.current;
			if (gl[key] || lk.has(key) || !fetchGlossaryRef.current) return;
			setLoadingKeys((prev) => new Set(prev).add(key));
			fetchGlossaryRef.current(key).then((content) => {
				if (content) setGlossary((prev) => ({ ...prev, [key]: content }));
				setLoadingKeys((prev) => {
					const next = new Set(prev);
					next.delete(key);
					return next;
				});
				prefetchAll();
			});
		},
		[prefetchAll],
	);

	const loadResolvedEntity = useCallback((id: string) => {
		const { entities: ent, loadingKeys: lk } = stateRef.current;
		if (ent[id] || lk.has(`entity:${id}`) || !fetchResolvedEntityRef.current)
			return;
		setLoadingKeys((prev) => new Set(prev).add(`entity:${id}`));
		fetchResolvedEntityRef.current(id).then((card) => {
			if (card) setEntities((prev) => ({ ...prev, [id]: card }));
			setLoadingKeys((prev) => {
				const next = new Set(prev);
				next.delete(`entity:${id}`);
				return next;
			});
		});
	}, []);

	const loadResolvedSource = useCallback((id: string) => {
		const { sources: src, loadingKeys: lk } = stateRef.current;
		if (src[id] || lk.has(id) || !fetchResolvedSourceRef.current) return;
		setLoadingKeys((prev) => new Set(prev).add(id));
		fetchResolvedSourceRef.current(id).then((source) => {
			if (source) setResolvedSources((prev) => ({ ...prev, [id]: source }));
			setLoadingKeys((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		});
	}, []);

	const openPopover = useCallback(
		(id: string) => {
			store.open(id);
		},
		[store],
	);

	const closePopover = useCallback(() => {
		store.close();
	}, [store]);

	const pushNav = useCallback((entry: NavStackEntry) => {
		setNavStack((prev) => [...prev, entry]);
	}, []);

	const popNavTo = useCallback((index: number) => {
		setNavStack((prev) => prev.slice(0, index + 1));
	}, []);

	// Reset nav stack when active popover changes
	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setNavStack([]);
		});
		return () => {
			unsubscribe();
		};
	}, [store]);

	const registerTrigger = useCallback((id: string, el: HTMLElement | null) => {
		if (el) {
			triggersRef.current.set(id, el);
		} else {
			triggersRef.current.delete(id);
		}
	}, []);

	// Click-outside and Escape handling
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (!store.getActive()) return;
			const target = e.target as Node;
			for (const el of triggersRef.current.values()) {
				if (el.contains(target)) return;
			}
			const el = target instanceof Element ? target : target.parentElement;
			if (el?.closest('[data-popover-content]')) return;
			store.close();
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') store.close();
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [store]);

	const dataValue = useMemo(
		() => ({
			annotations,
			glossary,
			sources,
			entities,
			loadingKeys,
			loadAnnotation,
			loadGlossaryTerm,
			loadResolvedSource,
			loadResolvedEntity,
			openPopover,
			closePopover,
			registerTrigger,
			navStack,
			pushNav,
			popNavTo,
		}),
		[
			annotations,
			glossary,
			sources,
			entities,
			loadingKeys,
			navStack,
			loadAnnotation,
			loadGlossaryTerm,
			loadResolvedSource,
			loadResolvedEntity,
			openPopover,
			closePopover,
			registerTrigger,
			pushNav,
			popNavTo,
		],
	);

	return (
		<PopoverStoreContext.Provider value={store}>
			<PopoverDataContext.Provider value={dataValue}>
				{children}
			</PopoverDataContext.Provider>
		</PopoverStoreContext.Provider>
	);
}

export function useAnnotations() {
	return useContext(PopoverDataContext);
}
