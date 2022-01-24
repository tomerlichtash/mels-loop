import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils, PathStaticPropType } from "../../lib/next-utils";
import GenericPage from "../../components/content/generic-page";

export default function Doc(props: IPageProps) {
	return <GenericPage translate={props.translate} data={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.ABOUT, context);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.DOCS}/${context.params.id}`,
		context,
		PathStaticPropType.FOLDER
	);
};
