export const flattenArray = <T>(arr: Array<T | T[]>) => {
	return arr.reduce((flat: T[], toFlatten: T | T[]) => {
		if (Array.isArray(toFlatten)) {
			return flat.concat(flattenArray(toFlatten) as T[]);
		} else {
			return flat.concat(toFlatten);
		}
	}, []);
};
