const RegExpEmptyString = /^\s+$|^$/gi;

const RegExpValidEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const VALUE_NOT_EMPTY = (value: string) =>
	!value.match(RegExpEmptyString);

export const VALUE_VALID_EMAIL = (value: string) => {
	return !value.match(RegExpEmptyString) && !!value.match(RegExpValidEmail);
};
