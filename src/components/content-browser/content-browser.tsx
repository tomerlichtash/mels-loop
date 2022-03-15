import React from "react";
import ContentComponent from "../content/content-component";
import { IMLParsedNode, IParsedPageData } from "../../interfaces/models";
import { usePageData } from "../usePageData";
import { st, classes } from "./content-browser.st.css";

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
		<div className={st(classes.root, className)}>
			{showTitle && <h1 className={classes.title}>{metaData.title}</h1>}

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
