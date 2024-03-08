export const stringArrayToMap = (array: Array<string>): { [key: string]: 1 } => {
	return array.reduce((acc, str) => {
		acc[str] = 1;
		return acc;
	}, {});
};
