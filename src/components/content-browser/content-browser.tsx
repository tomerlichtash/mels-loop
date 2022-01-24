import React from "react";
import ContentComponent from "../content/contentComponent";
import {
	IMLParsedNode,
	IParsedPageData,
	IContentComponentData,
	ComponentProps,
} from "../../interfaces/models";
import { classes } from "./content-browser.st.css";

const FULL_PAGE_RE = /full.*text/i;

export interface ContentBrowserProps extends ComponentProps {
	data: IContentComponentData;
	showTitle?: boolean;
	showMoto?: boolean;
	showCredits?: boolean;
}

export const ContentBrowser = (props: ContentBrowserProps): JSX.Element => {
	const { content } = props.data;
	const { locale, showTitle, showMoto, showCredits } = props;

	const pageData: IParsedPageData[] = JSON.parse(content);

	// find full content page
	let pageIndex = pageData.findIndex((pdata) => FULL_PAGE_RE.test(pdata.id));
	if (pageIndex < 0) {
		pageIndex = 0;
	}

	const page = pageData[pageIndex] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];

	const title = pageData[0].title;
	const moto = pageData[0].moto;
	const credits = pageData[0].credits;
	return (
		<div className={classes.root}>
			{showTitle && <h2 className={classes.title}>{title}</h2>}
			{showMoto && moto && <p className={classes.moto}>{pageData[0].moto}</p>}

			{elements.map((node, index) => {
				return (
					<ContentComponent
						key={`top-${index}`}
						data={{
							data: node,
							locale,
						}}
					/>
				);
			})}

			{showCredits && credits && <p className={classes.credits}>{credits}</p>}
		</div>
	);
};

export default ContentBrowser;
