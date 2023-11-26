import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import extendPrimitive from "./extendPrimitive";

import type { TextDirection } from "../../locale/locale-context";

export interface ScrollAreaProps extends ScrollAreaScrollbarVisibleProps {
	height?: string;
	textDirection: TextDirection;
}

export const ScrollArea = extendPrimitive(ScrollAreaPrimitive.Root);
export const ScrollViewport = extendPrimitive(ScrollAreaPrimitive.Viewport);
export const ScrollBar = extendPrimitive(ScrollAreaPrimitive.Scrollbar);
export const ScrollBarThumb = extendPrimitive(ScrollAreaPrimitive.Thumb);
export const ScrollBarCorner = extendPrimitive(ScrollAreaPrimitive.Corner);
