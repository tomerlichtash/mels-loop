import React, { useContext, useEffect, useState } from "react";
import { ContentComponent } from "../index";
import { ReactLayoutContext } from "../../../contexts/layout-context";
import {
	DynamicContentTypes,
	IDynamicContentRecord,
} from "../../../interfaces/dynamic-content";
import { ComponentProps, IParsedPageData } from "../../../interfaces/models";
import { ReactPageContext } from "../../page/page-context";
import { v4 as uuidv4 } from "uuid";
import { contentUtils } from "../../../lib/content-utils";
import Note from "../../note";
// import { st, classes } from "./popover-item.st.css";

export interface PopoverItemProps extends ComponentProps {
	url: string;
}

export const PopoverItem = ({ url }: PopoverItemProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [itemData] = useState<IDynamicContentRecord>(
		contentUtils.urlToContentData(url, DynamicContentTypes.Glossary)
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
	});

	if (error) {
		return <div>{error}</div>;
	}

	if (elements) {
		const contents = elements.map((node) => (
			<ContentComponent key={uuidv4()} componentData={{ node }} />
		));

		if (itemData.type === DynamicContentTypes.Glossary) {
			const { metaData } = item;
			const { source_name, source_url, glossary_term } = metaData;
			return (
				<Note
					type="ref"
					contents={contents}
					title={glossary_term}
					sources={[
						{
							name: source_name,
							url: source_url,
						},
					]}
				/>
			);
		} else if (itemData.type === DynamicContentTypes.Annotation) {
			return <Note type="note" contents={contents} />;
		}
	}

	return <></>;
};

export default PopoverItem;
