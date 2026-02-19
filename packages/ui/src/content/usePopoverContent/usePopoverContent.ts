'use client';

import { useMemo } from 'react';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import { useAnnotations } from '../AnnotationProvider/AnnotationProvider';

interface PopoverContentResult {
	content: ProcessedContent;
	term: string;
	label: string;
}

export function usePopoverContent(
	originalContent: ProcessedContent,
	originalTerm: string,
	originalLabel: string,
): PopoverContentResult {
	const { navStack, glossary, annotations } = useAnnotations();

	return useMemo(() => {
		if (navStack.length === 0) {
			return {
				content: originalContent,
				term: originalTerm,
				label: originalLabel,
			};
		}

		const top = navStack[navStack.length - 1];
		const map = top.type === 'glossary' ? glossary : annotations;
		const resolved = map[top.key];

		if (resolved) {
			return {
				content: resolved,
				term: top.key,
				label: top.label,
			};
		}

		return {
			content: originalContent,
			term: originalTerm,
			label: originalLabel,
		};
	}, [
		navStack,
		glossary,
		annotations,
		originalContent,
		originalTerm,
		originalLabel,
	]);
}
