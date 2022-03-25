import React, { useContext, useEffect, useState } from "react";
import { ContentComponent } from "../index";
import { ReactLayoutContext } from "../../../contexts/layout-context";
import { DynamicContentTypes } from "../../../interfaces/dynamic-content";
import { ComponentProps, IParsedPageData } from "../../../interfaces/models";
import { ReactPageContext } from "../../../contexts/page-context";
import { contentUtils } from "../../../lib/content-utils";
import Note from "../../note";
import { ReactDynamicContentContext } from "../../../contexts/dynamic-content-context";
import { mlUtils } from "../../../lib/ml-utils";

export interface DynamicContentViewerProps extends ComponentProps {
	url: string;
	className?: string;
}

export const DynamicContentViewer = ({
	url,
}: DynamicContentViewerProps): JSX.Element => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [error, setError] = useState("");
	const { translate, locale } = useContext(ReactLayoutContext);
	const dynamicContentContext = useContext(ReactDynamicContentContext);
	const elements = item && item.parsed;

	useEffect(() => {
		const itemData = contentUtils.urlToContentData(url, DynamicContentTypes.Glossary);
		if (itemData.type === DynamicContentTypes.None) {
			setError(`Bad url ${url}`);
		}
		pageContext.dynamicContentServer
			.getItems(itemData.type, locale, [itemData.id])
			.then((items: IParsedPageData[]) => {
				const page = items && items[0];
				if (page) {
					setItem(page);
					dynamicContentContext?.setCurrentPage(page);
				} else {
					setError("not found");
				}
			})
			.catch((e) => {
				setError(`${String(e)}`);
			});
	}, [url, dynamicContentContext, pageContext, locale]);

	if (error) {
		return <div>{error}</div>;
	}

	if (elements) {
		const itemData = contentUtils.urlToContentData(url, DynamicContentTypes.Glossary);
		const { metaData } = item;
		const { source_name, source_url, glossary_key } = metaData;
		const label = translate(`NOTE_LABEL_${itemData.type.toUpperCase()}`);
		const itemType =
			itemData.type === DynamicContentTypes.Glossary ? "ref" : "note";
		const contents = elements.map((node) => (
			<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
		));

		return (
			<Note
				type={itemType}
				contents={contents}
				label={label}
				title={translate(glossary_key)}
				term={locale === "en" ? "" : translate(glossary_key, "en")}
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
