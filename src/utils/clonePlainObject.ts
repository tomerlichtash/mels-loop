export const clonePlainObject = <T extends object>(source: T): T => {
	return JSON.parse(JSON.stringify(source)) as T;
};
