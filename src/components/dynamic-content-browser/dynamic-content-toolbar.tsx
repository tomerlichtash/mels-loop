import React, { useContext, useEffect, useState } from "react";
import { IParsedPageData } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ReactDynamicContentContext } from "../../contexts/dynamic-content-context";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { classes } from "./dynamic-content-browser.st.css";

export interface IDynamicContentToolbarProps {
	pages: IParsedPageData[];
}

const NAV_BUTTON_KEY = "header-back";

export default function DynamicContentToolbar({
	pages,
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageid] = useState("");
	const { localeInfo, translate, getPopoverBackLabel } =
		useContext(ReactLayoutContext);
	const popoverCtx = useContext(ReactPopoverContext);
	const dcCtx = useContext(ReactDynamicContentContext);

	useEffect(() => {
		if (pages.length < 2) {
			popoverCtx.removeToolbarItems(NAV_BUTTON_KEY);
			return;
		}
		const prevPage = pages[pages.length - 2]; // guaranteed
		if (prevPage.id === prevPageId) {
			return;
		}
		setPrevPageid(prevPage.id);
		const title =
			prevPage.metaData.title ||
			translate(prevPage.metaData.glossary_key) ||
			prevPage.id;
		popoverCtx.addToolbarItems({
			element: (
				<button
					className={classes.backButton}
					onClick={() => {
						dcCtx.setPageIndex(pages.length - 2);
					}}
					title={title}
					key={mlUtils.uniqueId(NAV_BUTTON_KEY)}
				>
					{localeInfo.arrowLeft({})} {translate(getPopoverBackLabel())}
				</button>
			),
			id: NAV_BUTTON_KEY,
			enabled: true,
		});
	}, [
		pages,
		prevPageId,
		localeInfo,
		dcCtx,
		popoverCtx,
		translate,
		getPopoverBackLabel,
	]);

	return <></>;
}
