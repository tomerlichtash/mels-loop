'use client';

import { type ReactNode, useCallback } from 'react';

import {
	fetchAllAnnotations,
	fetchAllGlossaryTerms,
	fetchAnnotation,
	fetchGlossaryTerm,
} from '@/actions/annotations';
import { fetchEntityCard } from '@/actions/entities';
import { fetchSourceAction } from '@/actions/sources';
import type { Locale } from '@/i18n-init';

import { PopoverProvider } from './PopoverProvider';

interface StoryPopoverProviderProps {
	/**
	 * Annotations are story-scoped, so their fetchers need a story. Content
	 * outside any story — an entity's bio, say — omits this and simply has
	 * no annotations; glossary, source and entity popovers all still work.
	 */
	storySlug?: string;
	locale: Locale;
	children: ReactNode;
}

export function StoryPopoverProvider({
	storySlug,
	locale,
	children,
}: StoryPopoverProviderProps) {
	const fetchAnnotationFn = useCallback(
		(key: string) =>
			storySlug
				? fetchAnnotation(storySlug, key, locale)
				: Promise.resolve(null),
		[storySlug, locale],
	);

	const fetchAllAnnotationsFn = useCallback(
		() =>
			storySlug ? fetchAllAnnotations(storySlug, locale) : Promise.resolve({}),
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

	const fetchEntityFn = useCallback(
		(id: string) => fetchEntityCard(id, locale),
		[locale],
	);

	return (
		<PopoverProvider
			fetchAnnotation={fetchAnnotationFn}
			fetchAllAnnotations={fetchAllAnnotationsFn}
			fetchGlossary={fetchGlossaryFn}
			fetchAllGlossary={fetchAllGlossaryFn}
			fetchResolvedSource={fetchSourceFn}
			fetchResolvedEntity={fetchEntityFn}
		>
			{children}
		</PopoverProvider>
	);
}
