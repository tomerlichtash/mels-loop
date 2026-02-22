'use client';

import { useMemo } from 'react';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import { useAnnotations } from '../../PopoverProvider/PopoverProvider';

interface ContentResult {
	content: ProcessedContent | null;
	term: string;
	label: string;
}

export function useContent(
	originalContent: ProcessedContent | null,
	originalTerm: string,
	originalLabel: string,
): ContentResult {
	const { navStack, glossary, annotations } = useAnnotations();

	return useMemo(() => {
		if (navStack.length === 0 || !originalContent) {
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
			return { content: resolved, term: top.key, label: top.label };
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
