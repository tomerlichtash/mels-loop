import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import GenericPage from "../../components/content/generic-page";
import { mlNextUtils, LoadFolderModes } from "../../lib/next-utils";

export default function GlossaryTerm(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(
		CONTENT_TYPES.GLOSSARY,
		context.locales
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.GLOSSARY}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
