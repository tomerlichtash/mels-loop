import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname } = router;

	const compLocale = Object.values(SITE_PAGES).filter(
		(p) => p.pathname === pathname
	)[0].locale;

	return (
		<Component
			compLocale={compLocale}
			translate={translate(locale)}
			{...pageProps}
		/>
	);
}

export default App;
