import * as RadixPopover from "@radix-ui/react-popover";
import { createCompRef } from "../create-ref";

export const PopoverRoot = createCompRef(RadixPopover.Root);
export const PopoverTrigger = createCompRef(RadixPopover.Trigger);
export const PopoverContent = createCompRef(RadixPopover.Content);
export const PopoverClose = createCompRef(RadixPopover.Close);
export const PopoverArrow = createCompRef(RadixPopover.Arrow);
export const PopoverPortal = RadixPopover.Portal;
