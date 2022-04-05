export interface IToolbarItem {
	element: React.ReactNode;
	id: string;
	enabled: boolean;
}

/**
 * Contains objects and functions that are needed in various parts of
 * the popover
 */
export interface IPopoverContext {
	readonly toolbar: IToolbarItem[];
	/**
	 * Adds or replaces items by their provided keys
	 * @param items 
	 */
	addToolbarItems(items: IToolbarItem | IToolbarItem[]): void;
	/**
	 * Remove item/s with matching keys
	 * @param ids 
	 */
	removeToolbarItems(ids: string | string[]): void;
}
