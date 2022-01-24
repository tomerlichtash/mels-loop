import { IContentComponentData, IMLParsedNode, IParsedPageData } from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./contentIterator";

export default function GenericPage(props: { data: IContentComponentData }) {
	const pages = JSON.parse(props.data.content) as IParsedPageData[];
	const page = pages && pages[0];
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: "unknown",
	}
	return (
		<Layout>
			<Head>
				<title>{page?.title}</title>
			</Head>
			<article>
				<h1>#### {page?.title}</h1>
				<ContentIterator data={{
						data: node,
						locale: props.data.locale
					}} />
				{/*<div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />*/}
			</article>
		</Layout>
	);
}
