export const TEXT_NOT_EMPTY = /^$|\s+/;

export const STRIP_MD =
	/([_*])(?<!(?:\1|\w).)(?![_*\s])(.*?[^_*\s])(?=\1)([_*])(?!\w|\3)/g;

export const MD_BLOCKQUOTE = /(^>\x20?)/gm;
export const MD_COMMENT = /<!---?\s.*\s-?-->/g;
export const MD_DOUBLE_ASTRIEK = /\*\*(.*?)\*\*/gm;
export const MD_SINGLE_ASTRIEK = /\*/gm;
export const MD_ORDERED_LIST = /(^(\d+\.)(\s))+/gm;
export const MD_UNORDERED_LIST_DASH = /(^-\x20)/gm;
export const MD_UNORDERED_LIST_ASTRIEK = /(^\*\x20)/gm;
export const MD_MID_ASTRIEK = /(\x20\*\x20)/gm;
export const MD_LINK = /\[([^[\]]*)\]\((.*?)\)/gm;
export const MD_CODEBLOCK = /^```(?:js|javascript)\n([\s\S]*?)```$/gm;
export const MD_CODEBLOCK_INLINE =
	/<code(?:\s[^>]*)?>[\s\S]*?<\/code>|`{3}([\S\s]*?)`{3}|`([^`]*)`|~~([\S\s]*?)~~|\*{2}([\s\S]*?)\*{2}(?!\*)|\*([^*]*)\*|__([\s\S]*?)__/gm;

// export const STRIP_MD_LINK = /(?:__|[*#])|\[(.*?)\]\(.*?\)/g;
export const SINGLE_WHITE_SPACE = " ";
export const EMPTY_STRING = "";
export const ASTRIEK_MOCK = "%astriek%";
