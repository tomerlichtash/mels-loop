export interface IToolbarItem {
	element: React.ReactNode;
	key: string;
}

export interface IToolbar {
	readonly items: IToolbarItem[];
	/**
	 * Will not add items with keys that already exist in the items collection
	 * @param items 
	 */
	addItems(items: IToolbarItem | IToolbarItem[]): IToolbar;
}

/**
 * Contains objects and functions that are needed in various parts of
 * the popover
 */
export interface IPopoverContext {
	readonly toolbar: IToolbar;
	
}
