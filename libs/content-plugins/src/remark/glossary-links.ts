import { createLinkDetector } from './helpers';

/**
 * Detects links matching [text](glossary/...) pattern and adds
 * data attributes for glossary popover rendering.
 */
export const remarkGlossaryLinks = createLinkDetector(
	/^glossary\//i,
	'glossary',
);
