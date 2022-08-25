import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { usePageData } from "../components/usePageData";
import { ReactLocaleContext } from "../contexts/locale-context";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { st, classes } from "./page-base.st.css";
import Link from "next/link";

const TestsPage: NextPage<IPageProps> = (props) => {
	const { pageName } = useContext(ReactLocaleContext);
	const { className } = props;
	const { metaData } = usePageData(props);

	return (
		<Layout>
			<article className={st(classes.root, className)}>
				<h1 className={classes.title}>{pageName}</h1>
				{metaData.length && (
					<ul className={classes.termList}>
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							return (
								<li className={classes.term} key={key}>
									<Link
										title={term?.abstract || ""}
										href={page.path}
										target="_blank"
									>
										{term?.title || page.path}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.TESTS,
		context.locale,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.TESTS,
		context.locale,
		LoadFolderModes.CHILDREN,
		{
			contentMode: LoadContentModes.FULL,
		}
	);
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content,
		},
	};
	return props;
};

export default TestsPage;
