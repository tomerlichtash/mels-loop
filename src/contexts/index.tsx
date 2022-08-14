import { LocaleContextProvider } from "../contexts/locale-context";
import { PageContextProvider } from "../contexts/page-context";
import { ThemeContextProvider } from "../contexts/theme-context";
import { isExperimentEnabled } from "../config";

export const AppContext = ({ children, router }) => {
	return (
		<LocaleContextProvider router={router}>
			<PageContextProvider>
				{isExperimentEnabled("DarkTheme") ? (
					<ThemeContextProvider>
						<>{children}</>
					</ThemeContextProvider>
				) : (
					<>{children}</>
				)}
			</PageContextProvider>
		</LocaleContextProvider>
	);
};
