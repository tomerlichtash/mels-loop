import type { IToolbarItem } from './hooks/useToolbar';
import type { IDynamicContentServer } from '../types';

/** Contains objects and functions that are needed in various parts of the popover */
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

/** Describes a content-related context, available to all rendered components under a ML page */
export interface IDynamicContentContext {
	readonly dynamicContentServer: IDynamicContentServer;

	/** The path of the document displayed in the current component */
	readonly documentPath: string;
}

