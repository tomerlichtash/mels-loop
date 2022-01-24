import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname } = router;
	// const compLocale = [];

	const compLocale = Object.values(SITE_PAGES).filter(
		(p) => p.pathname === pathname
	)[0].locale;
	// debugger;
	// const pages = SITE_PAGES;
	// const compLocale = [];
	console.log(pathname, SITE_PAGES);
	return (
		<Component
			compLocale={compLocale}
			translate={translate(locale)}
			{...pageProps}
		/>
	);
}

export default App;
