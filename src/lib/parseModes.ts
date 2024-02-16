import { MLParseModes } from 'types/parser/modes';

export const VALID_PARSE_MODES: Set<MLParseModes> = new Set<MLParseModes>([
	MLParseModes.NORMAL,
	MLParseModes.VERSE,
]);
