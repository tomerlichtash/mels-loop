'use client';

import { useCallback, useSyncExternalStore } from 'react';

function getSnapshot(): string {
	return document.documentElement.dataset.colorScheme ?? 'light';
}

function getServerSnapshot(): string {
	return 'light';
}

function subscribe(callback: () => void): () => void {
	const observer = new MutationObserver(callback);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-color-scheme'],
	});
	return () => observer.disconnect();
}

export function useColorScheme() {
	const colorScheme = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	const setColorScheme = useCallback((scheme: 'light' | 'dark') => {
		document.documentElement.dataset.colorScheme = scheme;
		try {
			localStorage.setItem('color-scheme', scheme);
		} catch {}
	}, []);

	const toggleColorScheme = useCallback(() => {
		const current = document.documentElement.dataset.colorScheme;
		const next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.colorScheme = next;
		try {
			localStorage.setItem('color-scheme', next);
		} catch {}
	}, []);

	return { colorScheme, setColorScheme, toggleColorScheme };
}
