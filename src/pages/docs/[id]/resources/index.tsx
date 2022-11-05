import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { contentUtils } from "../../../../lib/content-utils";
import { IPageProps } from "../../../../interfaces/models";
import { CONTENT_TYPES } from "../../../../consts";
import { mlNextUtils } from "../../../../lib/next-utils";
import { GenericPage } from "../../../../components/content";
import { LoadContentModes, LoadFolderModes, MLParseModes } from "../../../../interfaces/parser";

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return await mlNextUtils.getNestedStaticPaths({
		folderPath: CONTENT_TYPES.DOCS,
		subPath: __dirname,
		locales: context.locales
	});
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.DOCS}/${context.params.id as string}/codex`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			parseMode: MLParseModes.VERSE,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}

	);
};
