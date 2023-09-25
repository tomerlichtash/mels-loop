import React, { useContext } from "react";
import Layout from "../components/layout";
import { GetStaticProps, NextPage } from "next";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { contentUtils } from "../lib/content-utils";
import { usePageData } from "../components/usePageData";
import { ContentComponent } from "../components/content";
import { mlUtils } from "../lib/ml-utils";
import { ReactLocaleContext } from "../contexts/locale-context";

const Index: NextPage<IPageProps> = (props) => {
	const { className } = props;
	const { textDirection, translate, locale } = useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const { metaData } = pageData[0];
	const { title, moto } = metaData;
	const elements: IMLParsedNode[] = page.parsed;

	return (
		<Layout>
			{/* <div className="stickySection section">
				<span className="stickyBadge">{translate("STICKY_BADGE_LABEL")}</span>
				<div className="sticky">
					<a href={`${locale}/docs/the-story-of-mel/pages/mel-kaye-cv`}>
						<div
							className="stickyInner"
							style={{
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundImage:
									"url(https://mels-loop-media.s3.eu-north-1.amazonaws.com/homepage-ref-cover-kornitzka-b_q6d9rg.jpg)",
							}}
						>
							<div className="stickyItemLayout">
								<div className="imageContainer">
									<img
										className="avatar"
										src="https://mels-loop-media.s3.eu-north-1.amazonaws.com/avatar-mel-kaye_xwd6kx.jpg"
										alt={translate("STICKY_TITLE_IMAGE_ALT")}
									/>
								</div>
								<div className="stickyContent">
									<p className="stickyItemTitle">{translate("STICKY_TITLE")}</p>
									<p className="stickyItemDate">{translate("STICKY_DATE")}</p>
									<p className="stickyItemBody">
										{translate("STICKY_SUBTITLE")}{" "}
									</p>
									<p className="stickyItemRef">
										{translate("STICKY_TITLE_LINK_PREFIX")}:{" "}
										<strong>{translate("STICKY_TITLE_LINK_TEXT")}</strong>{" "}
									</p>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div> */}
			<article className="article">
				<h1 className="title">{title}</h1>
				<p className="moto">{moto}</p>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							className={"content-component"}
							componentData={{ node }}
						/>
					);
				})}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	/**
	 * @param node Guaranteed link node
	 * @param mode
	 * @returns
	 */
	return mlNextUtils.getFolderStaticProps(
		`docs/the-story-of-mel/${CONTENT_TYPES.CODEX}`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};

export default Index;
