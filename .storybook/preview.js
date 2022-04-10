import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	layout: "fullscreen",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
		locales: ["en", "he"],
		locale: "en",
	},
};
