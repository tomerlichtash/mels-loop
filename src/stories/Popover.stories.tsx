// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { Popover } from "../components/popover/popover";
// import Layout from "../components/layout";
// import { ReactQueryContext } from "../contexts/query-context";
// import { _translate } from "../locales/translate";
// import { ContentComponent } from "../components/content";
// import { PageContext, ReactPageContext } from "../contexts/page-context";
// import { DynamicContentServer } from "../lib/dynamic-content-server";
// import { st, classes } from "../components/popover/popover.st.css";

// const SampleComp = Popover;
// const contentContext = new PageContext(new DynamicContentServer());

// const layoutContext = (locale: string): ILayoutContext => {
// 	return {
// 		locale,
// 		compLocale: {},
// 		// localeInfo: getLocaleInfo(locale),
// 		// translate: _translate(locale),
// 		getSiteTitle: () => "SiteTitle",
// 		getSiteSubtitle: () => "SiteSubTitle",
// 	};
// };

// export default {
// 	title: "UI/Popover",
// 	component: SampleComp,
// } as ComponentMeta<typeof SampleComp>;

export const mockData = [
	{
		type: "blockquote",
		line: 2,
		key: "ast-11",
		children: [
			{
				type: "link",
				line: 3,
				key: "ast-14",
				children: [
					{
						type: "text",
						key: "ast-15",
						line: 3,
						text: "Real Programmers",
					},
				],
				target: "glossary/real-programmer",
				displayType: "popover",
				linkType: "glossary",
				occurrenceIndex: 1,
				sequence: 1,
			},
			{
				type: "text",
				key: "ast-16",
				line: 3,
				text: " write in ",
			},
			{
				type: "link",
				line: 3,
				key: "ast-17",
				children: [
					{
						type: "text",
						key: "ast-18",
						line: 3,
						text: "FORTRAN",
					},
				],
				target: "glossary/fortran",
				displayType: "popover",
				linkType: "glossary",
				occurrenceIndex: 1,
				sequence: 2,
			},
			{
				type: "text",
				key: "ast-19",
				line: 3,
				text: ".",
			},
		],
	},
];

// const Template: ComponentStory<typeof SampleComp> = (args) => (
// 	<ReactQueryContext.Provider
// 		value={{
// 			query: {
// 				getLine: 1,
// 				registerNode: () => null,
// 				getQueryUrl: () => "someQuery",
// 			},
// 		}}
// 	>
// 		<ReactLayoutContext.Provider value={layoutContext("en")}>
// 			<ReactPageContext.Provider value={contentContext}>
// 				<Layout>
// 					{mockData.map((node) => {
// 						return (
// 							<ContentComponent
// 								key={node.key}
// 								// className={classes.contentComponent}
// 								componentData={{ node }}
// 							/>
// 						);
// 					})}

// 					{/* <article className={classes.root}>
// 					<p>
// 						Lorem ipsum dolor sit amet, consectetuer adipiscing elit! Aenean
// 						commodo ligula eget dolor. Aenean massa. Cum sociis natoque
// 						penatibus et magnis dis parturient montes, nascetur ridiculus mus;
// 						&nbsp;<SampleComp {...args}>{content}</SampleComp>&nbsp; Donec quam
// 						felis, ultricies nec, pellentesque eu, pretium quis, sem? Nulla
// 						consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
// 						nec, vulputate eget, arcu? In enim justo, rhoncus ut,
// 					</p>
// 				</article> */}
// 				</Layout>
// 			</ReactPageContext.Provider>
// 		</ReactLayoutContext.Provider>
// 	</ReactQueryContext.Provider>
// );

// export const Normal = Template.bind({});
// export const OpenLTR = Template.bind({});
// export const OpenRTL = Template.bind({});

// const content = (
// 	<div>
// 		<p>
// 			Lorem ipsum dolor sit amet, consectetuer adipiscing elit! Aenean commodo
// 			ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
// 			dis parturient montes, nascetur ridiculus mus; Donec quam felis, ultricies
// 			nec, pellentesque eu, pretium quis, sem? Nulla consequat massa quis enim.
// 			Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu? In
// 			enim justo, rhoncus ut,
// 		</p>
// 		<p>
// 			imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis
// 			pretium; Integer tincidunt; Cras dapibus! Vivamus elementum semper nisi?
// 			Aenean vulputate eleifend tellus? Aenean leo ligula, porttitor eu,
// 			consequat vitae, eleifend ac, enim; Aliquam lorem ante, dapibus in,
// 			viverra quis, feugiat a, tellus? Phasellus viverra nulla ut metus varius
// 			laoreet! Quisque rutrum! Aenean imperdiet? Etiam ultricies nisi vel augue;
// 			Curabitur ullamcorper ultricies nisi. Nam eget dui!
// 		</p>
// 		<p>
// 			Lorem ipsum dolor sit amet, consectetuer adipiscing elit! Aenean commodo
// 			ligula eget dolor? Aenean massa. Cum sociis natoque penatibus et magnis
// 			dis parturient montes, nascetur ridiculus mus; Donec quam felis, ultricies
// 			nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim?
// 			Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
// 			enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
// 			felis eu pede mollis pretium; Integer tincidunt; Cras dapibus! Vivamus
// 			elementum semper nisi. Aenean vulputate eleifend tellus! Aenean leo
// 			ligula, porttitor eu, consequat vitae, eleifend ac, enim; Aliquam lorem
// 			ante, dapibus in, viverra quis, feugiat a, tellus! Phasellus viverra nulla
// 			ut metus varius laoreet. Quisque rutrum! Aenean imperdiet! Etiam ultricies
// 			nisi vel augue
// 		</p>
// 	</div>
// );

/**
 * Closed Popover, showing only trigger, clickable, opens content
Normal.args = {
	trigger: <div>trigger</div>,
	children: content,
	...enProps,
};
 */

/**
 * Open Popover English LTR
 */
// OpenLTR.args = {
// 	type: "glossary",
// 	id: "someId",
// 	forcePopover: false,
// 	query: "http://example.com/glossary/someTerm",
// 	onExit: () => console.log("exit"),
// 	side: "right",
// 	trigger: "Popover Trigger",
// };

/**
 * Open Popover English RTL
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
 */
