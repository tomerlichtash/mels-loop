import * as Tooltip from "@radix-ui/react-tooltip";
import extendPrimitive from "./extendPrimitive";

export const TooltipProvider = extendPrimitive(Tooltip.Provider);
export const TooltipRoot = extendPrimitive(Tooltip.Root);
export const TooltipPortal = extendPrimitive(Tooltip.Portal);
export const TooltipContent = extendPrimitive(Tooltip.Content);
export const TooltipArrow = extendPrimitive(Tooltip.Arrow);
