import type { LocaleId } from 'types/locale';
import type { LocaleSource, RawDict } from './types';

export const getDictionary = (
	langs: LocaleSource[]
): Record<LocaleId, RawDict> =>
	langs.reduce(
		(acc, l) => Object.assign({ ...acc }, Object.assign({ [l.id]: l.dict })),
		{}
	);

export const getMeta = (langs: LocaleSource[]) =>
	langs.reduce(
		(acc, { id, direction, label, symbol }) => ({
			...acc,
			...Object.assign({
				[id]: {
					direction,
					label,
					symbol,
				},
			}),
		}),
		{}
	);
