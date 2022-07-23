export const TEXT_NOT_EMPTY = /^$|\s+/;
export const STRIP_MD =
	/([_*])(?<!(?:\1|\w).)(?![_*\s])(.*?[^_*\s])(?=\1)([_*])(?!\w|\3)/g;
export const STRIP_MD_LINK = /(?:__|[*#])|\[(.*?)\]\(.*?\)/g;
// export const STRIP_MD = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
