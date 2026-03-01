'use client';

import { type ReactNode, useCallback } from 'react';

import { fetchAnnotation, fetchGlossaryTerm } from '@/actions/annotations';
import { fetchSourceAction } from '@/actions/sources';
import type { Locale } from '@/i18n-init';

import { PopoverProvider } from './PopoverProvider';

interface StoryPopoverProviderProps {
	storySlug: string;
	locale: Locale;
	children: ReactNode;
}

export function StoryPopoverProvider({
	storySlug,
	locale,
	children,
}: StoryPopoverProviderProps) {
	const fetchAnnotationFn = useCallback(
		(key: string) => fetchAnnotation(storySlug, key, locale),
		[storySlug, locale],
	);

	const fetchGlossaryFn = useCallback(
		(key: string) => fetchGlossaryTerm(key, locale),
		[locale],
	);

	const fetchSourceFn = useCallback(
		(id: string) => fetchSourceAction(id, locale),
		[locale],
	);

	return (
		<PopoverProvider
			fetchAnnotation={fetchAnnotationFn}
			fetchGlossary={fetchGlossaryFn}
			fetchResolvedSource={fetchSourceFn}
		>
			{children}
		</PopoverProvider>
	);
}
