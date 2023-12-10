import React, { useContext } from "react";
import Layout from "../components/site/Layout/Layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import usePageData from "../lib/usePageData";
import { LocaleProvider } from "../locale/context/locale-context";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { Button } from "@components/ui";

const Docs: NextPage<IPageProps> = (props) => {
	const { pageName } = useContext(LocaleProvider);
	const { metaData } = usePageData(props);
	return (
		<Layout>
			<article className="page">
				<h1 className="title">{pageName}</h1>
				{metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const key = `doc-${index}`;
							return (
								<li className="item" key={key}>
									<Button link={page.path}>{page.metaData.title}</Button>
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
