import { Context, createContext } from "react";
import { IDynamicContentContext } from "../components/content/types/dynamic-content-context";

const ctx = createContext<IDynamicContentContext>(null);

export const DynamicContentContext: Context<IDynamicContentContext> = ctx;
