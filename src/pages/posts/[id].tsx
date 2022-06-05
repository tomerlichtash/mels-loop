import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";
import { LoadFolderModes } from "../../interfaces/parser";
import Layout from "../../components/layout";
import Head from "next/head";
import { usePageData } from "../../components/usePageData";
import { Button } from "../../components/ui";
import { mlUtils } from "../../lib/ml-utils";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Post from "../../components/post";
// import { classes } from "../../pages/page-base.st.css";

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { locale, siteTitle, siteSubtitle, translate, textDirection } =
		useContext(ReactLocaleContext);
	const { metaData, path } = page;
	const { title, date } = metaData;

	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {siteSubtitle} - {metaData?.title}
				</title>
			</Head>
			<Button
				label={translate("POSTS_BACK_TO_POSTS_LIST")}
				icon={
					textDirection === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />
				}
				link={"/posts"}
			/>
			<Post
				key={mlUtils.uniqueId()}
				title={title}
				date={date}
				path={path}
				locale={locale}
				content={page}
			/>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.POSTS, context.locales);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.POSTS}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
