import React, { useState } from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";


export interface IUseToolbarProps {

}


class Toolbar {
	private readonly _items: IToolbarItem[];

	constructor() {
		this._items = [];
	}

	public get items(): IToolbarItem[] {
		return this._items.slice();
	}

	public addItems(items: IToolbarItem | IToolbarItem[]): this {
		if (!items) {
			return;
		}
		if (!Array.isArray(items)) {
			items = [items];
		}
		this._items.push(...items.filter(i => 
			i?.element && !this.hasItem(i))
		);
		return this;
	}

	private hasItem(item: IToolbarItem): boolean {
		const ind = this._items.findIndex(i => i.key === item.key);
		return ind >= 0;
	}
}

export const useToolbar = () => {
	const [toolbar] = useState<Toolbar>(new Toolbar());

	return {
		toolbar: toolbar
	}
}