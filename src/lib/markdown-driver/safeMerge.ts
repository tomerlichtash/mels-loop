import { parseDate } from '../../utils/parseDate';

const ALLOWED_MERGE_TYPES: Array<string> = [
	'object',
	'string',
	'number',
	'boolean',
];

/**
 * Sort-of-safely merge data into an object.
 * The object should contain values in its fields, so that the type can be determined at runtime
 * @param into
 * @param data
 * @returns
 */
export const safeMerge = (into: object, data: object | string): object => {
	if (!into || !data) {
		return into;
	}
	const realData = typeof data === 'string' ? JSON.parse(data) : data;
	Object.keys(into).forEach((key) => {
		const val = realData[key];
		const tSource = typeof val;

		if (!ALLOWED_MERGE_TYPES.includes(tSource)) {
			return;
		}

		const myVal = into[key];
		const tTarget = typeof myVal;

		if (tTarget === 'object') {
			if (myVal === null) {
				into[key] = val;
			} else if (val instanceof Date || Array.isArray(val)) {
				// we don't deep arrays
				into[key] = val;
			} else if (tSource === 'object') {
				safeMerge(myVal as object, val as object);
			} else if (myVal instanceof Date && tSource === 'string') {
				into[key] = parseDate(val as string);
			} else {
				console.warn(
					`merge data: cannot merge field ${key} of type ${tSource} into object`
				);
			}
		} else {
			// target field is primitive, check source field
			if (tSource !== 'object') {
				into[key] = val;
			} else {
				console.warn(
					`merge data: cannot merge field ${key} of type ${tSource} into ${tTarget}}`
				);
			}
		}
	});
	return into;
};
