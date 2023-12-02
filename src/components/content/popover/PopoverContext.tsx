import { Context, createContext } from "react";
import { IPopoverContext } from "../types/IPopoverContext";

const ctx = createContext<IPopoverContext>(null);

export const PopoverContext: Context<IPopoverContext> = ctx;

export const PopoverProvider = ({ value, children }) => {
	return (
		<PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
	);
};
