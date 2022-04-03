import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { createCompRef } from "../create-ref";

export const Provider = createCompRef(TooltipPrimitive.Provider);
export const Tooltip = createCompRef(TooltipPrimitive.Root);
export const TooltipTrigger = createCompRef(TooltipPrimitive.Trigger);
export const TooltipContent = createCompRef(TooltipPrimitive.Content);
export const TooltipArrow = createCompRef(TooltipPrimitive.Arrow);
