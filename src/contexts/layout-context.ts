import { Context, createContext } from "react";
import { ILayoutContext } from "../interfaces/layout-context";
import { SitePage } from "../interfaces/models";

export class LayoutContext {
	public readonly locale: string;
	public readonly compLocale: Record<string, string>;
	public readonly pageParent: string;
	public readonly pageId: string;
	public readonly pages: SitePage[];
	translate(s: string): string {
		return `%${s}%`;
	}
	isCurrentPage(): // source: string,
	// id: string,
	// parent,
	// pages: SitePage[]
	boolean {
		return false;
	}
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
