import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname } = router;

	const pathData = Object.values(SITE_PAGES).filter(
		(p) => p.pathname === pathname
	)[0];
	const compLocale = (pathData && pathData.locale) || ERROR_404_PAGE_LOCALE;

	return (
		<Component
			compLocale={compLocale}
			translate={translate(locale)}
			{...pageProps}
		/>
	);
}

export default App;
