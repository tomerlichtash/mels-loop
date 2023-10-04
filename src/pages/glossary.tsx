import React, { useContext } from "react";
import Layout from "../components/site/Layout/Layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import usePageData from "../lib/usePageData";
import { LocaleProvider } from "../locale/context/locale-context";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import Button from "../components/Button";

const Glossary: NextPage<IPageProps> = (props) => {
	const { translate, pageName } = useContext(LocaleProvider);
	const { metaData } = usePageData(props);
	return (
		<Layout>
			<article className="page">
				<h1 className="title">{pageName}</h1>
				{metaData.length && (
					<ul className="term-list">
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							const { glossary_key } = term;
							return glossary_key ? (
								<li className="term" key={key}>
									<Button
										label={translate(term.glossary_key)}
										link={page.path}
									/>
								</li>
							) : (
								<div key={key} className="error">
									Missing glossary term data {page.id}
								</div>
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
		CONTENT_TYPES.GLOSSARY,
		context.locale,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.GLOSSARY,
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

export default Glossary;
