import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { PageContext, ReactPageContext } from "../components/page/page-context";
import { PageContentAttributes, SitePage } from "../interfaces/models";
import { DynamicContentServer } from "../lib/dynamic-content-server";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;

	const pageParent = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const pathHasChild = (query.id || "") as string;
	const sitePageId = query.id && pathHasChild ? pageParent : asPath;
	const pathData = Object.values(SITE_PAGES).filter(
		(p) => p.targetPathname === sitePageId
	)[0];
	const compLocale = pathData?.locale || ERROR_404_PAGE_LOCALE;
	const pageId = pathData?.id ? pathData.id : pathHasChild;

	const pages = SITE_PAGES.map(({ id, menuNav }: SitePage) => {
		return { id, menuNav };
	});

	const translateFunc = translate(locale);

	const isCurrentPage = (id: string): boolean => {
		if (pageParent) {
			const pageData = SITE_PAGES.filter((p) => p.id === pageParent)[0];
			if (!pageData?.children?.includes(id)) {
				return pageParent === id;
			}
		}
		return pageId === id;
	};

	const getPageName = (id: string) => {
		const page = SITE_PAGES.filter((p) => p.id === id);

		if (!page.length) {
			throw new Error(`Missing page key: ${id}`);
		}

		const { label } = page[0];

		if (!label) {
			throw new Error(`Missing label for pageId ${id}`);
		}

		return translateFunc(label);
	};

	const getPath = (id: string) => {
		const page = SITE_PAGES.filter((p) => p.id === id);

		if (!page.length) {
			throw new Error(`Missing page key: ${id}`);
		}

		const { targetPathname } = page[0];

		if (!targetPathname) {
			throw new Error(`Missing targetPathname for pageId ${id}`);
		}

		return targetPathname;
	};

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		pageId,
		pages,
		getPath,
		getPageName,
		isCurrentPage,
		translate: translateFunc,
	};

	const contentContext = new PageContext(
		new DynamicContentServer(),
		PageContentAttributes.Plain
	);

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
