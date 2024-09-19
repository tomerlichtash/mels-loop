/** Node names as assigned by the markdown parser */
export enum ASTNODE_TYPES {
	NEWLINE = 'newline',
	PARAGRAPH = 'paragraph',
	LINK = 'link',
	IMAGE = 'image',
	TEXT = 'text',
	STRONG = 'strong',
	EM = 'em',
	LIST = 'list',
	INS = 'ins',
	DEL = 'del',
	LIST_ITEM = 'list-item',
	INLINECODE = 'inlineCode',
	CODE = 'code',
	CODEBLOCK = 'codeBlock',
	BLOCK_QUOTE = 'blockQuote',
	HEADING = 'heading',
	SUB = 'sub',
	SUP = 'sup',
	/* Custom types */
	HTML = 'HTML',
	comment = 'comment'
}

export enum MLNODE_TYPES {
	PARAGRAPH = 'paragraph',
	LINE = 'line',
	DEL = 'del',
	INS = 'ins',
	STRONG = 'strong',
	EM = 'em',
	CODE = 'code',
	CODEBLOCK = 'codeblock',
	BLOCKQUOTE = 'blockquote',
	TEXT = 'text',
	LIST = 'list',
	LIST_ITEM = 'list-item',
	LINK = 'link',
	IMAGE = 'image',
	FIGURE = 'figure',
	UNKNOWN = 'unknown',
	SUB = 'sub',
	SUP = 'sup',
	TR = 'tr',
	TD = 'td',
	TABLE = 'table',
	TH = 'th',
	CITE = 'cite',
	FIGCAPTION = 'figcaption',
	HR = 'hr'
}

export enum NODE_LIST_TYPES {
	ORDERED = 'ol',
	UNORDERED = 'ul'
}

/** Special display modes for nodes */
export enum NODE_DISPLAY_TYPES {
	/** Show in popover */
	POPOVER = 'popover',
	NORMAL = 'normal'
}
