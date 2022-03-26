import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { styled } from "@stitches/react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { stVars } from "../../theme/common.st.css";
import {
	enterFromRight,
	enterFromLeft,
	exitToRight,
	exitToLeft,
	scaleIn,
	scaleOut,
	fadeIn,
	fadeOut,
} from "./keyframes";

const { primary3, level6, primary1, level3, level1 } = stVars;

const colors = {
	linkTitle: primary3 as string,
	linkText: level6 as string,
	itemStyleCommon: primary1 as string,
	itemStyleCommonBg: level3 as string,
	listItemBgHover: level3 as string,
	viewportBg: level1 as string,
};

const itemStyles = {
	padding: "8px 12px",
	outline: "none",
	userSelect: "none",
	fontWeight: 500,
	lineHeight: 1,
	borderRadius: 4,
	fontSize: 15,
	color: colors.itemStyleCommon,
	"&:focus": { position: "relative", boxShadow: `0 0 0 2px lightgreen` },
	"&:hover": { backgroundColor: colors.itemStyleCommonBg },
};

export const navMenuLinkStyle = {
	padding: 12,
	borderRadius: 6,
	"&:hover": { backgroundColor: colors.listItemBgHover },
};

export const StyledMenu = styled(NavigationMenuPrimitive.Root, {
	position: "relative",
	display: "flex",
	justifyContent: "center",
	width: "500px",
	zIndex: 1,
});

export const StyledList = styled(NavigationMenuPrimitive.List, {
	all: "unset",
	display: "flex",
	justifyContent: "center",
	// backgroundColor: "white",
	padding: 4,
	borderRadius: 6,
	listStyle: "none",
	// boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

export const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
	all: "unset",
	...itemStyles,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 2,
});

export const StyledCaret = styled(CaretDownIcon, {
	position: "relative",
	color: "black",
	top: 1,
	"[data-state=open] &": { transform: "rotate(-180deg)" },
	"@media (prefers-reduced-motion: no-preference)": {
		transition: "transform 250ms ease",
	},
});

export const StyledLink = styled(NavigationMenuPrimitive.Link, {
	...itemStyles,
	display: "block",
	textDecoration: "none",
	fontSize: 15,
	lineHeight: 1,
});

export const StyledContent = styled(NavigationMenuPrimitive.Content, {
	position: "absolute",
	top: 0,
	left: 0,
	// width: "1200px",
	"@media only screen and (min-width: 600px)": { width: "auto" },
	"@media (prefers-reduced-motion: no-preference)": {
		animationDuration: "250ms",
		animationTimingFunction: "ease",
		'&[data-motion="from-start"]': { animationName: enterFromLeft },
		'&[data-motion="from-end"]': { animationName: enterFromRight },
		'&[data-motion="to-start"]': { animationName: exitToLeft },
		'&[data-motion="to-end"]': { animationName: exitToRight },
	},
});

export const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	height: 10,
	top: "100%",
	overflow: "hidden",
	zIndex: 1,

	"@media (prefers-reduced-motion: no-preference)": {
		transition: "width, transform 250ms ease",
		'&[data-state="visible"]': { animation: `${fadeIn()} 200ms ease` },
		'&[data-state="hidden"]': { animation: `${fadeOut()} 200ms ease` },
	},
});

export const StyledArrow = styled("div", {
	position: "relative",
	top: "70%",
	backgroundColor: "white",
	width: 10,
	height: 10,
	transform: "rotate(45deg)",
	borderTopLeftRadius: 2,
});

export const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
	position: "relative",
	transformOrigin: "top center",
	marginTop: 10,
	// width: "100%",
	// width: "520px",
	backgroundColor: colors.viewportBg,
	borderRadius: 6,
	overflow: "hidden",
	// border: "1px solid",
	boxShadow:
		"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
	height: "var(--radix-navigation-menu-viewport-height)",

	"@media only screen and (min-width: 600px)": {
		width: "var(--radix-navigation-menu-viewport-width)",
	},
	"@media (prefers-reduced-motion: no-preference)": {
		transition: "width, height, 300ms ease",
		'&[data-state="open"]': { animation: `${scaleIn()} 200ms ease` },
		'&[data-state="closed"]': { animation: `${scaleOut()} 200ms ease` },
	},
});

// Exports
export const NavigationMenu = StyledMenu;
export const NavigationMenuList = StyledList;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuLink = StyledLink;
export const NavigationMenuContent = StyledContent;
export const NavigationMenuViewport = StyledViewport;

export const ContentList = styled("ul", {
	display: "grid",
	padding: 22,
	margin: 0,
	columnGap: 10,
	listStyle: "none",

	variants: {
		layout: {
			one: {
				"@media only screen and (min-width: 600px)": {
					width: 400,
					gridTemplateColumns: "1fr 1fr",
				},
			},
			two: {
				"@media only screen and (min-width: 600px)": {
					width: 400,
					gridAutoFlow: "column",
					gridTemplateRows: "repeat(3, 1fr)",
				},
			},
		},
	},
});

export const ListItem = styled("li", {});

export const LinkTitle = styled("div", {
	fontWeight: 500,
	lineHeight: 1.2,
	marginBottom: 5,
	color: colors.linkTitle,
});

export const LinkText = styled("p", {
	all: "unset",
	color: colors.linkText,
	lineHeight: 1.4,
	fontWeight: "initial",
});

export const ViewportPosition = styled("div", {
	position: "absolute",
	display: "flex",
	justifyContent: "center",
	width: "100%",
	top: "100%",
	left: 0,
	perspective: "2000px",
});
