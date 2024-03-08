export const arrayToMap = <T>(array: Array<T>, field: string): { [key: string]: T } => {
	const map: { [key: string]: T } = array.reduce((acc, elem) => {
		const value = elem && elem[field];
		if (value !== null && value !== undefined) {
			acc[String(value)] = elem;
		}
		return acc;
	}, {});

	return map;
};
