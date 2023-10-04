import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import { createCompRef } from "./helpers";

import type { TextDirection } from "../../../interfaces/locale-context";

export interface ScrollAreaProps extends ScrollAreaScrollbarVisibleProps {
	height?: string;
	textDirection: TextDirection;
}

export const ScrollArea = createCompRef(ScrollAreaPrimitive.Root);
export const ScrollViewport = createCompRef(ScrollAreaPrimitive.Viewport);
export const ScrollBar = createCompRef(ScrollAreaPrimitive.Scrollbar);
export const ScrollBarThumb = createCompRef(ScrollAreaPrimitive.Thumb);
export const ScrollBarCorner = createCompRef(ScrollAreaPrimitive.Corner);
