import { useState } from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { mlUtils } from "../../lib/ml-utils";


export interface IUseToolbar {
	readonly items: IToolbarItem[];
	addItems(this:void, items: IToolbarItem | IToolbarItem[]): void;
	removeItemsById(this: void, keys: string | string[]): void;
}

interface IToolbarItemImp extends IToolbarItem {
	key: string;
}
class Toolbar {
	private readonly _items: IToolbarItemImp[];

	constructor() {
		this._items = [];
	}

	public get items(): IToolbarItemImp[] {
		return this._items.slice();
	}

	public addItems(items: IToolbarItem | IToolbarItem[]): this {
		if (!items) {
			return;
		}
		if (!Array.isArray(items)) {
			items = [items];
		}
		items
			.filter(i => i?.element)
			.map(i => ({
				...i,
				key: mlUtils.uniqueId("toolbar")

			}))
			.forEach(i => {
				const ind = this.findItemIndex(i);
				if (ind >= 0) {
					this._items[ind] = i;
				}
				else {
					this._items.push(i);
				}
			});
		return this;
	}

	public removeItems(ids: string | string[]) {
		if (typeof ids === "string") {
			ids = [ids]
		}
		ids.forEach(key => {
			const ind = this.findItemIndex(key);
			if (ind >= 0) {
				this._items.splice(ind, 1);
			}
		});
		return this;
	}

	private findItemIndex(item: IToolbarItem | string): number {
		const id = typeof item === "string" ? item : item.id;
		return this._items.findIndex(i => i.id === id);
	}
}

export const useToolbar = (): IUseToolbar => {
	const [toolbar] = useState<Toolbar>(new Toolbar());
	const [toolbarItems, setToolbarItems] = useState<IToolbarItem[]>(toolbar.items);

	return {
		items: toolbarItems,
		addItems: (items: IToolbarItem | IToolbarItem[]) => {
			toolbar.addItems(items);
			setToolbarItems(toolbar.items);
		},
		removeItemsById: (keys: string | string[]) => {
			toolbar.removeItems(keys);
			if (toolbar.items.length !== toolbarItems.length) {
				setToolbarItems(toolbar.items);
			}
		}
	}
}