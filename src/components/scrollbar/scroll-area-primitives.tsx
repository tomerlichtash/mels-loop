import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { createCompRef } from "../create-ref";

export const ScrollableArea = createCompRef(ScrollAreaPrimitive.Root);
export const ScrollViewport = createCompRef(ScrollAreaPrimitive.Viewport);
export const ScrollBar = createCompRef(ScrollAreaPrimitive.Scrollbar);
export const ScrollBarThumb = createCompRef(ScrollAreaPrimitive.Thumb);
