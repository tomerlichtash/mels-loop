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
import { LoadingIndicator } from "../../loading-indicator/loading-indicator";
import ScrollArea from "../../scrollbar";
import { st, classes } from "./dynamic-content-viewer.st.css";

/**
 * Show loading animation after this many msecs have elapsed without data
 */
const LOADING_DELAY_MSEC = 50; // 40ms
/**
 * Min # of msecs to display loading animation
 */
const MIN_LOADING_TIME = 750;

export interface DynamicContentViewerProps extends ComponentProps {
	url: string;
	className?: string;
}

export const DynamicContentViewer = ({
	url,
	className,
}: DynamicContentViewerProps): JSX.Element => {
	const [item, setItem] = useState<IParsedPageData>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const pageContext = useContext(ReactPageContext);
	const { translate, locale, textDirection } = useContext(ReactLocaleContext);
	const dynamicContentContext = useContext(ReactDynamicContentContext);
	const elements = item && item.parsed;

	useEffect(() => {
		// safeguard against a promise resolving after the component was torn down
		let removed = false;
		const queryTime = Date.now();
		const itemData = contentUtils.urlToContentData(
			url,
			DynamicContentTypes.Glossary
		);
		if (itemData.type === DynamicContentTypes.None) {
			setError(`Bad url ${url}`);
			return;
		}
		pageContext.dynamicContentServer
			.getItems(itemData.type, locale, [itemData.id])
			.then((items: IParsedPageData[]) => {
				if (removed) {
					return;
				}
				const page = items && items[0];
				if (page) {
					const elapsed = Date.now() - queryTime;
					const delay =
						elapsed <= LOADING_DELAY_MSEC
							? 0
							: Math.max(0, MIN_LOADING_TIME - elapsed);
					window.setTimeout(() => {
						if (!removed) {
							setIsLoading(false);
							setItem(page);
							dynamicContentContext?.addPage(page);
						}
					}, delay);
				} else {
					setIsLoading(false);
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

	if (isLoading) {
		return (
			<LoadingIndicator label="PRELOADER_LABEL" delay={LOADING_DELAY_MSEC} />
		);
	}

	if (!elements || !elements.length) {
		return <></>;
	}

	const itemData = contentUtils.urlToContentData(
		url,
		DynamicContentTypes.Glossary
	);
	const { metaData } = item;
	const { source_name, source_url, glossary_key } = metaData;

	// TODO: Support multiple sources - https://github.com/tomerlichtash/mels-loop-nextjs/issues/188
	const sources = source_name && [
		{
			name: source_name,
			url: source_url,
		},
	];
	const label = translate(`NOTE_LABEL_${itemData.type.toUpperCase()}`);
	const bibliographyLabel = translate(
		`COMPONENT_BIBLIOGRAPHY_LABEL_${sources.length > 1 ? "MULTIPLE" : "SINGLE"}`
	);
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
			<ScrollArea height="300px">
				<Note
					className={classes.note}
					type={itemType}
					contents={contents}
					label={label}
					biblgraphyLabel={bibliographyLabel}
					title={translate(glossary_key)}
					term={locale === "en" ? "" : translate(glossary_key, "en")}
					textDirection={textDirection}
					sources={sources}
				/>
			</ScrollArea>
		</div>
	);
};

export default DynamicContentViewer;
