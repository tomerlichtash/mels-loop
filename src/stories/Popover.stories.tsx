import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Popover } from "../components/popover/popover";
import Layout from "../components/layout";
import { st, classes } from "../components/layout/layout.st.css";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { getLocaleInfo } from "../locales/locale-info";
import { translateFunc } from "../locales/translate";

const SampleComp = Popover;

export default {
	title: "UI/Popover",
	component: SampleComp,
} as ComponentMeta<typeof SampleComp>;

const Template: ComponentStory<typeof SampleComp> = (args) => (
	<SampleComp {...args} />
);

export const Normal = Template.bind({});
export const OpenLTR = Template.bind({});
export const OpenRTL = Template.bind({});

const content = (
	<div>
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit! Aenean commodo
			ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
			dis parturient montes, nascetur ridiculus mus; Donec quam felis, ultricies
			nec, pellentesque eu, pretium quis, sem? Nulla consequat massa quis enim.
			Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu? In
			enim justo, rhoncus ut,
		</p>
		<p>
			imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis
			pretium; Integer tincidunt; Cras dapibus! Vivamus elementum semper nisi?
			Aenean vulputate eleifend tellus? Aenean leo ligula, porttitor eu,
			consequat vitae, eleifend ac, enim; Aliquam lorem ante, dapibus in,
			viverra quis, feugiat a, tellus? Phasellus viverra nulla ut metus varius
			laoreet! Quisque rutrum! Aenean imperdiet? Etiam ultricies nisi vel augue;
			Curabitur ullamcorper ultricies nisi. Nam eget dui!
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit! Aenean commodo
			ligula eget dolor? Aenean massa. Cum sociis natoque penatibus et magnis
			dis parturient montes, nascetur ridiculus mus; Donec quam felis, ultricies
			nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim?
			Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
			enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
			felis eu pede mollis pretium; Integer tincidunt; Cras dapibus! Vivamus
			elementum semper nisi. Aenean vulputate eleifend tellus! Aenean leo
			ligula, porttitor eu, consequat vitae, eleifend ac, enim; Aliquam lorem
			ante, dapibus in, viverra quis, feugiat a, tellus! Phasellus viverra nulla
			ut metus varius laoreet. Quisque rutrum! Aenean imperdiet! Etiam ultricies
			nisi vel augue
		</p>
	</div>
);

const enProps = {
	side: "right",
};
const heProps = {
	side: "left",
};

const layoutContext = (locale: string): ILayoutContext => {
	return {
		locale,
		compLocale: {},
		localeInfo: getLocaleInfo(locale),
		translate: translateFunc(locale),
		getSiteTitle: () => "SiteTitle",
		getSiteSubtitle: () => "SiteSubTitle",
	};
};

/**
 * Closed Popover, showing only trigger, clickable, opens content
 */
Normal.args = {
	trigger: <div>trigger</div>,
	children: content,
	...enProps,
};

/**
 * Open Popover English LTR
 */
OpenLTR.args = {
	trigger: <div>trigger</div>,
	children: content,
	decorator: (children) => {
		<ReactLayoutContext.Provider value={layoutContext("en")}>
			{children}
		</ReactLayoutContext.Provider>;
	},
	open: true,
	...enProps,
};

/**
 * Open Popover English RTL
 */
OpenRTL.args = {
	trigger: <div>trigger</div>,
	children: content,
	decorator: (children) => {
		<ReactLayoutContext.Provider value={layoutContext("he")}>
			{children}
		</ReactLayoutContext.Provider>;
	},
	open: true,
	...heProps,
};
