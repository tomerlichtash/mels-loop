'use client';

import { PopoverProvider } from '@mels-loop/content-ui';
import type { Locale } from '@mels-loop/i18n/config';
import { type ReactNode, useCallback } from 'react';

import { fetchAnnotation, fetchGlossaryTerm } from '@/actions/annotations';
import { fetchSourceAction } from '@/actions/sources';

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
