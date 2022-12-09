import React from "react";
import { LocaleContextProvider } from "../contexts/locale-context";
import { PageContextProvider } from "../contexts/page-context";
import { ThemeContextProvider } from "../contexts/theme-context";
import { IContextWithRouter } from "../interfaces/contexts";

export const AppContext = ({
	children,
	router,
	documentPath,
}: IContextWithRouter) => {
	return (
		<LocaleContextProvider router={router}>
			<PageContextProvider documentPath={documentPath}>
				<ThemeContextProvider>
					<>{children}</>
				</ThemeContextProvider>
			</PageContextProvider>
		</LocaleContextProvider>
	);
};
