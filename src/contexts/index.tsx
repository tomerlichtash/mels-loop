import { LocaleContextProvider } from "../locale/context/locale-context";
import { PageContextProvider } from "../contexts/page-context";
import { ThemeProvider } from "next-themes";

export const AppContext = ({ children, router, documentPath }) => {
	return (
		<LocaleContextProvider router={router}>
			<PageContextProvider documentPath={documentPath}>
				<ThemeProvider
					defaultTheme="light"
					storageKey="ml-theme"
					attribute="data-ml-theme"
				>
					<>{children}</>
				</ThemeProvider>
			</PageContextProvider>
		</LocaleContextProvider>
	);
};
