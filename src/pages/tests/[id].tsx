import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { mlNextUtils } from "../../lib/next-utils";
import GenericPage from "../../components/content/generic-page";
import { LoadFolderModes } from "../../interfaces/parser";

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths("tests", context.locales);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`tests/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
