import React from "react";
import { styled } from "@stitches/react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

const SCROLLBAR_SIZE = 8;

export const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
	width: "$full",
	height: "$full",
	overflow: "hidden",
});

export const ScrollViewport = styled(ScrollAreaPrimitive.Viewport, {
	width: "100%",
	height: "300px",
	borderRadius: "inherit",
});

export const ScrollBar = styled(ScrollAreaPrimitive.Scrollbar, {
	display: "flex",
	// ensures no selection
	userSelect: "none",
	// disable browser handling of all panning and zooming gestures on touch devices
	touchAction: "none",
	padding: 12,
	background: "transparent",
	transition: "background 160ms ease-out",
	// "&:hover": { background: "gray" },
	cursor: "pointer",
	'&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
});

export const ScrollBarThumb = styled(ScrollAreaPrimitive.Thumb, {
	flex: 1,
	// background: '$background-neutral-strong',
	background: "#E6E3D8",
	borderRadius: 0,
	// increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
	position: "relative",
	"&::before": {
		content: "",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "100%",
		height: "100%",
		minWidth: 44,
		minHeight: 44,
	},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ScrollArea({ children, orientation = "vertical" }: any) {
	return (
		<StyledScrollArea>
			<ScrollViewport>{children}</ScrollViewport>
			<ScrollBar orientation={orientation}>
				<ScrollBarThumb />
			</ScrollBar>
		</StyledScrollArea>
	);
}
