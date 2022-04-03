import React from "react";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import {
	ScrollableArea,
	ScrollViewport,
	ScrollBar,
	ScrollBarThumb,
} from "./scroll-area-primitives";
import { st, classes } from "./scrollbar.st.css";

export interface ScrollAreaProps extends ScrollAreaScrollbarVisibleProps {
	height?: string;
}

export function ScrollArea({
	children,
	orientation = "vertical",
	height = "100vh",
	className,
}: ScrollAreaProps) {
	return (
		<ScrollableArea className={st(classes.root, className)} type="always">
			<ScrollViewport style={{ height: `${height}` }}>
				{children}
			</ScrollViewport>
			<ScrollBar orientation={orientation} className={classes.scrollbar}>
				<ScrollBarThumb className={classes.thumb} />
			</ScrollBar>
		</ScrollableArea>
	);
}
