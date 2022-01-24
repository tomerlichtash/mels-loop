import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IContentComponentData } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import GenericPage from "../../components/content/genericPage";
import { mlNextUtils } from "../../lib/next-utils";

export default function About(data: IContentComponentData) {
	return <GenericPage data={data} />;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.ABOUT, ctx);
};

export const getStaticProps: GetStaticProps = async (
	ctx: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.DOCS}/${ctx.params.id as string}`,
		ctx,
		"folder"
	);
};
