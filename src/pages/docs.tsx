import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { usePageData } from "../components/usePageData";
import { ReactLocaleContext } from "../contexts/locale-context";
import { Button } from "../components/ui";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { st, classes } from "./page-base.st.css";

const Docs: NextPage<IPageProps> = (props: IPageProps) => {
	const { pageName } = useContext(ReactLocaleContext);
	const { className } = props;
	const { metaData } = usePageData(props);
	return (
		<Layout>
			<article className={st(classes.root, className)}>
				<h1 className={classes.title}>{pageName}</h1>
				{metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const key = `doc-${index}`;
							return (
								<li className={classes.item} key={key}>
									<Button label={page.metaData.title} link={page.path} />
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
		CONTENT_TYPES.DOCS,
		context.locale,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.DOCS,
		context.locale,
		LoadFolderModes.CHILDREN,
		{
			contentMode: LoadContentModes.METADATA,
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

export default Docs;
