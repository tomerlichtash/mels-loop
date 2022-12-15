import { LocaleContextProvider } from "../contexts/locale-context";
import { PageContextProvider } from "../contexts/page-context";
import { ThemeContextProvider } from "../contexts/theme-context";

export const AppContext = ({ children, router, documentPath }) => {
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
