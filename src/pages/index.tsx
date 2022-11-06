import React, { useContext } from "react";
import Layout from "../components/layout";
import { GetStaticProps, NextPage } from "next";
import {
	// IMLParsedNode,
	IPageProps,
	// IParsedPageData,
} from "../interfaces/models";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import {
	// LoadContentModes,
	LoadFolderModes,
	// MLParseModes,
} from "../interfaces/parser";
// import { contentUtils } from "../lib/content-utils";
// import { usePageData } from "../components/usePageData";
// import { ContentComponent } from "../components/content";
// import { mlUtils } from "../lib/ml-utils";
import { ReactLocaleContext } from "../contexts/locale-context";
import { st, classes } from "../pages/page-base.st.css";
import Link from "next/link";

const Index: NextPage<IPageProps> = () => {
	// const { className } = props;
	const { textDirection } = useContext(ReactLocaleContext);
	// const { pageData } = usePageData(props);
	// const page = pageData[0] || ({} as IParsedPageData);
	// const { metaData } = pageData[0];
	// const { title, moto } = metaData;
	// const elements: IMLParsedNode[] = page.parsed;

	return (
		<Layout>
			<article className={st(classes.root, { textDirection })}>
				<Link href="/docs/the-story-of-mel">The Story of Mel</Link>
				<Link href="/docs/the-story-of-mel/codex">The Story of Mel - Codex</Link>
				<Link href="/docs/unix-koans">Unix Koans</Link>
				<Link href="/docs/unix-koans/codex">Unix Koans Codex</Link>
				<Link href="/docs/unix-koans/codex/chapter/koan1">Unix Koans Codex - Chapter 1</Link>
				{/* <h1 className={classes.title}>{title}</h1>
				<p className={classes.moto}>{moto}</p>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							className={st(classes.contentComponent, className)}
							componentData={{ node }}
						/>
					);
				})} */}
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
		CONTENT_TYPES.ABOUT, // todo: change
		context.locale,
		LoadFolderModes.FOLDER,
	);
};

export default Index;
