import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { createCompRef } from "../create-ref";

export const Dropdown = createCompRef(DropdownMenu.Root);
export const DropdownTrigger = createCompRef(DropdownMenu.Trigger);
export const DropdownContent = createCompRef(DropdownMenu.Content);
export const DropdownSeparator = createCompRef(DropdownMenu.Separator);
export const DropdownItem = createCompRef(DropdownMenu.Item);
