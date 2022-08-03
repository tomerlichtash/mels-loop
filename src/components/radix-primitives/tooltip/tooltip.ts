import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "@stitches/react";
import { createCompRef } from "../create-ref";

// const StyledContent = styled(TooltipPrimitive.Content);

export const StyledArrow = styled(TooltipPrimitive.Arrow, {
	// fill: "blue",
});

// Exports
export const Provider = createCompRef(TooltipPrimitive.Provider);
export const Tooltip = createCompRef(TooltipPrimitive.Root);
export const TooltipTrigger = createCompRef(TooltipPrimitive.Trigger);
export const TooltipContent = createCompRef(TooltipPrimitive.Content);
