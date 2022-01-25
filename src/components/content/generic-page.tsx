import {
	IContentComponentData,
	IMLParsedNode,
	IParsedPageData,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./content-iterator";

export default function GenericPage(props: IContentComponentData) {
	const { translate, content } = props.data;
	const pages = JSON.parse(content) as IParsedPageData[];
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
