import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { contentUtils } from "../../../../../../lib/content-utils";
import { IPageProps } from "../../../../../../interfaces/models";
import { mlNextUtils } from "../../../../../../lib/next-utils";
import { GenericPage } from "../../../../../../components/content";
import { LoadContentModes, LoadFolderModes, MLParseModes } from "../../../../../../interfaces/parser";

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const paths = await mlNextUtils.getNestedStaticPaths({
		contentFolder: __filename,
		locales: context.locales,
	});
	return paths;
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const params = context.params || {};
	const relativePath = await mlNextUtils.populateDynamicPath(__filename, params as {[key: string]: string});
	return mlNextUtils.getFolderStaticProps(
		relativePath,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			parseMode: MLParseModes.VERSE,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}

	);
};
