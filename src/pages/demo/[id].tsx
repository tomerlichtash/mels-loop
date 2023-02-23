import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";
import { GenericPage } from "../../components/content";
import { LoadFolderModes } from "../../interfaces/parser";
import { contentUtils } from "../../lib/content-utils";

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return await mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.DEMO, context.locales);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	if (process.env.NODE_ENV === "production") {
		return { notFound: true };
	}
	return await mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.DEMO}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.INDEX,
		{
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};
