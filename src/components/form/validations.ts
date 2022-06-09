import { RegExpEmail } from "./types";

export const VALUE_NOT_EMPTY = (value: string) => value.length > 0;

export const VALUE_VALID_EMAIL = (value: string) =>
	!!(value.length > 0 && value.match(RegExpEmail));
