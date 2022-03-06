import React, { useContext, useEffect, useState } from "react";
import { ContentComponent } from "../index";
import { ReactLayoutContext } from "../../../contexts/layout-context";
import {
	DynamicContentTypes,
	IDynamicContentRecord,
} from "../../../interfaces/dynamic-content";
import { ComponentProps, IParsedPageData } from "../../../interfaces/models";
import { ReactPageContext } from "../../page/page-context";
import { classes } from "./glossary-item.st.css";
import { Button } from "../../ui";

export interface GlossaryItemProps extends ComponentProps {
	url: string;
}

export const GlossaryItem = (props: GlossaryItemProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [itemData] = useState<IDynamicContentRecord>(
		pageContext.dynamicContentServer.urlToContentData(
			props.url,
			DynamicContentTypes.Glossary
		)
	);
	const [error, setError] = useState("");

	const elements = item && item.parsed;

	useEffect(() => {
		pageContext.dynamicContentServer
			.getItems(itemData.type, layoutContext.locale, [itemData.id])
			.then((items: IParsedPageData[]) => {
				const page = items && items[0];
				if (page) {
					setItem(page);
				} else {
					setError("not found");
				}
			})
			.catch((e) => {
				setError(`${String(e)}`);
			});
	}, []);

	if (error) {
		return <div>{error}</div>;
	}

	if (elements) {
		return (
			<div className={classes.root}>
				<p>Glossary</p>
				<h4 className={classes.title}>{item.metaData.glossary_term}</h4>
				{elements.map((node, index) => {
					return (
						<ContentComponent
							key={`glossary-item-${index}`}
							className={classes.root}
							componentData={{ node }}
						/>
					);
				})}
				{item.metaData.source_url && (
					<span>
						<span>Source:</span>
						<Button
							label={item.metaData.source_name}
							link={item.metaData.source_url}
							target="_blank"
						/>
					</span>
				)}
			</div>
		);
	}

	return <></>;
};

export default GlossaryItem;
