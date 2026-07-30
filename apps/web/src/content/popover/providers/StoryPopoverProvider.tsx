'use client';

import { type ReactNode, useCallback } from 'react';

import {
	fetchAllAnnotations,
	fetchAllGlossaryTerms,
	fetchAnnotation,
	fetchGlossaryTerm,
} from '@/actions/annotations';
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

	const fetchAllAnnotationsFn = useCallback(
		() => fetchAllAnnotations(storySlug, locale),
		[storySlug, locale],
	);

	const fetchGlossaryFn = useCallback(
		(key: string) => fetchGlossaryTerm(key, locale),
		[locale],
	);

	const fetchAllGlossaryFn = useCallback(
		() => fetchAllGlossaryTerms(locale),
		[locale],
	);

	const fetchSourceFn = useCallback(
		(id: string) => fetchSourceAction(id, locale),
		[locale],
	);

	return (
		<PopoverProvider
			fetchAnnotation={fetchAnnotationFn}
			fetchAllAnnotations={fetchAllAnnotationsFn}
			fetchGlossary={fetchGlossaryFn}
			fetchAllGlossary={fetchAllGlossaryFn}
			fetchResolvedSource={fetchSourceFn}
		>
			{children}
		</PopoverProvider>
	);
}
