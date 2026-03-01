'use client';

import { createContext, type ReactNode, useCallback, useContext } from 'react';

type Messages = Record<string, unknown>;

interface I18nContextValue {
	locale: string;
	messages: Messages;
	t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
	return path.split('.').reduce<unknown>((current, key) => {
		if (current && typeof current === 'object') {
			return (current as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj);
}

export function I18nProvider({
	locale,
	messages,
	children,
}: {
	locale: string;
	messages: Messages;
	children: ReactNode;
}) {
	const t = useCallback(
		(key: string): string => {
			const value = getNestedValue(messages, key);
			if (typeof value === 'string') return value;
			return key;
		},
		[messages],
	);

	return (
		<I18nContext.Provider value={{ locale, messages, t }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useTranslation() {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useTranslation must be used within an I18nProvider');
	}
	return context;
}
