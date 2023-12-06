import { Context, createContext } from "react";
import { IDynamicContentContext } from "./types/dynamic-content-context";

const ctx = createContext<IDynamicContentContext>(null);

export const DynamicContentContext: Context<IDynamicContentContext> = ctx;
