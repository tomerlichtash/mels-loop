import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { styled } from "@stitches/react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
	styledContentStyle,
	styledViewportStyle,
	styledCaretStyle,
	styledIndicatorStyle,
} from "./stiches-styles";
import { createCompRef } from "../create-ref";

const StyledMenu = createCompRef(NavigationMenuPrimitive.Root);
const StyledList = createCompRef(NavigationMenuPrimitive.List);
const StyledMenuItem = createCompRef(NavigationMenuPrimitive.Item);
const StyledTrigger = createCompRef(NavigationMenuPrimitive.Trigger);
const StyledLink = createCompRef(NavigationMenuPrimitive.Link);

/**
 * Keep in stiches for animation
 */
const StyledContent = styled(
	NavigationMenuPrimitive.Content,
	styledContentStyle
);
const StyledViewport = styled(
	NavigationMenuPrimitive.Viewport,
	styledViewportStyle
);
const StyledIndicator = styled(
	NavigationMenuPrimitive.Indicator,
	styledIndicatorStyle
);
const StyledCaret = styled(CaretDownIcon, styledCaretStyle);

/**
 * Exports
 */
export const NavigationMenu = StyledMenu;
export const NavigationMenuList = StyledList;
export const NavigationMenuItem = StyledMenuItem;
export const NavigationMenuLink = StyledLink;
export const NavigationMenuContent = StyledContent;
export const NavigationMenuViewport = StyledViewport;
export const NavigationTrigger = StyledTrigger;
export const NavigationCaret = StyledCaret;
export const NavigationIndicator = StyledIndicator;
