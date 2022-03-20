import React from "react";
import { IParsedPageData } from "../../interfaces/models";
import { classes } from "./dynamic-browser-header.st.css";
import { mlUtils } from "../../lib/ml-utils";

export interface IBrowserHeaderProps {
	pages: IParsedPageData[]
}

const DynamicBrowserHeader = ({ pages }: IBrowserHeaderProps) : JSX.Element => {
	if (!pages || pages.length < 2) {
		return (<></>);
	}
	return (
		<div className={classes.linksContainer}>
			{
				pages.map(page => (
					<div className={classes.itemLink} key={mlUtils.uniqueId()}>
						<span>{page.metaData.title || page.metaData.glossary_term || page.id}</span>
					</div>
				))
			}
		</div>
	);
};

export default DynamicBrowserHeader;
