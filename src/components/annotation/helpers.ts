const serialPrefix = (index: number, limit: number, customPrefix: string) =>
	index <= limit ? customPrefix : '';

export const leadingZero = (index: number) => serialPrefix(index, 9, '0');
