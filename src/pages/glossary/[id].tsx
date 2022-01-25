import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import GenericPage from "../../components/content/generic-page";
import { mlNextUtils, PathStaticPropType } from "../../lib/next-utils";

export default function Doc(props: IPageProps) {
	return <GenericPage data={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.GLOSSARY, context);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.GLOSSARY}/${context.params.id as string}`,
		context,
		PathStaticPropType.FOLDER
	);
};
