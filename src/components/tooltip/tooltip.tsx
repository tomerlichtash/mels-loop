// import React from "react";
import { styled, keyframes } from "@stitches/react";
// import { PlusIcon } from "@radix-ui/react-icons";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// const slideUpAndFade = keyframes({
// 	"0%": { opacity: 0, transform: "translateY(2px)" },
// 	"100%": { opacity: 1, transform: "translateY(0)" },
// });

// const slideRightAndFade = keyframes({
// 	"0%": { opacity: 0, transform: "translateX(-2px)" },
// 	"100%": { opacity: 1, transform: "translateX(0)" },
// });

// const slideDownAndFade = keyframes({
// 	"0%": { opacity: 0, transform: "translateY(-2px)" },
// 	"100%": { opacity: 1, transform: "translateY(0)" },
// });

// const slideLeftAndFade = keyframes({
// 	"0%": { opacity: 0, transform: "translateX(2px)" },
// 	"100%": { opacity: 1, transform: "translateX(0)" },
// });

// const scaleIn = keyframes({
// 	"0%": { opacity: 0, transform: "scale(0)" },
// 	"100%": { opacity: 1, transform: "scale(1)" },
// });

const StyledContent = styled(TooltipPrimitive.Content, {
	borderRadius: 4,
	padding: "10px 15px",
	fontSize: 15,
	lineHeight: 1,
	color: "red",
	backgroundColor: "blue",
	boxShadow:
		"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
	// "@media (prefers-reduced-motion: no-preference)": {
	// 	animationDuration: "400ms",
	// 	animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
	// 	animationFillMode: "forwards",
	// 	willChange: "transform, opacity",
	// 	transformOrigin: "var(--radix-tooltip-content-transform-origin)",
	// 	animation: `${scaleIn()} 0.1s ease-out forwards`,
	// 	'&[data-state="delayed-open"]': {
	// 		'&[data-side="top"]': { animationName: slideDownAndFade },
	// 		'&[data-side="right"]': { animationName: slideLeftAndFade },
	// 		'&[data-side="bottom"]': { animationName: slideUpAndFade },
	// 		'&[data-side="left"]': { animationName: slideRightAndFade },
	// 	},
	// },
});

export const StyledArrow = styled(TooltipPrimitive.Arrow, {
	fill: "blue",
});

// Exports
export const Provider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = StyledContent;

// Your app...
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

// const TooltipDemo = () => {
// 	return (
// 		<Tooltip defaultOpen={true} delayDuration={0} open={true}>
// 			<TooltipTrigger asChild>
// 				<IconButton>
// 					<PlusIcon />
// 				</IconButton>
// 			</TooltipTrigger>
// 			<StyledContent sideOffset={5}>
// 				Add to library
// 				<StyledArrow />
// 			</StyledContent>
// 		</Tooltip>
// 	);
// };

// export default TooltipDemo;
