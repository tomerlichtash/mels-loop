// import { GetStaticProps } from "next";
import {
	IContentComponentData,
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./content-iterator";

export interface GenericPageProps extends IPageProps {
	data: IContentComponentData;
}

export default function GenericPage(props: GenericPageProps) {
	const { translate } = props;
	const pages = JSON.parse(props.data.content) as IParsedPageData[];
	const page = pages && pages[0];
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: "unknown",
	};
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>{page?.title}</title>
			</Head>
			<article>
				<h1>{page?.title}</h1>
				{node ? (
					<ContentIterator
						data={{
							data: node,
							// locale: props.data.locale,
						}}
					/>
				) : (
					<div>(No page content)</div>
				)}
			</article>
		</Layout>
	);
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	return {
// 		props: {
// 			locale,
// 		},
// 	};
// };
