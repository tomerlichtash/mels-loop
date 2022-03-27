import { Context, createContext } from "react";
import { IDynamicContentContext } from "../interfaces/dynamic-content-context";

const ctx = createContext<IDynamicContentContext>(null);

export const ReactDynamicContentContext: Context<IDynamicContentContext> = ctx;
