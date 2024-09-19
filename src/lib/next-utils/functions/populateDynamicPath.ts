import { pathToRelativePath } from '../helpers/pathHelpers';

/**
 * Converts a path template, e.g. docs/[id] to docs/the-story-of-mel when `dict` has `{ id: "the-story-of-mel" }`
 * @param path
 * @param dict
 * @returns
 */
export const populateDynamicPath = async (
	path: string,
	dict: { [key: string]: string }
): Promise<string> => {
	let relative = await pathToRelativePath(path);

	if (!relative) {
		return '';
	}

	Object.entries(dict).forEach(([key, value]) => {
		const re = new RegExp(`\\[${key}\\]`, 'g');
		relative = relative.replace(re, value);
	});

	return relative;
};
