const RegExpEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmptyString = /^\s+$|^$/gi;

export const VALUE_NOT_EMPTY = (value: string) => {
	return value.length > 0 && !value.match(EmptyString);
};

export const VALUE_VALID_EMAIL = (value: string) =>
	!!(value.length > 0 && value.match(RegExpEmail));
