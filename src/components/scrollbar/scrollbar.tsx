import React from "react";
import { st, classes } from "./scrollbar.st.css";

import {
	StyledScrollArea,
	ScrollViewport,
	ScrollBar,
	ScrollBarThumb,
	ScrollAreaProps,
} from "../radix-primitives";

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
