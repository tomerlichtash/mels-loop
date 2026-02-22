'use client';

import type {
	ProcessedContent,
	ResolvedSource,
} from '@mels-loop/content-pipeline/types';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

export interface NavStackEntry {
	type: 'glossary' | 'annotation' | 'source';
	key: string;
	label: string;
}

interface PopoverContextValue {
	annotations: Record<string, ProcessedContent>;
	glossary: Record<string, ProcessedContent>;
	sources: Record<string, ResolvedSource>;
	loadingKeys: Set<string>;
	loadAnnotation: (key: string) => void;
	loadGlossaryTerm: (key: string) => void;
	loadResolvedSource: (id: string) => void;
	activePopover: string | null;
	openPopover: (id: string) => void;
	closePopover: () => void;
	registerTrigger: (id: string, el: HTMLElement | null) => void;
	navStack: NavStackEntry[];
	pushNav: (entry: NavStackEntry) => void;
	popNavTo: (index: number) => void;
}

const PopoverContext = createContext<PopoverContextValue>({
	annotations: {},
	glossary: {},
	sources: {},
	loadingKeys: new Set(),
	loadAnnotation: () => {},
	loadGlossaryTerm: () => {},
	loadResolvedSource: () => {},
	activePopover: null,
	openPopover: () => {},
	closePopover: () => {},
	registerTrigger: () => {},
	navStack: [],
	pushNav: () => {},
	popNavTo: () => {},
});

interface PopoverProviderProps {
	annotations?: Record<string, ProcessedContent>;
	glossary?: Record<string, ProcessedContent>;
	sources?: Record<string, ResolvedSource>;
	fetchAnnotation?: (key: string) => Promise<ProcessedContent | null>;
	fetchGlossary?: (key: string) => Promise<ProcessedContent | null>;
	fetchResolvedSource?: (id: string) => Promise<ResolvedSource | null>;
	children: ReactNode;
}

export function PopoverProvider({
	annotations: initialAnnotations = {},
	glossary: initialGlossary = {},
	sources: initialResolvedSources = {},
	fetchAnnotation,
	fetchGlossary,
	fetchResolvedSource,
	children,
}: PopoverProviderProps) {
	const [annotations, setAnnotations] =
		useState<Record<string, ProcessedContent>>(initialAnnotations);
	const [glossary, setGlossary] =
		useState<Record<string, ProcessedContent>>(initialGlossary);
	const [sources, setResolvedSources] = useState<
		Record<string, ResolvedSource>
	>(initialResolvedSources);
	const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());
	const [activePopover, setActivePopover] = useState<string | null>(null);
	const [navStack, setNavStack] = useState<NavStackEntry[]>([]);
	const triggersRef = useRef<Map<string, HTMLElement>>(new Map());

	// Always-fresh refs — stable function identities without stale closures
	const stateRef = useRef({ annotations, glossary, sources, loadingKeys });
	stateRef.current = { annotations, glossary, sources, loadingKeys };

	const fetchAnnotationRef = useRef(fetchAnnotation);
	fetchAnnotationRef.current = fetchAnnotation;

	const fetchGlossaryRef = useRef(fetchGlossary);
	fetchGlossaryRef.current = fetchGlossary;

	const fetchResolvedSourceRef = useRef(fetchResolvedSource);
	fetchResolvedSourceRef.current = fetchResolvedSource;

	const loadAnnotation = useCallback((key: string) => {
		const { annotations: ann, loadingKeys: lk } = stateRef.current;
		if (ann[key] || lk.has(key) || !fetchAnnotationRef.current) return;
		setLoadingKeys((prev) => new Set(prev).add(key));
		fetchAnnotationRef.current(key).then((content) => {
			if (content) setAnnotations((prev) => ({ ...prev, [key]: content }));
			setLoadingKeys((prev) => {
				const next = new Set(prev);
				next.delete(key);
				return next;
			});
		});
	}, []);

	const loadGlossaryTerm = useCallback((key: string) => {
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

	const openPopover = useCallback((id: string) => {
		setActivePopover((current) => (current === id ? null : id));
	}, []);

	const closePopover = useCallback(() => {
		setActivePopover(null);
	}, []);

	const pushNav = useCallback((entry: NavStackEntry) => {
		setNavStack((prev) => [...prev, entry]);
	}, []);

	const popNavTo = useCallback((index: number) => {
		setNavStack((prev) => prev.slice(0, index + 1));
	}, []);

	useEffect(() => {
		setNavStack([]);
	}, [activePopover]);

	const registerTrigger = useCallback((id: string, el: HTMLElement | null) => {
		if (el) {
			triggersRef.current.set(id, el);
		} else {
			triggersRef.current.delete(id);
		}
	}, []);

	useEffect(() => {
		if (!activePopover) return;

		function handleClick(e: MouseEvent) {
			const target = e.target as Node;
			for (const el of triggersRef.current.values()) {
				if (el.contains(target)) return;
			}
			const el = target instanceof Element ? target : target.parentElement;
			if (el?.closest('[data-popover-content]')) return;
			setActivePopover(null);
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') setActivePopover(null);
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [activePopover]);

	const contextValue = useMemo(
		() => ({
			annotations,
			glossary,
			sources,
			loadingKeys,
			loadAnnotation,
			loadGlossaryTerm,
			loadResolvedSource,
			activePopover,
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
			loadingKeys,
			activePopover,
			navStack,
			loadAnnotation,
			loadGlossaryTerm,
			loadResolvedSource,
			openPopover,
			closePopover,
			registerTrigger,
			pushNav,
			popNavTo,
		],
	);

	return (
		<PopoverContext.Provider value={contextValue}>
			{children}
		</PopoverContext.Provider>
	);
}

export function useAnnotations() {
	return useContext(PopoverContext);
}
