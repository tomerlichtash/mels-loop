import { createLinkDetector } from './helpers';

/**
 * Detects links matching [label](sources/id) pattern and
 * adds data attributes for source popover rendering.
 */
export const remarkSourceLinks = createLinkDetector(/^sources\//i, 'source');
