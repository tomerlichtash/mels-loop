import {
	enterFromRight,
	enterFromLeft,
	exitToRight,
	exitToLeft,
	scaleIn,
	scaleOut,
	fadeIn,
	fadeOut,
} from "./stiches-keyframes";

export const styledContentStyle = {
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
};

export const styledViewportStyle = {
	position: "relative",
	transformOrigin: "top center",
	marginTop: 10,
	borderRadius: 6,
	overflow: "hidden",
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
};

export const styledCaretStyle = {
	position: "relative",
	color: "black",
	top: 1,
	"[data-state=open] &": { transform: "rotate(-180deg)" },
	"@media (prefers-reduced-motion: no-preference)": {
		transition: "transform 250ms ease",
	},
};

export const styledIndicatorStyle = {
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
};
