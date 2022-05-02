import React, { useContext, useEffect, useState } from "react";
import { ContentComponent } from "../index";
import { ReactLocaleContext } from "../../../contexts/locale-context";
import { DynamicContentTypes } from "../../../interfaces/dynamic-content";
import { ComponentProps, IParsedPageData } from "../../../interfaces/models";
import { ReactPageContext } from "../../../contexts/page-context";
import { contentUtils } from "../../../lib/content-utils";
import Note from "../../note";
import { ReactDynamicContentContext } from "../../../contexts/dynamic-content-context";
import { mlUtils } from "../../../lib/ml-utils";
import { st, classes } from "./dynamic-content-viewer.st.css";

export interface DynamicContentViewerProps extends ComponentProps {
	url: string;
	className?: string;
}

export const DynamicContentViewer = ({
	url,
	className,
}: DynamicContentViewerProps): JSX.Element => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const pageContext = useContext(ReactPageContext);
	const [error, setError] = useState("");
	const { translate, locale } = useContext(ReactLocaleContext);
	const dynamicContentContext = useContext(ReactDynamicContentContext);
	const elements = item && item.parsed;

	useEffect(() => {
		// safeguard against a promise resolving after the component was torn down
		let removed = false;
		const itemData = contentUtils.urlToContentData(
			url,
			DynamicContentTypes.Glossary
		);
		if (itemData.type === DynamicContentTypes.None) {
			setError(`Bad url ${url}`);
		}
		pageContext.dynamicContentServer
			.getItems(itemData.type, locale, [itemData.id])
			.then((items: IParsedPageData[]) => {
				if (removed) {
					return;
				}
				const page = items && items[0];
				if (page) {
					setItem(page);
					dynamicContentContext?.addPage(page);
				} else {
					setError("not found");
				}
			})
			.catch((e) => {
				if (!removed) {
					setError(`${String(e)}`);
				}
			});
		return () => {
			removed = true;
		};
	}, [url, dynamicContentContext, pageContext, locale]);

	if (error) {
		return <div className={classes.error}>{error}</div>;
	}

	if (elements) {
		const itemData = contentUtils.urlToContentData(
			url,
			DynamicContentTypes.Glossary
		);
		const { metaData } = item;
		const { source_name, source_url, glossary_key } = metaData;
		const label = translate(`NOTE_LABEL_${itemData.type.toUpperCase()}`);
		const itemType =
			itemData.type === DynamicContentTypes.Glossary ? "ref" : "note";
		const contents = elements.map((node) => (
			<ContentComponent
				key={mlUtils.uniqueId()}
				componentData={{ node }}
				className={classes.contentComponent}
			/>
		));

		return (
			<div className={st(classes.root, className)}>
				<Note
					className={classes.root}
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
			</div>
		);
	}

	return <></>;
};

export default DynamicContentViewer;
