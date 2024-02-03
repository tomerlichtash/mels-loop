import { useState } from 'react';
import { mlUtils } from '../../lib/ml-utils';
import { IToolbarItem } from './types';

export interface IUseToolbar {
	readonly items: IToolbarItem[];
	addItems(this: void, items: IToolbarItem | IToolbarItem[]): void;
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
			.filter((item) => item?.element)
			.map((item) => ({
				...item,
				key: mlUtils.uniqueId('toolbar'),
			}))
			.forEach((item) => {
				const ind = this.findItemIndex(item);

				if (ind >= 0) {
					// if item has index place it in index
					this._items[ind] = item;
				} else {
					// push new item
					this._items.push(item);
				}
			});

		return this;
	}

	public removeItems(ids: string | string[]) {
		if (typeof ids === 'string') {
			ids = [ids];
		}

		ids.forEach((key) => {
			const ind = this.findItemIndex(key);
			if (ind >= 0) {
				this._items.splice(ind, 1);
			}
		});

		return this;
	}

	private findItemIndex(item: IToolbarItem | string): number {
		const id = typeof item === 'string' ? item : item.id;
		return this._items.findIndex((item) => item.id === id);
	}
}

export const useToolbar = (): IUseToolbar => {
	const [toolbar] = useState<Toolbar>(new Toolbar());
	const [toolbarItems, setToolbarItems] = useState<IToolbarItem[]>(
		toolbar.items
	);

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
		},
	};
};
