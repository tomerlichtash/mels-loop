export const parseDate = (
	dateString: string | number | null | undefined
): Date => {
	const t = typeof dateString;
	if (t === 'number') {
		return new Date(dateString);
	}
	if (t === 'string') {
		try {
			const t = Date.parse(dateString as string);
			return new Date(t);
		} catch (e) {
			console.error(`Error parsing date ${dateString}`);
		}
	}
	return new Date();
};
