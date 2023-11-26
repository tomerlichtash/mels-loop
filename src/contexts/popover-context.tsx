import { Context, createContext } from "react";
import { IPopoverContext } from "../interfaces/IPopoverContext";

const ctx = createContext<IPopoverContext>(null);

export const ReactPopoverContext: Context<IPopoverContext> = ctx;

export const PopoverContextProvider = ({ value, children, router }) => {
	const ref = { myref: "dada" };
	return (
		<ReactPopoverContext.Provider value={{ ref, ...value }}>
			{children}
		</ReactPopoverContext.Provider>
	);
};
