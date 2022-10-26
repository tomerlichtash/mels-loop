import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";
import { LoadFolderModes } from "../../interfaces/parser";
import Layout from "../../components/layout";
import { usePageData } from "../../components/usePageData";
import { Button } from "../../components/ui";
import { mlUtils } from "../../lib/ml-utils";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Post from "../../components/post";
import { classes } from "../../pages/page-base.st.css";

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { locale, translate, textDirection } = useContext(ReactLocaleContext);
	const { metaData } = page;
	const { title, date, author } = metaData;
	const backIcon =
		textDirection === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />;
	return (
		<Layout title={title}>
			<div className={classes.root}>
				<Button
					label={translate("POSTS_BACK_TO_POSTS_LIST")}
					className={classes.smallButton}
					icon={backIcon}
					link={"/posts"}
				/>
				<Post
					key={mlUtils.uniqueId()}
					title={title}
					date={date}
					author={author}
					locale={locale}
					content={page}
				/>
			</div>
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
