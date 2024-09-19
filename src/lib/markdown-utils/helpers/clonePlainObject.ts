/**
 * returns a deep clone of the source object, ensuring that the original
 * object and the cloned object are completely separate and independent
 * copies.
 * @param source
 * @returns
 */
export const clonePlainObject = <T extends object>(source: T): T => {
	return JSON.parse(JSON.stringify(source)) as T;
};
