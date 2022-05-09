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
	"[data-state=open] &": { transform: "rotate(-180deg)" },
	"@media (prefers-reduced-motion: no-preference)": {
		transition: "transform 250ms ease",
	},
};

export const styledIndicatorStyle = {
	"@media (prefers-reduced-motion: no-preference)": {
		transition: "width, transform 250ms ease",
		'&[data-state="visible"]': { animation: `${fadeIn()} 200ms ease` },
		'&[data-state="hidden"]': { animation: `${fadeOut()} 200ms ease` },
	},
};
