import Head from "next/head";
import Layout from "../components/layout";
// import { useRouter } from 'next/router';
import { GetStaticProps } from "next";
// import homeStyles from '../styles/home.module.scss';
//import { getSortedPostsData } from '../lib/content-drivers/posts';
import { getSortedCodexData } from "../lib/content-drivers/codex";
import {
	IContentComponentData,
	IMLParsedNode,
	IParsedPageData,
} from "../interfaces/models";
import ContentComponent from "../components/content/contentComponent";
// import { style, classes } from "./index.st.css";

const FULL_PAGE_RE = /full.*text/i;

export default function Home(data: IContentComponentData) {
	// const { locale } = useRouter();
	//const [sortedContent, setSortedContent] = useState<IParsedPageData[]>(getSortedCodexData("he"))
	const { content, locale } = data;
	const pageData: IParsedPageData[] = JSON.parse(content);

	// find full content page
	let pageIndex = pageData.findIndex((pdata) => FULL_PAGE_RE.test(pdata.id));
	if (pageIndex < 0) {
		pageIndex = 0;
	}
	const page = pageData[pageIndex] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];

	return (
		<Layout>
			<Head>
				<title>Site Title</title>
			</Head>

			<article className={"rtl"}>
				{elements.map((node, index) => {
					return (
						<ContentComponent
							key={`top-${index}`}
							data={{
								data: node,
								locale,
							}}
						/>
					);
				})}
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const data = getSortedCodexData(locale);
	return {
		props: {
			content: JSON.stringify(data),
			locale,
		},
	};
};
