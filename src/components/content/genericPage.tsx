import { GetStaticProps } from "next";
import {
	ComponentProps,
	IContentComponentData,
	IMLParsedNode,
	IParsedPageData,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./contentIterator";

export interface GenericPageProps extends ComponentProps {
	data: IContentComponentData;
}

export default function GenericPage(props: GenericPageProps) {
	const { locale, translate } = props;
	const pages = JSON.parse(props.data.content) as IParsedPageData[];
	const page = pages && pages[0];
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: "unknown",
	};
	return (
		<Layout {...{ translate, locale }}>
			<Head>
				<title>{page?.title}</title>
			</Head>
			<article>
				<h1>{page?.title}</h1>
				{node ? (
					<ContentIterator
						data={{
							data: node,
							locale: props.data.locale,
						}}
					/>
				) : (
					<div>(No page content)</div>
				)}
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locale,
		},
	};
};
