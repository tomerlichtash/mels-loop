import React from "react";
import { AppProps } from "next/app";
import type { IconProps } from "@radix-ui/react-icons/dist/types.d";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { translateFunc } from "../locales/translate";
import { useRouter } from "next/router";
import { ILayoutContext } from "../interfaces/layout-context";
import { ReactLayoutContext } from "../contexts/layout-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import {
	getPathData,
	getSiteTitle,
	getSiteSubtitle,
	getPopoverBackLabel,
} from "../config/pages";
import { QueryManager } from "../contexts/query-manager";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale } = router;
	const translate = translateFunc(locale);
	const pathData = getPathData(router.route);
	const queryContext = new QueryContext(new QueryManager({ _router: router }));
	const contentContext = new PageContext(new DynamicContentServer());
	const layoutContext: ILayoutContext = {
		locale,
		compLocale: pathData?.locale,
		localeInfo:
			locale === "he"
				? {
						direction: "rtl",
						right: "left",
						left: "right",
						arrowLeft: (props: Partial<IconProps>) => (
							<ArrowRightIcon {...props} />
						),
						arrowRight: (props: Partial<IconProps>) => (
							<ArrowLeftIcon {...props} />
						),
				  }
				: {
						direction: "ltr",
						right: "right",
						left: "left",
						arrowLeft: (props: Partial<IconProps>) => (
							<ArrowLeftIcon {...props} />
						),
						arrowRight: (props: Partial<IconProps>) => (
							<ArrowRightIcon {...props} />
						),
				  },
		translate,
		getSiteTitle,
		getSiteSubtitle,
		getPopoverBackLabel,
		popoverRef: React.createRef(),
	};
	return (
		<ReactQueryContext.Provider value={queryContext}>
			<ReactLayoutContext.Provider value={layoutContext}>
				<ReactPageContext.Provider value={contentContext}>
					<Component {...pageProps} />
				</ReactPageContext.Provider>
			</ReactLayoutContext.Provider>
		</ReactQueryContext.Provider>
	);
}

export default App;
