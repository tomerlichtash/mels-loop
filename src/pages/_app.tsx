import React, { useState } from "react";
import { AppProps } from "next/app";
import { translateFunc } from "../locales/translate";
import { useRouter } from "next/router";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { PageContext, ReactPageContext } from "../components/page/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import {
	getPathData,
	getPagePath,
	getPageRefs,
	getPageName,
	isCurrentPage,
	isPageVisible,
	getSiteTitle,
	getSiteSubtitle,
} from "../config/pages";
import { IPosition } from "../components/peephole/peephole";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;
	const parentId = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const queryId = query.id as string;
	const sitePageId = queryId ? parentId : asPath;
	const pathData = getPathData(sitePageId);
	const pageId = pathData?.id || queryId;
	const translate = translateFunc(locale);

	const [showPeephole, setShowPeephole] = useState(false);
	const [peepholePosition, setPeepholePosition] = useState<IPosition>({
		x: 0,
		y: 0,
	});

	const layoutContext: ILayoutContext = {
		locale,
		compLocale: pathData?.locale,
		pageId,
		getPageRefs,
		getPagePath,
		getPageName: (id: string) => translate(getPageName(id)),
		isCurrentPage: (id: string) => isCurrentPage(id, pageId, parentId),
		isPageVisible,
		translate,
		getSiteTitle,
		getSiteSubtitle,
		peepholePosition,
		setPeepholePosition: (x: number, y: number) => {
			return setPeepholePosition({ x, y });
		},
		showPeephole,
		togglePeephole: (state?: boolean) =>
			setShowPeephole(state || !showPeephole),
	};

	const contentContext = new PageContext(new DynamicContentServer());

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
