import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { PageContext, ReactPageContext } from "../components/page/page-context";
import { PageContentAttributes } from "../interfaces/models";
import { DynamicContentServer } from "../lib/dynamic-content-server";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname } = router;

	const pathData = Object.values(SITE_PAGES).filter(
		(p) => p.pathname === pathname
	)[0];

	const compLocale = (pathData && pathData.locale) || ERROR_404_PAGE_LOCALE;

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		translate: translate(locale),
	};

	const contentContext = new PageContext(
		new DynamicContentServer(),
		PageContentAttributes.Plain);

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
