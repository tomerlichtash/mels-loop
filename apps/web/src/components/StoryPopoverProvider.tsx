'use client';

import type { Locale } from '@mels-loop/i18n/config';
import { PopoverProvider } from '@mels-loop/ui/content';
import { type ReactNode, useCallback } from 'react';

import { fetchAnnotation, fetchGlossaryTerm } from '@/actions/annotations';

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

	return (
		<PopoverProvider
			fetchAnnotation={fetchAnnotationFn}
			fetchGlossary={fetchGlossaryFn}
		>
			{children}
		</PopoverProvider>
	);
}
