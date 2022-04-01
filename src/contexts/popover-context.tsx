import { Context, createContext } from "react";
import { IPopoverContext } from "../interfaces/IPopoverContext";

const ctx = createContext<IPopoverContext>(null);

export const ReactPopoverContext: Context<IPopoverContext> = ctx;
