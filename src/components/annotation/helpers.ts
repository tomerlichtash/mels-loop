const serialPrefix = (index: number, limit: number, customPrefix: string) => {
	return index <= limit ? customPrefix : '';
};

export const leadingZero = (index: number) => {
	return serialPrefix(index, 9, '0');
};
