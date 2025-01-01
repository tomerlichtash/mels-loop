/** How to load a markdown file */
export enum LoadContentModes {
	/** Don't load anything. Used for enumerating folders */
	None = 'none',
	/** Load only the metadata (at the head of the file) */
	Metadata = 'metadata',
	/**  Load metadata and markdown */
	Full = 'full',
}

export enum MLParseModes {
	AUTO = '', // value must be falsy
	VERSE = 'verse',
	NORMAL = 'normal',
}

export enum LoadFolderModes {
	Folder = 'folder',
	Children = 'children',
}
