import React from "react";
import { IParsedPageData } from "../../interfaces/models";
import { classes } from "./dynamic-browser-header.st.css";
import { mlUtils } from "../../lib/ml-utils";

export interface IBrowserHeaderProps {
	pages: IParsedPageData[]
}

export default function DynamicBrowserHeader({ pages }: IBrowserHeaderProps) : JSX.Element {
	if (!pages || pages.length < 2) {
		return (<></>);
	}
	return (
		<span className={classes.linksContainer}>
			{
				pages.map(page => (
					<span className={classes.itemLink} key={mlUtils.uniqueId()}>
						<span>{page.metaData.title || page.metaData.glossary_term || page.id}</span>
					</span>
				))
			}
		</span>
	);
}

