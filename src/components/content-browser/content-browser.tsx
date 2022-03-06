import React from "react";
import ContentComponent from "../content/content-component";
import { IMLParsedNode, IParsedPageData } from "../../interfaces/models";
import { usePageData } from "../usePageData";
import { style, classes } from "./content-browser.st.css";

// const FULL_PAGE_RE = /full.*text/i;

export interface ContentBrowserProps {
	content: string | IParsedPageData[];
	showTitle?: boolean;
	showMoto?: boolean;
	showCredits?: boolean;
	className?: string;
}

export const ContentBrowser = (props: ContentBrowserProps): JSX.Element => {
	const { showTitle, showMoto, showCredits, className } = props;
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];

	return (
		<div className={style(classes.root, className)}>
			{showTitle && <h2 className={classes.title}>{metaData.title}</h2>}

			{showMoto && metaData.moto && (
				<p className={classes.moto}>{metaData.moto}</p>
			)}

			{elements.map((node, index) => {
				return (
					<ContentComponent
						key={`top-${index}`}
						className={classes.contentComponent}
						componentData={{ node }}
					/>
				);
			})}

			{showCredits && metaData.credits && (
				<p className={classes.credits}>{metaData.credits}</p>
			)}
		</div>
	);
};

export default ContentBrowser;
