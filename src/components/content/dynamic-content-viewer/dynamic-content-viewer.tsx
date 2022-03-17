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

export interface DynamicContentViewerProps extends ComponentProps {
	url: string;
}

export const DynamicContentViewer = ({ url }: DynamicContentViewerProps): JSX.Element => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [itemData] = useState<IDynamicContentRecord>(
		contentUtils.urlToContentData(url, DynamicContentTypes.Glossary)
		);
		const [error, setError] = useState("");
		const { translate, locale } = useContext(ReactLayoutContext);
		
	const elements = item && item.parsed;

	useEffect(() => {
		pageContext.dynamicContentServer
			.getItems(itemData.type, locale, [itemData.id])
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
		const { metaData } = item;
		const { source_name, source_url, glossary_term } = metaData;
		const label = translate(`NOTE_LABEL_${itemData.type.toUpperCase()}`);
		const itemType = itemData.type === DynamicContentTypes.Glossary ? "ref" : "note";
		const contents = elements.map((node) => (
			<ContentComponent key={uuidv4()} componentData={{ node }} />
		));

		return (
			<Note
				type={itemType}
				contents={contents}
				label={label}
				title={glossary_term}
				sources={[
					{
						name: source_name,
						url: source_url,
					},
				]}
			/>
		);
	}

	return <></>;
};

export default DynamicContentViewer;
