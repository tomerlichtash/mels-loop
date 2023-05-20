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
import { st, classes } from "../pages/page-base.st.css";

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
			<section className={st(classes.root, { textDirection })}>
				<div className={st(classes.stickySection, classes.section)}>
					<span className={classes.stickyBadge}>
						{translate("STICKY_BADGE_LABEL")}
					</span>
					<div className={classes.sticky}>
						<a href={`${locale}/docs/the-story-of-mel/pages/mel-kaye-cv`}>
							<div
								className={classes.stickyInner}
								style={{
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundImage:
										"url(https://res.cloudinary.com/dcajl1s6a/image/upload/v1684527967/mel-kaye-bio/homepage-ref-cover-kornitzka-b_q6d9rg.jpg)",
								}}
							>
								<div className={classes.stickyItemLayout}>
									<div className={classes.imageContainer}>
										<img
											className={classes.avatar}
											src="https://res.cloudinary.com/dcajl1s6a/image/upload/c_thumb,w_200,g_face/v1684493903/mel-kaye-bio/avatar-mel-kaye_xwd6kx.jpg"
											alt={translate("STICKY_TITLE_IMAGE_ALT")}
										/>
									</div>
									<div className={classes.stickyContent}>
										<p className={classes.stickyItemTitle}>
											{translate("STICKY_TITLE")}
										</p>
										<p className={classes.stickyItemDate}>
											{translate("STICKY_DATE")}
										</p>
										<p className={classes.stickyItemBody}>
											{translate("STICKY_SUBTITLE")}{" "}
										</p>
										<p className={classes.stickyItemRef}>
											{translate("STICKY_TITLE_LINK_PREFIX")}:{" "}
											<strong>{translate("STICKY_TITLE_LINK_TEXT")}</strong>{" "}
										</p>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
				<article className={st(classes.section, { textDirection })}>
					<h1 className={classes.title}>{title}</h1>
					<p className={classes.moto}>{moto}</p>
					{elements.map((node) => {
						return (
							<ContentComponent
								key={mlUtils.uniqueId()}
								className={st(classes.contentComponent, className)}
								componentData={{ node }}
							/>
						);
					})}
				</article>
			</section>
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
