import { Context, createContext } from "react";
import { ILayoutContext } from "../interfaces/layout-context";

export class LayoutContext {
	public readonly locale: string;
	public readonly compLocale: Record<string, string>;
	translate(s: string): string {
		return `%${s}%`;
	}
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
