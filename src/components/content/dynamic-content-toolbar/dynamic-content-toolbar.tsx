import React, { useContext, useEffect, useState } from "react";
import { IParsedPageData } from "../../../interfaces/models";
import { mlUtils } from "../../../lib/ml-utils";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { ReactDynamicContentContext } from "../../../contexts/dynamic-content-context";
import { ReactPopoverContext } from "../../../contexts/popover-context";
import { Button } from "@components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export interface IDynamicContentToolbarProps {
	pages: IParsedPageData[];
}

const NAV_BUTTON_KEY = "popover-toolbar-back-button";

export default function DynamicContentToolbar({
	pages,
}: IDynamicContentToolbarProps): JSX.Element {
	const [prevPageId, setPrevPageid] = useState("");
	const { textDirection, translate } = useContext(LocaleProvider);
	const popoverCtx = useContext(ReactPopoverContext);
	const dcCtx = useContext(ReactDynamicContentContext);

	useEffect(() => {
		if (pages.length < 2) {
			popoverCtx.removeToolbarItems(NAV_BUTTON_KEY);
			setPrevPageid("");
			return;
		}

		const idx = pages.length - 2;
		const prevPage = pages[idx]; // guaranteed

		if (prevPage.id === prevPageId) {
			return;
		}

		setPrevPageid(prevPage.id);

		const backButtonLabel =
			prevPage.metaData.title ||
			translate(prevPage.metaData.glossary_key) ||
			prevPage.id;

		popoverCtx.addToolbarItems({
			element: (
				<Button
					className="back-button"
					onClick={() => dcCtx.setPageIndex(idx)}
					title={backButtonLabel}
					key={mlUtils.uniqueId(NAV_BUTTON_KEY)}
				>
					{textDirection === "ltr" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				</Button>
			),
			id: NAV_BUTTON_KEY,
			enabled: true,
		});
	}, [pages, prevPageId, dcCtx, popoverCtx, translate, textDirection]);

	return <></>;
}
