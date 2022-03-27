import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import { createCompRef } from "../create-ref";
import { st, classes } from "./scrollbar.st.css";

export interface ScrollAreaProps extends ScrollAreaScrollbarVisibleProps {
	height?: string;
}

const StyledScrollArea = createCompRef(ScrollAreaPrimitive.Root);
const ScrollViewport = createCompRef(ScrollAreaPrimitive.Viewport);
const ScrollBar = createCompRef(ScrollAreaPrimitive.Scrollbar);
const ScrollBarThumb = createCompRef(ScrollAreaPrimitive.Thumb);

export function ScrollArea({
	children,
	orientation = "vertical",
	height = "100vh",
	className,
}: ScrollAreaProps) {
	return (
		<StyledScrollArea className={st(classes.root, className)} type="always">
			<ScrollViewport style={{ height: `${height}` }}>
				{children}
			</ScrollViewport>
			<ScrollBar orientation={orientation} className={classes.scrollbar}>
				<ScrollBarThumb className={classes.thumb} />
			</ScrollBar>
		</StyledScrollArea>
	);
}
