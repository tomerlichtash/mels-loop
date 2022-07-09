const RegExpEmptyString = /^\s+$|^$/gi;

const RegExpValidEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NoSepcialChars = /^[a-zA-Z0-9]{4,10}$/;

export const VALUE_NOT_EMPTY = (value: string) =>
	!value.match(RegExpEmptyString);

export const VALUE_VALID_EMAIL = (value: string) => {
	return !value.match(RegExpEmptyString) && !!value.match(RegExpValidEmail);
};

export const VALUE_NO_SPECIAL_CHARS = (value: string) =>
	!!value.match(NoSepcialChars);
