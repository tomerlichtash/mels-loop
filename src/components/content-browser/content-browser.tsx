import React from "react";
import ContentComponent from "../content/contentComponent";
import { classes } from "./content-browser.st.css";
import {
	IMLParsedNode,
	IParsedPageData,
	IContentComponentData,
} from "../../interfaces/models";

const FULL_PAGE_RE = /full.*text/i;

export const ContentBrowser = (props: {
	data: IContentComponentData;
	locale: string;
}): JSX.Element => {
	const { content } = props.data;
	const { locale } = props;
	const pageData: IParsedPageData[] = JSON.parse(content);

	// find full content page
	let pageIndex = pageData.findIndex((pdata) => FULL_PAGE_RE.test(pdata.id));
	if (pageIndex < 0) {
		pageIndex = 0;
	}
	const page = pageData[pageIndex] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];

	return (
		<div className={classes.root}>
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
		</div>
	);
};

export default ContentBrowser;
