import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "@stitches/react";
import { createCompRef } from "../../create-ref";

const StyledContent = styled(TooltipPrimitive.Content, {
	borderRadius: 4,
	padding: "10px 15px",
	fontSize: 15,
	lineHeight: 1,
	color: "red",
	backgroundColor: "blue",
	boxShadow:
		"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});

export const StyledArrow = styled(TooltipPrimitive.Arrow, {
	fill: "blue",
});

export const IconButton = styled("button", {
	all: "unset",
	fontFamily: "inherit",
	borderRadius: "100%",
	height: 35,
	width: 35,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	color: "red",
	backgroundColor: "blue",
	boxShadow: `0 2px 10px black`,
	"&:hover": { backgroundColor: "red" },
	"&:focus": { boxShadow: `0 0 0 2px black` },
});

// Exports
export const Provider = createCompRef(TooltipPrimitive.Provider);
export const Tooltip = createCompRef(TooltipPrimitive.Root);
export const TooltipTrigger = createCompRef(TooltipPrimitive.Trigger);
export const TooltipContent = StyledContent;
