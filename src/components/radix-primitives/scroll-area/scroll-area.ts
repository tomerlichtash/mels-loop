import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import { createCompRef } from "../../create-ref";

export interface ScrollAreaProps extends ScrollAreaScrollbarVisibleProps {
	height?: string;
}

export const StyledScrollArea = createCompRef(ScrollAreaPrimitive.Root);
export const ScrollViewport = createCompRef(ScrollAreaPrimitive.Viewport);
export const ScrollBar = createCompRef(ScrollAreaPrimitive.Scrollbar);
export const ScrollBarThumb = createCompRef(ScrollAreaPrimitive.Thumb);
