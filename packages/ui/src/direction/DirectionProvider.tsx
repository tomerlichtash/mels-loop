'use client';

import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import type { ReactNode } from 'react';

interface DirectionProviderProps {
	dir: 'ltr' | 'rtl';
	children: ReactNode;
}

/**
 * Tells every Radix primitive which way the document runs.
 *
 * Radix does not read `dir` off the document. Each primitive asks this context
 * and falls back to 'ltr' when there is none, then writes that answer onto its
 * own element — including content it portals to the end of the body, which is
 * why a popover opened on a Hebrew page laid itself out left-to-right with its
 * scrollbar on the wrong side while the surrounding page was correct.
 *
 * It has to sit above both packages: this one owns most of the primitives, and
 * the app brings its own (the header's navigation menu, the search dialog).
 */
export function DirectionProvider({ dir, children }: DirectionProviderProps) {
	return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
