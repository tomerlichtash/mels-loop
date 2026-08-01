import { createLinkDetector } from './helpers';

/**
 * Detects links matching [label](entity:id) pattern and adds data
 * attributes for entity popover rendering. Authored, never automatic —
 * the editor decides where a name becomes a door into the archive. A bare
 * caret label ([^]) renders as the person marker; a worded label stays as
 * written.
 */
export const remarkEntityLinks = createLinkDetector(/^entity:/i, 'entity');
