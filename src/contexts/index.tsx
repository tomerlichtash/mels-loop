import { LocaleContextProvider } from "../contexts/locale-context";
import { PageContextProvider } from "../contexts/page-context";
import { ThemeContextProvider } from "../contexts/theme-context";

export const AppContext = ({ children, router }) => {
	return (
		<LocaleContextProvider router={router}>
			<PageContextProvider>
				<ThemeContextProvider>
					<>{children}</>
				</ThemeContextProvider>
			</PageContextProvider>
		</LocaleContextProvider>
	);
};
