import React, { useContext, useEffect, useState } from "react";
import { ContentComponent } from "..";
import { ReactLayoutContext } from "../../../contexts/layout-context";
import { DynamicContentTypes, IDynamicContentRecord } from "../../../interfaces/dynamic-content";
import { ComponentProps, IParsedPageData } from "../../../interfaces/models";
import { ReactPageContext } from "../../page/page-context";
import { classes } from "./glossary-item.st.css";

export interface GlossaryItemProps extends ComponentProps {
	url: string;
}

export const GlossaryItem = (props: GlossaryItemProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { className } = props;
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [itemData] = useState<IDynamicContentRecord>(
		pageContext.dynamicContentServer.urlToContentData(props.url, DynamicContentTypes.Glossary));
	const [ error, setError ] = useState("");

	const elements = item && item.parsed;

	useEffect(() => {
		(async () => {
			const data = await
				pageContext.dynamicContentServer.getItems(itemData.type,
					layoutContext.locale, [itemData.id]);
				const page = data && data[0];
				if (page) {
					setItem(page);
				}
				else {
					setError("not found");
				}
		})();
	}, [])

	if (error) {
		return <div>{error}</div>
	}
	if (elements) {
		return <div>
			{elements.map((node, index) => {
				return (
					<ContentComponent
						key={`glossary-${index}`}
						className={classes.root}
						componentData={{
							node: node,
						}}
					/>
				);
			})}

		</div>
	}

	return	<></>
};

export default GlossaryItem;
