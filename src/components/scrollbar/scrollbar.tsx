import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";

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
}: ScrollAreaProps) {
	const { textDirection } = useContext(ReactLocaleContext);
	return (
		<StyledScrollArea
			className="scrollbar-root"
			type="always"
			dir={textDirection}
		>
			<ScrollViewport style={{ height: `${height}` }}>
				{children}
			</ScrollViewport>
			<ScrollBar orientation={orientation} className="scrollbar">
				<ScrollBarThumb className="scrollbar-thumb" />
			</ScrollBar>
		</StyledScrollArea>
	);
}
